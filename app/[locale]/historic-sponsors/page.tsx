import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { HistoricSponsorsBrowser } from "@/components/HistoricSponsorsBrowser";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { sponsorsData } from "@/lib/sponsorsData";

export default async function HistoricSponsorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Pages.historicSponsors");

  return (
    <>
      <PageShell>
        <section className="cusec-section cusec-archive-section">
          <div className="cusec-section__inner">
            <SectionHeading
              title={t.rich("heading", { em: (chunks) => <em>{chunks}</em> })}
              lede={t("lede")}
              align="left"
            />

            <HistoricSponsorsBrowser sponsors={sponsorsData} />
          </div>
        </section>
      </PageShell>
      <Footer />
    </>
  );
}
