"use client";

import { useTranslations } from "next-intl";
import { useCallback, useRef, useState } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { MarqueeRow } from "@/components/MarqueeRow";
import { SectionHeading } from "@/components/SectionHeading";
import { sponsorMarqueeRows } from "@/lib/sponsorsData";
import { useInView } from "@/lib/useInView";

const totalLogoCount = (sponsorMarqueeRows.top.length + sponsorMarqueeRows.bottom.length) * 2;

export function SponsorsSection() {
  const t = useTranslations("Sponsors");

  // Track settled logos in a ref so each image load doesn't re-render the whole
  // marquee. Only flip the boolean (one render) once every logo has settled.
  const settledLogoKeys = useRef<Set<string>>(new Set());
  const [isMarqueeReady, setIsMarqueeReady] = useState(false);

  const { inView, ref: marqueeRef } = useInView<HTMLDivElement>();

  const handleLogoSettled = useCallback((key: string) => {
    if (settledLogoKeys.current.has(key)) {
      return;
    }

    settledLogoKeys.current.add(key);

    if (settledLogoKeys.current.size >= totalLogoCount) {
      setIsMarqueeReady(true);
    }
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
          ref={marqueeRef}
          className={`cusec-marquee-container${
            isMarqueeReady ? " cusec-marquee-container--ready" : ""
          }${inView ? " cusec-marquee-container--in-view" : ""}`}
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
