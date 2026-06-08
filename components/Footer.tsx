import { useTranslations } from "next-intl";
import { socialLinks } from "@/lib/socialLinks";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="cusec-footer">
      <div className="cusec-footer__inner">
        <div className="cusec-footer__links">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="cusec-footer__link"
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="cusec-footer__copyright">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
