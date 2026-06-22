"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { getSpeakersForFocus, speakerFocuses } from "@/lib/speakerFocuses";
import type { Speaker } from "@/lib/speakersData";

type PastSpeakersBrowserProps = {
  speakers: Speaker[];
};

function maybeLink(speaker: Speaker, className: string, children: React.ReactNode) {
  if (speaker.url) {
    return (
      <a className={className} href={speaker.url} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return <div className={className}>{children}</div>;
}

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

        <div className="cusec-sponsor-filter__tabs" role="tablist" aria-label={t("ariaCategories")}>
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
        className="cusec-archive-list cusec-speakers--rows"
        id={panelId}
        role="tabpanel"
        aria-label={t(`focus.${activeFocus.id}.label`)}
      >
        {displayedSpeakers.length > 0 ? (
          displayedSpeakers.map((speaker, index) => (
            <article key={`${speaker.name}-${index}`} className="cusec-speaker-row">
              {maybeLink(
                speaker,
                "cusec-speaker-row__photo cusec-historic-sponsor__link",
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  sizes="120px"
                  quality={95}
                  style={{ objectFit: "cover" }}
                />,
              )}
              <div className="cusec-speaker-row__body">
                <h3 className="cusec-speaker-row__name">
                  {speaker.url ? (
                    <a
                      className="cusec-historic-sponsor__link"
                      href={speaker.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {speaker.name}
                    </a>
                  ) : (
                    speaker.name
                  )}
                </h3>
                {speaker.title && <p className="cusec-speaker-row__title">{speaker.title}</p>}
                {speaker.talkTitle && (
                  <p className="cusec-speaker-row__talk">{speaker.talkTitle}</p>
                )}
                {tSpeakers.has(`bios.${speaker.name}`) && (
                  <p className="cusec-speaker-row__bio">{tSpeakers(`bios.${speaker.name}`)}</p>
                )}
              </div>
            </article>
          ))
        ) : (
          <p>{t("noSpeakers")}</p>
        )}
      </div>
    </div>
  );
}
