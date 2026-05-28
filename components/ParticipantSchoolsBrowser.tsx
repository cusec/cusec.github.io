"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { LogoTile } from "@/components/LogoTile";
import { ParticipantSchoolsSummary } from "@/components/ParticipantSchoolsSummary";
import type { Region, School } from "@/lib/schoolsData";

type ParticipantSchoolsBrowserProps = {
  regions: Region[];
};

function SchoolCard({ school }: { school: School }) {
  return (
    <article className="cusec-archive-item cusec-school-archive-item cusec-school-archive-item--mosaic">
      <div className="cusec-archive-item__header">
        <div className="cusec-archive-item__brand cusec-school-archive-item__brand">
          {school.logo ? (
            <LogoTile name={school.name} logo={school.logo} variant="compact-left" />
          ) : null}
          <h3>
            <a
              href={school.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              {school.name}
            </a>
          </h3>
        </div>
      </div>
    </article>
  );
}

export function ParticipantSchoolsBrowser({ regions }: ParticipantSchoolsBrowserProps) {
  const t = useTranslations("SchoolsBrowser");
  const allSchools = regions
    .flatMap((region) => region.schools)
    .toSorted((firstSchool, secondSchool) => firstSchool.name.localeCompare(secondSchool.name));
  const focuses = [
    {
      id: "summary",
      label: t("summary"),
      description: "",
      schools: allSchools,
    },
    ...regions.map((region) => ({
      id: region.name.toLowerCase().replace(/\s+/g, "-"),
      label: region.name,
      description: t("regionDescription", { region: region.name }),
      schools: region.schools,
    })),
  ];

  const [activeFocusId, setActiveFocusId] = useState(focuses[0].id);
  const activeFocus = focuses.find((focus) => focus.id === activeFocusId) ?? focuses[0];

  const panelId = "school-focus-panel";
  const isSummary = activeFocus.id === "summary";

  return (
    <div className="cusec-schools-browser">
      <div className="cusec-school-filter">
        {!isSummary ? (
          <div className="cusec-school-filter__summary" aria-live="polite">
            <strong>{activeFocus.label}</strong>
            <p>{activeFocus.description}</p>
            <p className="cusec-school-filter__note">{t("note")}</p>
          </div>
        ) : (
          <div aria-hidden="true" />
        )}

        <div className="cusec-school-filter__tabs">
          {focuses.map((focus) => {
            const isActive = focus.id === activeFocus.id;

            return (
              <button
                key={focus.id}
                type="button"
                className={`cusec-school-filter__tab${
                  isActive ? " cusec-school-filter__tab--active" : ""
                }`}
                aria-pressed={isActive}
                aria-controls={panelId}
                onClick={() => setActiveFocusId(focus.id)}
              >
                <span>{focus.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <section
        id={panelId}
        aria-label={isSummary ? t("summaryAria") : t("regionAria", { region: activeFocus.label })}
      >
        {isSummary ? (
          <div className="cusec-summary-with-schools">
            <ParticipantSchoolsSummary />

            <div className="cusec-archive-list cusec-schools-list">
              {activeFocus.schools.map((school, idx) => (
                <SchoolCard key={`${school.name}-${idx}`} school={school} />
              ))}
            </div>
          </div>
        ) : (
          <div className="cusec-archive-list cusec-schools-list">
            {activeFocus.schools.map((school, idx) => (
              <SchoolCard key={`${school.name}-${idx}`} school={school} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
