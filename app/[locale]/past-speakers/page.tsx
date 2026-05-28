import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/PageShell";
import { PastSpeakersBrowser } from "@/components/PastSpeakersBrowser";
import { SectionHeading } from "@/components/SectionHeading";
import { speakersData } from "@/lib/speakersData";

export default async function PastSpeakersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Pages.pastSpeakers");

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

            <PastSpeakersBrowser speakers={speakersData} />
          </div>
        </section>
      </PageShell>
      <Footer />
    </>
  );
}
