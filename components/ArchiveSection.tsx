import Image from "next/image";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeading } from "@/components/SectionHeading";
import { Link } from "@/i18n/navigation";
import anniversary25 from "@/assets/anniversary-25.png";

export function ArchiveSection() {
  const t = useTranslations("Archive");

  return (
    <section className="cusec-section cusec-archive-section" id="archive">
      <div className="cusec-section__inner">
        <SectionHeading
          title={t.rich("heading", { em: (chunks) => <em>{chunks}</em> })}
          lede={t("lede")}
          align="left"
        />

        <div className="cusec-archive-jubilee">
          <Link
            href="/archives"
            className="cusec-archive-jubilee__figure"
            aria-label={t("previewCount", { count: 25 })}
          >
            <Image
              className="cusec-archive-jubilee__svg"
              src={anniversary25}
              alt=""
              aria-hidden="true"
              priority
              sizes="(max-width: 760px) 90vw, 45vw"
            />
          </Link>

          <div className="cusec-archive-jubilee__aside">
            <p className="cusec-archive-jubilee__lede">{t("previewSummary")}</p>
            <div className="cusec-archive-actions cusec-archive-actions--preview">
              <ButtonLink href="/archives">{t("seeFullArchive")}</ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
