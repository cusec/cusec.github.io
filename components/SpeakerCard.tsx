import Image from "next/image";
import type { Speaker } from "@/lib/speakersData";

export function SpeakerCard({ speaker, bio }: { speaker: Speaker; bio?: string }) {
  const brandClassName =
    "cusec-archive-item__brand cusec-historic-sponsor__brand cusec-historic-sponsor__link";

  const brandContent = (
    <>
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
    </>
  );

  return (
    <article className="cusec-archive-item cusec-historic-sponsor cusec-historic-sponsor--mosaic">
      <div className="cusec-archive-item__header">
        {speaker.url ? (
          <a
            className={brandClassName}
            href={speaker.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {brandContent}
          </a>
        ) : (
          <div className={brandClassName}>{brandContent}</div>
        )}
      </div>

      {(speaker.title || speaker.talkTitle) && (
        <div className="cusec-speaker-meta">
          {speaker.title && <p className="cusec-speaker-meta__title">{speaker.title}</p>}
          {speaker.talkTitle && <p className="cusec-speaker-meta__talk">{speaker.talkTitle}</p>}
        </div>
      )}

      {bio && (
        <div className="cusec-archive-item__content">
          <p>{bio}</p>
        </div>
      )}
    </article>
  );
}
