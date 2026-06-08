import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/SectionHeading";
import { SpeakerCard } from "@/components/SpeakerCard";
import { curatedSpeakerNames } from "@/lib/archiveSpeakers";
import { resolveArchiveUrl, type ArchiveTalk } from "@/lib/archiveYearsData";
import type { Speaker } from "@/lib/speakersData";

type ArchiveSpeakersSectionProps = {
  speakers: Speaker[];
  talks: ArchiveTalk[];
};

export async function ArchiveSpeakersSection({
  speakers,
  talks,
}: ArchiveSpeakersSectionProps) {
  const t = await getTranslations("Archives");
  const tSpeakers = await getTranslations("Speakers");

  const hasContent = speakers.length > 0 || talks.length > 0;

  return (
    <section className="cusec-section cusec-archive-section">
      <div className="cusec-section__inner">
        <SectionHeading
          title={t.rich("speakersHeading", { em: (chunks) => <em>{chunks}</em> })}
          lede={t("speakersLede")}
          align="left"
        />

        {!hasContent && <p className="cusec-archive-placeholder">{t("noSpeakers")}</p>}

        {speakers.length > 0 && (
          <div className="cusec-archive-list cusec-historic-sponsors-list cusec-speakers-grid">
            {speakers.map((speaker, index) => (
              <SpeakerCard
                key={`${speaker.name}-${index}`}
                speaker={speaker}
                bio={
                  curatedSpeakerNames.has(speaker.name)
                    ? tSpeakers(`bios.${speaker.name}`)
                    : undefined
                }
              />
            ))}
          </div>
        )}

        {talks.length > 0 && (
          <div className="cusec-archive-talks">
            <h3 className="cusec-archive-subheading">{t("talksHeading")}</h3>
            <ul className="cusec-archive-talks__list">
              {talks.map((talk, index) => (
                <li key={`${talk.title}-${index}`} className="cusec-archive-talk">
                  <p className="cusec-archive-talk__title">{talk.title}</p>
                  <p className="cusec-archive-talk__presenter">
                    {talk.presenter}
                    {talk.affiliation ? (
                      <span className="cusec-archive-talk__affiliation">
                        {" "}
                        — {talk.affiliation}
                      </span>
                    ) : null}
                  </p>
                  {talk.links && talk.links.length > 0 && (
                    <p className="cusec-archive-talk__links">
                      {talk.links.map((link) => (
                        <a
                          key={link.url}
                          href={resolveArchiveUrl(link.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cusec-archive-chip"
                        >
                          {link.label}
                        </a>
                      ))}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
