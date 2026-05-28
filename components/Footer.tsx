import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="cusec-footer">
      <div className="cusec-footer__inner">
        <div className="cusec-footer__links">
          <a href="mailto:info@cusec.net" className="cusec-footer__link">
            info@cusec.net
          </a>
          <a
            href="https://linkedin.com/company/426238"
            target="_blank"
            rel="noopener noreferrer"
            className="cusec-footer__link"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/cusecofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="cusec-footer__link"
          >
            Instagram
          </a>
          <a
            href="http://twitter.com/cusec"
            target="_blank"
            rel="noopener noreferrer"
            className="cusec-footer__link"
          >
            X / Twitter
          </a>
        </div>
        <div className="cusec-footer__copyright">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
