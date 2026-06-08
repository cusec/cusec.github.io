import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { Link } from "@/i18n/navigation";
import { archiveData } from "@/lib/archiveData";
import { archiveYearDetails } from "@/lib/archiveYearsData";

export default async function ArchivesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Archives");

  return (
    <>
      <PageShell>
        <section className="cusec-section cusec-archive-section">
          <div className="cusec-section__inner">
            <SectionHeading
              title={t.rich("indexHeading", { em: (chunks) => <em>{chunks}</em> })}
              lede={t("indexLede")}
              align="left"
            />

            <ul className="cusec-archive-rows">
              {archiveData.map((item) => {
                const detail = archiveYearDetails[item.year];
                const theme = detail?.theme;
                const summary = detail?.summary ?? t("indexSummaryPlaceholder");

                return (
                  <li key={item.year}>
                    <Link href={`/archives/${item.year}`} className="cusec-archive-row">
                      <div
                        className={`cusec-archive-row__logo${
                          item.logoNeedsDarkBg ? " cusec-archive-row__logo--framed" : ""
                        }`}
                      >
                        <Image
                          src={item.logo}
                          alt={t("logoAlt", { year: item.year })}
                          quality={95}
                          sizes="(max-width: 40rem) 6rem, 12rem"
                        />
                      </div>

                      <div className="cusec-archive-row__body">
                        <h3 className="cusec-archive-row__title">{item.title}</h3>
                        {theme ? (
                          <p className="cusec-archive-row__meta">
                            <span className="cusec-archive-row__theme">{theme}</span>
                          </p>
                        ) : null}
                        <p className="cusec-archive-row__summary">{summary}</p>
                        <span className="cusec-archive-link">
                          {t("viewEvent")}{" "}
                          <span aria-hidden="true" className="cusec-button-link__arrow">
                            -&gt;
                          </span>
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </PageShell>
      <Footer />
    </>
  );
}
