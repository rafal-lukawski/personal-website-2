export interface Section {
  label: string;
  id: string;
  showInHeader: boolean;
  isCta?: boolean;
}

export const sections: Section[] = [
  { label: "Home", id: "hero", showInHeader: false },
  { label: "About", id: "about", showInHeader: true },
  { label: "Projects", id: "projects", showInHeader: true },
  { label: "PM", id: "pm", showInHeader: true },
  { label: "Stack", id: "stack", showInHeader: true },
  { label: "Certificates", id: "certificates", showInHeader: true },
  { label: "Contact", id: "contact", showInHeader: true, isCta: true },
];
