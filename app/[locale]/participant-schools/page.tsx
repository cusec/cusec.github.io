import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { ParticipantSchoolsBrowser } from "@/components/ParticipantSchoolsBrowser";
import { SectionHeading } from "@/components/SectionHeading";
import { regionsData } from "@/lib/schoolsData";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages.participantSchools" });

  return buildPageMetadata({
    locale,
    path: "/participant-schools",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ParticipantSchoolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Pages.participantSchools");
  const pageUrl = absoluteUrl(locale, "/participant-schools");
  const schools = regionsData.flatMap((region) =>
    region.schools.map((school) => ({ ...school, region: region.name })),
  );
  const schoolsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("heading").replace(/<\/?em>/g, ""),
    description: t("lede"),
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: schools.length,
      itemListElement: schools.map((school, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CollegeOrUniversity",
          name: school.name,
          url: school.url,
          address: {
            "@type": "PostalAddress",
            addressLocality: school.city,
            addressRegion: school.region,
            addressCountry: "CA",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: school.lat,
            longitude: school.lon,
          },
        },
      })),
    },
  };

  return (
    <>
      <JsonLd data={schoolsJsonLd} />
      <PageShell>
        <section className="cusec-section cusec-archive-section">
          <div className="cusec-section__inner">
            <SectionHeading
              title={t.rich("heading", { em: (chunks) => <em>{chunks}</em> })}
              lede={t("lede")}
              align="left"
            />

            <ParticipantSchoolsBrowser regions={regionsData} />
          </div>
        </section>
      </PageShell>
      <Footer />
    </>
  );
}
