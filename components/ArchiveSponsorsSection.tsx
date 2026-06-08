import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeading } from "@/components/SectionHeading";

export async function ArchiveSponsorsSection() {
  const t = await getTranslations("Archives");

  return (
    <section className="cusec-section cusec-archive-section">
      <div className="cusec-section__inner">
        <SectionHeading
          title={t.rich("sponsorsHeading", { em: (chunks) => <em>{chunks}</em> })}
          lede={t("sponsorsLede")}
          align="left"
        />
        <p className="cusec-archive-placeholder">{t("noSponsors")}</p>
        <ButtonLink href="/historic-sponsors">{t("seeHistoricSponsors")}</ButtonLink>
      </div>
    </section>
  );
}
