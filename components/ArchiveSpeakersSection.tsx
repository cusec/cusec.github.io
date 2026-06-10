import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/SectionHeading";
import { type ArchiveTalk, resolveArchiveUrl } from "@/lib/archiveYearsData";
import type { Speaker } from "@/lib/speakersData";

type ArchiveSpeakersSectionProps = {
  speakers: Speaker[];
  talks: ArchiveTalk[];
};

type SpeakerEntry = {
  speaker: Speaker;
  bio?: string;
  index: number;
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

export async function ArchiveSpeakersSection({ speakers, talks }: ArchiveSpeakersSectionProps) {
  const t = await getTranslations("Archives");
  const tSpeakers = await getTranslations("Speakers");

  const hasContent = speakers.length > 0 || talks.length > 0;

  const entries: SpeakerEntry[] = speakers.map((speaker, index) => ({
    speaker,
    index,
    bio:
      speaker.bio ??
      (tSpeakers.has(`bios.${speaker.name}`) ? tSpeakers(`bios.${speaker.name}`) : speaker.title),
  }));

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
          <div className="cusec-archive-list cusec-speakers--rows">
            {entries.map(({ speaker, bio, index }) => (
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
                  {bio && <p className="cusec-speaker-row__bio">{bio}</p>}
                </div>
              </article>
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
                      <span className="cusec-archive-talk__affiliation"> — {talk.affiliation}</span>
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
