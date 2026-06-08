"use client";

import { useTranslations } from "next-intl";
import { LogoTile } from "@/components/LogoTile";
import { getSponsorLink } from "@/lib/sponsorLinks";
import type { Sponsor } from "@/lib/sponsorsData";

export function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const t = useTranslations("SponsorsBrowser");
  const sponsorLink = getSponsorLink(sponsor.name);

  return (
    <article className="cusec-archive-item cusec-historic-sponsor cusec-historic-sponsor--mosaic">
      <div className="cusec-archive-item__header">
        <a
          className="cusec-archive-item__brand cusec-historic-sponsor__brand cusec-historic-sponsor__link"
          href={sponsorLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LogoTile name={sponsor.name} logo={sponsor.logo} variant="compact-left" />
        </a>
      </div>

      <div className="cusec-archive-item__content">
        <p>{t(`descriptions.${sponsor.name}`)}</p>
      </div>
    </article>
  );
}
