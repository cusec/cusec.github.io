"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeading } from "@/components/SectionHeading";
import { featuredSpeakers, speakersData, type Speaker } from "@/lib/speakersData";

function SpeakerCard({ speaker, duplicate }: { speaker: Speaker; duplicate?: boolean }) {
  const t = useTranslations("Speakers");

  return (
    <a
      href={speaker.url}
      className="cusec-speaker-card"
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={duplicate}
      tabIndex={duplicate ? -1 : undefined}
    >
      <div className="cusec-speaker-card__photo">
        <Image
          src={speaker.image}
          alt={speaker.name}
          fill
          sizes="220px"
          quality={95}
          style={{ objectFit: "cover" }}
        />
      </div>
      <span className="cusec-speaker-card__name">{speaker.name}</span>
      <span className="cusec-speaker-card__bio">{t(`bios.${speaker.name}`)}</span>
      <span className="cusec-sr-only"> {t("srAbout", { name: speaker.name })}</span>
    </a>
  );
}

export function SpeakersSection() {
  const t = useTranslations("Speakers");
  const carouselSpeakers = [...featuredSpeakers, ...featuredSpeakers];

  return (
    <section className="cusec-section cusec-speakers-section" id="speakers">
      <div className="cusec-section__inner">
        <SectionHeading
          title={t.rich("heading", { em: (chunks) => <em>{chunks}</em> })}
          lede={t("lede")}
          align="left"
        />
      </div>

      <div className="cusec-speakers-carousel">
        <div className="cusec-speakers-carousel__track">
          {carouselSpeakers.map((speaker, i) => (
            <SpeakerCard
              key={`${speaker.name}-${i}`}
              speaker={speaker}
              duplicate={i >= featuredSpeakers.length}
            />
          ))}
        </div>
      </div>

      {speakersData.length > 8 && (
        <div className="cusec-section__inner">
          <div className="cusec-archive-actions">
            <ButtonLink href="/past-speakers">{t("seeAll")}</ButtonLink>
          </div>
        </div>
      )}
    </section>
  );
}
