export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const socialLinks: FooterLink[] = [
  { label: "info@cusec.net", href: "mailto:info@cusec.net" },
  { label: "LinkedIn", href: "https://linkedin.com/company/426238", external: true },
  { label: "Instagram", href: "https://www.instagram.com/cusecofficial", external: true },
  { label: "X / Twitter", href: "http://twitter.com/cusec", external: true },
];
