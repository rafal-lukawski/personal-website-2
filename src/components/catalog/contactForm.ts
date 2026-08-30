export const CONTACT_ENDPOINT = "https://formspree.io/f/xldargao";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTACT_FIELDS = ["name", "email", "message"] as const;

export type ContactField = (typeof CONTACT_FIELDS)[number];
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;
export type ContactStatus = "idle" | "submitting" | "success" | "error";

export function readContactFields(form: HTMLFormElement): ContactValues {
  const data = new FormData(form);
  return {
    name: String(data.get("name") ?? ""),
    email: String(data.get("email") ?? ""),
    message: String(data.get("message") ?? ""),
  };
}

export function validateContact(
  values: ContactValues,
  messages: { required: string; email: string },
): ContactErrors {
  const errors: ContactErrors = {};
  if (!values.name.trim()) errors.name = messages.required;
  const email = values.email.trim();
  if (!email) errors.email = messages.required;
  else if (!EMAIL_RE.test(email)) errors.email = messages.email;
  if (!values.message.trim()) errors.message = messages.required;
  return errors;
}

export const hasErrors = (errors: ContactErrors) =>
  CONTACT_FIELDS.some((field) => errors[field]);
