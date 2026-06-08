"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Sponsor } from "@/lib/sponsorsData";

const HIGH_PRIORITY_LOGO_COUNT = 4;

type MarqueeRowProps = {
  direction: "left" | "right";
  onLogoSettled: (key: string) => void;
  rowId: string;
  sponsors: Sponsor[];
};

export function MarqueeRow({ direction, onLogoSettled, rowId, sponsors }: MarqueeRowProps) {
  const t = useTranslations("Sponsors");
  const repeatedSponsors = [...sponsors, ...sponsors];

  return (
    <div className={`cusec-marquee-track cusec-marquee-track--${direction}`}>
      {repeatedSponsors.map((sponsor, i) => {
        const logoKey = `${rowId}-${i}-${sponsor.name}`;

        return (
          <div key={logoKey} className="cusec-logo-tile cusec-marquee-logo" title={sponsor.name}>
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
