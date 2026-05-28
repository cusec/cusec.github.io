"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { archiveData, featuredArchive } from "@/lib/archiveData";

export function ArchiveSection() {
  const t = useTranslations("Archive");
  const [showAll, setShowAll] = useState(false);

  const displayedYears = showAll ? archiveData : featuredArchive;

  return (
    <section className="cusec-section cusec-archive-section" id="archive">
      <div className="cusec-section__inner">
        <SectionHeading
          title={t.rich("heading", { em: (chunks) => <em>{chunks}</em> })}
          lede={t("lede")}
          align="left"
        />

        <div className="cusec-archive-list">
          {displayedYears.map((item) => (
            <article key={item.year} className="cusec-archive-item">
              <div className="cusec-archive-item__header">
                <div className="cusec-archive-item__brand">
                  <div className="cusec-archive-item__logo">
                    <Image
                      src={item.logo}
                      alt={t("logoAlt", { year: item.year })}
                      quality={95}
                      sizes="56px"
                    />
                  </div>
                  <h3>{item.title}</h3>
                </div>
                {!item.url && <span className="cusec-archive-item__badge">{t("archived")}</span>}
              </div>

              <div className="cusec-archive-item__content">
                <p>{item.hasDetailedInfo ? t(`detailed.${item.year}`) : t(`info.${item.year}`)}</p>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cusec-archive-link"
                  >
                    {t("visitSite")}{" "}
                    <span aria-hidden="true" className="cusec-button-link__arrow">
                      -&gt;
                    </span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {archiveData.length > 6 && (
          <div className="cusec-archive-actions">
            {!showAll ? (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="cusec-archive-more-btn"
              >
                {t("seeFullArchive")}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowAll(false)}
                className="cusec-archive-more-btn"
              >
                {t("seeLess")}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
