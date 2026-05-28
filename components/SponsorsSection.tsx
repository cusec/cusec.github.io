"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useState } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeading } from "@/components/SectionHeading";
import { sponsorMarqueeRows, type Sponsor } from "@/lib/sponsorsData";

const HIGH_PRIORITY_LOGO_COUNT = 4;

type MarqueeRowProps = {
  direction: "left" | "right";
  onLogoSettled: (key: string) => void;
  rowId: string;
  sponsors: Sponsor[];
};

function MarqueeRow({ direction, onLogoSettled, rowId, sponsors }: MarqueeRowProps) {
  const t = useTranslations("Sponsors");
  const repeatedSponsors = [...sponsors, ...sponsors];

  return (
    <div className={`cusec-marquee-track cusec-marquee-track--${direction}`}>
      {repeatedSponsors.map((sponsor, i) => {
        const logoKey = `${rowId}-${i}-${sponsor.name}`;

        return (
          <div key={logoKey} className="cusec-school-item cusec-marquee-logo" title={sponsor.name}>
            <Image
              src={sponsor.logo}
              alt={t("logoAlt", { name: sponsor.name })}
              quality={95}
              sizes="160px"
              loading="eager"
              fetchPriority={i < HIGH_PRIORITY_LOGO_COUNT ? "high" : "auto"}
              ref={(image) => {
                if (image?.complete) {
                  onLogoSettled(logoKey);
                }
              }}
              onLoad={() => onLogoSettled(logoKey)}
              onError={() => onLogoSettled(logoKey)}
            />
          </div>
        );
      })}
    </div>
  );
}

export function SponsorsSection() {
  const t = useTranslations("Sponsors");
  const [settledLogoKeys, setSettledLogoKeys] = useState<Set<string>>(() => new Set());
  const totalLogoCount = (sponsorMarqueeRows.top.length + sponsorMarqueeRows.bottom.length) * 2;
  const isMarqueeReady = settledLogoKeys.size >= totalLogoCount;

  const handleLogoSettled = useCallback((key: string) => {
    setSettledLogoKeys((currentKeys) => {
      if (currentKeys.has(key)) {
        return currentKeys;
      }

      const nextKeys = new Set(currentKeys);
      nextKeys.add(key);
      return nextKeys;
    });
  }, []);

  return (
    <section className="cusec-section cusec-sponsors-section" id="sponsors">
      <div className="cusec-section__inner">
        <SectionHeading
          title={t.rich("heading", { em: (chunks) => <em>{chunks}</em> })}
          lede={t("lede")}
          align="center"
        />

        <div
          className={`cusec-marquee-container${
            isMarqueeReady ? " cusec-marquee-container--ready" : ""
          }`}
          aria-busy={!isMarqueeReady}
        >
          <MarqueeRow
            direction="right"
            onLogoSettled={handleLogoSettled}
            rowId="top"
            sponsors={sponsorMarqueeRows.top}
          />

          <MarqueeRow
            direction="left"
            onLogoSettled={handleLogoSettled}
            rowId="bottom"
            sponsors={sponsorMarqueeRows.bottom}
          />
        </div>

        <div className="cusec-sponsors-actions">
          <ButtonLink href="/historic-sponsors">{t("seeAll")}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
