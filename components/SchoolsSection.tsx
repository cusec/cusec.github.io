"use client";

import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ButtonLink";
import { SchoolCard } from "@/components/SchoolCard";
import { SectionHeading } from "@/components/SectionHeading";
import { featuredRegions } from "@/lib/schoolsData";

export function SchoolsSection() {
  const t = useTranslations("Schools");

  return (
    <section className="cusec-section cusec-schools-section" id="schools">
      <div className="cusec-section__inner">
        <SectionHeading
          title={t.rich("heading", { em: (chunks) => <em>{chunks}</em> })}
          lede={t("lede")}
          align="center"
        />

        <div className="cusec-schools-regions">
          {featuredRegions.map((region) => (
            <div key={region.name} className="cusec-schools-region">
              <h3 className="cusec-schools-region-title">{region.name}</h3>
              <div className="cusec-archive-list cusec-schools-list">
                {region.schools.map((school) => (
                  <SchoolCard key={`${region.name}-${school.name}`} school={school} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="cusec-sponsors-actions">
          <ButtonLink href="/participant-schools">{t("seeAll")}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
