import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/PageShell";
import { ParticipantSchoolsBrowser } from "@/components/ParticipantSchoolsBrowser";
import { SectionHeading } from "@/components/SectionHeading";
import { regionsData } from "@/lib/schoolsData";

export default async function ParticipantSchoolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Pages.participantSchools");

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

            <ParticipantSchoolsBrowser regions={regionsData} />
          </div>
        </section>
      </PageShell>
      <Footer />
    </>
  );
}
