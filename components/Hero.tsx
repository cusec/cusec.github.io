import { useTranslations } from "next-intl";
import { ButtonLink } from "./ButtonLink";
import { Section } from "./Section";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <Section className="cusec-hero-section">
      <div className="cusec-hero">
        <div className="cusec-hero__masthead">
          <h1>CUSEC</h1>
          <p>{t("tagline")}</p>
        </div>
        <div className="cusec-hero__intro">
          <p>{t("intro")}</p>
          <ButtonLink href="https://2027.cusec.net" newTab>
            {t("cta")}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
