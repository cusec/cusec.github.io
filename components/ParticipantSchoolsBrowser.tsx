"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ParticipantSchoolsSummary } from "@/components/ParticipantSchoolsSummary";
import { SchoolCard } from "@/components/SchoolCard";
import type { Region } from "@/lib/schoolsData";

type ParticipantSchoolsBrowserProps = {
  regions: Region[];
};

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
        <div className="cusec-school-filter__summary" aria-live="polite">
          <strong>{activeFocus.label}</strong>
          <p>
            {isSummary
              ? t("summaryDescription")
              : t("regionDescription", { region: activeFocus.label })}
          </p>
          <p className="cusec-school-filter__note">{t("note")}</p>
        </div>
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
