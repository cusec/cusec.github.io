"use client";

import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { CanadaMap, type MapPin } from "@/components/CanadaMap";
import { ParticipantSchoolsSummary } from "@/components/ParticipantSchoolsSummary";
import { SchoolCard } from "@/components/SchoolCard";
import { type Region, type School, schoolColor, schoolSlug } from "@/lib/schoolsData";

type ParticipantSchoolsBrowserProps = {
  regions: Region[];
};

function schoolsToPins(schools: School[]): MapPin[] {
  return schools.map((school) => ({
    id: schoolSlug(school.name),
    name: school.name,
    city: school.city,
    lat: school.lat,
    lon: school.lon,
    color: schoolColor(school.name),
  }));
}

export function ParticipantSchoolsBrowser({ regions }: ParticipantSchoolsBrowserProps) {
  const t = useTranslations("SchoolsBrowser");
  const tSchools = useTranslations("Schools");

  const allSchools = useMemo(
    () =>
      regions.flatMap((region) => region.schools).toSorted((a, b) => a.name.localeCompare(b.name)),
    [regions],
  );

  const focuses = useMemo(
    () => [
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
    ],
    [allSchools, regions, t],
  );

  const [activeFocusId, setActiveFocusId] = useState(focuses[0].id);
  const [activePinId, setActivePinId] = useState<string | null>(null);

  const activeFocus = focuses.find((focus) => focus.id === activeFocusId) ?? focuses[0];
  const isSummary = activeFocus.id === "summary";
  const panelId = "school-focus-panel";

  const pins = useMemo(() => schoolsToPins(activeFocus.schools), [activeFocus.schools]);

  const handlePinClick = useCallback((id: string) => {
    setActivePinId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const visibleRegions: Region[] = isSummary
    ? regions
    : regions.filter((r) => r.name === activeFocus.label);

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
                onClick={() => {
                  setActiveFocusId(focus.id);
                  setActivePinId(null);
                }}
              >
                <span>{focus.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="cusec-schools-map-wrap cusec-schools-map-wrap--interactive">
        <CanadaMap
          pins={pins}
          onPinClick={handlePinClick}
          activeId={activePinId}
          ariaLabel={tSchools("mapAria")}
        />
      </div>

      <section
        id={panelId}
        aria-label={isSummary ? t("summaryAria") : t("regionAria", { region: activeFocus.label })}
      >
        {isSummary && <ParticipantSchoolsSummary />}

        <div className="cusec-schools-regions-list">
          {visibleRegions.map((region) => (
            <div key={region.name} className="cusec-schools-region-block">
              <h3 className="cusec-schools-region-title">{region.name}</h3>
              <div className="cusec-archive-list cusec-schools-list">
                {region.schools.map((school) => {
                  const id = schoolSlug(school.name);
                  return (
                    <div key={id} id={id} className="cusec-school-anchor">
                      <SchoolCard school={school} />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
