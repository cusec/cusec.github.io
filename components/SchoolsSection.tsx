"use client";

import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ButtonLink";
import { LogoTile } from "@/components/LogoTile";
import { SectionHeading } from "@/components/SectionHeading";
import { featuredRegions } from "@/lib/schoolsData";
import type { School } from "@/lib/schoolsData";

function SchoolCard({ school }: { school: School }) {
  return (
    <article className="cusec-archive-item cusec-school-archive-item cusec-school-archive-item--mosaic">
      <div className="cusec-archive-item__header">
        <div className="cusec-archive-item__brand cusec-school-archive-item__brand">
          {school.logo ? (
            <LogoTile name={school.name} logo={school.logo} variant="compact-left" />
          ) : null}
          <h3>
            <a href={school.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              {school.name}
            </a>
          </h3>
        </div>
      </div>
    </article>
  );
}

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
