import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { HistoricSponsorsBrowser } from "@/components/HistoricSponsorsBrowser";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { sponsorsData } from "@/lib/sponsorsData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages.historicSponsors" });

  return buildPageMetadata({
    locale,
    path: "/historic-sponsors",
    title: t("title"),
    description: t("description"),
  });
}

export default async function HistoricSponsorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Pages.historicSponsors");
  const pageUrl = absoluteUrl(locale, "/historic-sponsors");
  const sponsorsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("heading").replace(/<\/?em>/g, ""),
    description: t("lede"),
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: sponsorsData.length,
      itemListElement: sponsorsData.map((sponsor, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Organization",
          name: sponsor.name,
        },
      })),
    },
  };

  return (
    <>
      <JsonLd data={sponsorsJsonLd} />
      <PageShell>
        <section className="cusec-section cusec-archive-section">
          <div className="cusec-section__inner">
            <SectionHeading
              title={t.rich("heading", { em: (chunks) => <em>{chunks}</em> })}
              lede={t("lede")}
              align="left"
              as="h1"
            />

            <HistoricSponsorsBrowser sponsors={sponsorsData} />
          </div>
        </section>
      </PageShell>
      <Footer />
    </>
  );
}
