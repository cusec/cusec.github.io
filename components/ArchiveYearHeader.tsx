import type { StaticImageData } from "next/image";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type ArchiveYearHeaderProps = {
  year: number;
  logo: StaticImageData;
  theme?: string;
  liveUrl?: string;
  logoNeedsDarkBg?: boolean;
};

export async function ArchiveYearHeader({
  year,
  logo,
  theme,
  liveUrl,
  logoNeedsDarkBg,
}: ArchiveYearHeaderProps) {
  const t = await getTranslations("Archives");

  return (
    <section className="cusec-section cusec-archive-year-header">
      <div className="cusec-section__inner">
        <Link href="/archives" className="cusec-archive-back">
          <span aria-hidden="true">&larr;</span> {t("backToArchives")}
        </Link>

        <div className="cusec-archive-year-header__main">
          <div
            className={`cusec-archive-year-header__logo${
              logoNeedsDarkBg ? " cusec-archive-year-header__logo--framed" : ""
            }`}
          >
            <Image src={logo} alt={t("logoAlt", { year })} quality={95} sizes="120px" />
          </div>

          <div className="cusec-archive-year-header__text">
            <h1>
              CUSEC {year}
              {theme ? <span className="cusec-archive-year-header__theme"> — {theme}</span> : null}
            </h1>
            {liveUrl ? (
              <div className="cusec-archive-year-header__meta">
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cusec-archive-link"
                >
                  {t("visitSite")}{" "}
                  <span aria-hidden="true" className="cusec-button-link__arrow">
                    -&gt;
                  </span>
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
