"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { SpeakerCard } from "@/components/SpeakerCard";
import { getSpeakersForFocus, speakerFocuses } from "@/lib/speakerFocuses";
import type { Speaker } from "@/lib/speakersData";

type PastSpeakersBrowserProps = {
  speakers: Speaker[];
};

export function PastSpeakersBrowser({ speakers }: PastSpeakersBrowserProps) {
  const t = useTranslations("SpeakersBrowser");
  const tSpeakers = useTranslations("Speakers");
  const [activeFocusId, setActiveFocusId] = useState(speakerFocuses[0].id);
  const activeFocus =
    speakerFocuses.find((focus) => focus.id === activeFocusId) ?? speakerFocuses[0];

  const displayedSpeakers = getSpeakersForFocus(speakers, activeFocus);
  const panelId = "speaker-focus-panel";

  return (
    <div className="cusec-historic-sponsors-browser">
      <div className="cusec-sponsor-filter">
        <div className="cusec-sponsor-filter__summary" aria-live="polite">
          <strong>{t(`focus.${activeFocus.id}.label`)}</strong>
          <p>{t(`focus.${activeFocus.id}.description`)}</p>
        </div>

        <div
          className="cusec-sponsor-filter__tabs"
          role="tablist"
          aria-label={t("ariaCategories")}
        >
          {speakerFocuses.map((focus) => {
            const isActive = focus.id === activeFocusId;
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
        className="cusec-archive-list cusec-speakers-grid"
        id={panelId}
        role="tabpanel"
        aria-label={t(`focus.${activeFocus.id}.label`)}
      >
        {displayedSpeakers.length > 0 ? (
          displayedSpeakers.map((speaker, index) => (
            <SpeakerCard
              key={`${speaker.name}-${index}`}
              speaker={speaker}
              bio={tSpeakers(`bios.${speaker.name}`)}
            />
          ))
        ) : (
          <p>{t("noSpeakers")}</p>
        )}
      </div>
    </div>
  );
}
