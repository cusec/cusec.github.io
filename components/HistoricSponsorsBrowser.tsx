"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { SponsorCard } from "@/components/SponsorCard";
import {
  assertSponsorBrowserData,
  getSponsorsForFocus,
  sponsorFocuses,
} from "@/lib/sponsorFocuses";
import type { Sponsor } from "@/lib/sponsorsData";

type HistoricSponsorsBrowserProps = {
  sponsors: Sponsor[];
};

export function HistoricSponsorsBrowser({ sponsors }: HistoricSponsorsBrowserProps) {
  assertSponsorBrowserData(sponsors);

  const t = useTranslations("SponsorsBrowser");
  const [activeFocusId, setActiveFocusId] = useState(sponsorFocuses[0].id);
  const activeFocus =
    sponsorFocuses.find((focus) => focus.id === activeFocusId) ?? sponsorFocuses[0];

  const displayedSponsors = getSponsorsForFocus(sponsors, activeFocus);
  const panelId = "sponsor-focus-panel";

  return (
    <div className="cusec-historic-sponsors-browser">
      <div className="cusec-sponsor-filter">
        <div className="cusec-sponsor-filter__summary" aria-live="polite">
          <strong>{t(`focus.${activeFocus.id}.label`)}</strong>
          <p>{t(`focus.${activeFocus.id}.description`)}</p>
          <p className="cusec-sponsor-filter__note">{t("note")}</p>
        </div>

        <div className="cusec-sponsor-filter__tabs" role="tablist" aria-label={t("ariaIndustry")}>
          {sponsorFocuses.map((focus) => {
            const isActive = focus.id === activeFocus.id;

            return (
              <button
                key={focus.id}
                type="button"
                className={`cusec-sponsor-filter__tab${
                  isActive ? " cusec-sponsor-filter__tab--active" : ""
                }`}
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                onClick={() => setActiveFocusId(focus.id)}
              >
                <span>{t(`focus.${focus.id}.label`)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="cusec-archive-list cusec-historic-sponsors-list"
        id={panelId}
        role="tabpanel"
        aria-label={t(`focus.${activeFocus.id}.label`)}
      >
        {displayedSponsors.map((sponsor) => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
    </div>
  );
}
