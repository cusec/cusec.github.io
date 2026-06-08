"use client";

import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ButtonLink";
import { LogoTile } from "@/components/LogoTile";
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
              <div className="cusec-schools-logo-grid">
                {region.schools.map((school) => (
                  <a
                    key={school.name}
                    href={school.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cusec-schools-logo-link"
                  >
                    <LogoTile name={school.name} logo={school.logo} />
                  </a>
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
