"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { hud } from "@/theme/hud";
import {
  CONTACT_ENDPOINT,
  CONTACT_FIELDS,
  hasErrors,
  readContactFields,
  validateContact,
  type ContactErrors,
  type ContactStatus,
} from "../contactForm";
import { HudButton, HudFormField } from "../ui";

export function ContactForm() {
  const tContact = useTranslations("contact");
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});

  const validationCopy = useMemo(
    () => ({
      required: tContact("form.errors.required"),
      email: tContact("form.errors.email"),
    }),
    [tContact],
  );

  /** Re-validate as the visitor types, but only once they have seen an error. */
  const handleChange = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (status === "success" || status === "error") setStatus("idle");
    setErrors((current) =>
      hasErrors(current) ? validateContact(readContactFields(form), validationCopy) : current,
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validateContact(readContactFields(form), validationCopy);

    if (hasErrors(nextErrors)) {
      setErrors(nextErrors);
      const first = CONTACT_FIELDS.find((key) => nextErrors[key]);
      if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");
    const formData = new FormData(form);

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const submitLabel = {
    idle: "form.send",
    submitting: "form.sending",
    success: "form.sent",
    error: "form.error",
  }[status];

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      onChange={handleChange}
      sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <HudFormField id="tc-name" name="name" label={tContact("form.name")} error={errors.name} />
      <HudFormField
        id="tc-email"
        name="email"
        type="email"
        label={tContact("form.email")}
        error={errors.email}
      />
      <HudFormField
        id="tc-message"
        name="message"
        label={tContact("form.message")}
        multiline
        minRows={5}
        error={errors.message}
      />
      <Box>
        <HudButton
          type="submit"
          disabled={status === "submitting"}
          data-state={status === "success" || status === "error" ? status : undefined}
        >
          {tContact(submitLabel)}
        </HudButton>
      </Box>
      <Box aria-live="polite" aria-atomic="true" sx={{ minHeight: "1.2em" }}>
        {(status === "success" || status === "error") && (
          <Typography
            sx={{
              m: 0,
              font: `500 0.81rem/1.3 ${hud.mono}`,
              color: status === "success" ? hud.ok : hud.danger,
            }}
          >
            {tContact(status === "success" ? "form.successMessage" : "form.errorMessage")}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
