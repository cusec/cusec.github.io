import { useTranslations } from "next-intl";
import { Section } from "./Section";

export function StatsStatement() {
  const t = useTranslations("Stats");

  return (
    <Section className="cusec-stats-section">
      <p className="cusec-stats">
        {t.rich("statement", { b: (chunks) => <strong>{chunks}</strong> })}
      </p>
    </Section>
  );
}
