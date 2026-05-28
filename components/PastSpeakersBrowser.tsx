"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import type { Speaker } from "@/lib/speakersData";

type SpeakerFocus = {
  id: string;
  years: number[];
};

type PastSpeakersBrowserProps = {
  speakers: Speaker[];
};

const speakerFocuses: SpeakerFocus[] = [
  { id: "legends", years: [] },
  { id: "2020s", years: [2020, 2021, 2022] },
  {
    id: "2010s",
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
  },
  { id: "2000s", years: [2004, 2005, 2006, 2007, 2008, 2009] },
];

const legendNames = [
  "Kent Beck",
  "Richard Stallman",
  "Joel Spolsky",
  "Jeff Atwood",
  "Alexis Ohanian",
  "David Heinemeier Hansson",
  "Douglas Crockford",
  "Bruce Schneier",
  "Bret Victor",
];

function getSpeakersForFocus(speakers: Speaker[], focus: SpeakerFocus) {
  if (focus.id === "legends") {
    const names = new Set(legendNames);
    return speakers.filter((speaker) => names.has(speaker.name));
  }

  const years = new Set(focus.years);
  return speakers.filter((speaker) => speaker.year && years.has(speaker.year));
}

function SpeakerCard({ speaker, bio }: { speaker: Speaker; bio: string }) {
  return (
    <article className="cusec-archive-item cusec-historic-sponsor cusec-historic-sponsor--mosaic">
      <div className="cusec-archive-item__header">
        <a
          className="cusec-archive-item__brand cusec-historic-sponsor__brand cusec-historic-sponsor__link"
          href={speaker.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="cusec-speaker-photo">
            <Image
              src={speaker.image}
              alt={speaker.name}
              fill
              sizes="240px"
              quality={95}
              style={{ objectFit: "cover" }}
            />
          </div>
          <h3>{speaker.name}</h3>
        </a>
      </div>

      <div className="cusec-archive-item__content">
        <p>{bio}</p>
      </div>
    </article>
  );
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
