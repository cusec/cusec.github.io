import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { PastSpeakersBrowser } from "@/components/PastSpeakersBrowser";
import { SectionHeading } from "@/components/SectionHeading";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { speakersData } from "@/lib/speakersData";

function imageUrl(locale: string, image: StaticImageData | string) {
  return absoluteUrl(locale, typeof image === "string" ? image : image.src);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages.pastSpeakers" });

  return buildPageMetadata({
    locale,
    path: "/past-speakers",
    title: t("title"),
    description: t("description"),
  });
}

export default async function PastSpeakersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Pages.pastSpeakers");
  const pageUrl = absoluteUrl(locale, "/past-speakers");
  const speakersJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("heading").replace(/<\/?em>/g, ""),
    description: t("lede"),
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: speakersData.length,
      itemListElement: speakersData.map((speaker, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Person",
          name: speaker.name,
          ...(speaker.url ? { url: speaker.url } : {}),
          ...(speaker.image ? { image: imageUrl(locale, speaker.image) } : {}),
          ...(speaker.title ? { jobTitle: speaker.title } : {}),
          ...(speaker.talkTitle
            ? { subjectOf: { "@type": "Event", name: speaker.talkTitle } }
            : {}),
        },
      })),
    },
  };

  return (
    <>
      <JsonLd data={speakersJsonLd} />
      <PageShell>
        <section className="cusec-section cusec-archive-section">
          <div className="cusec-section__inner">
            <SectionHeading
              title={t.rich("heading", { em: (chunks) => <em>{chunks}</em> })}
              lede={t("lede")}
              align="left"
            />

            <PastSpeakersBrowser speakers={speakersData} />
          </div>
        </section>
      </PageShell>
      <Footer />
    </>
  );
}
