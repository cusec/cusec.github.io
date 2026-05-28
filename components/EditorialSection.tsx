import { useTranslations } from "next-intl";
import Image from "next/image";
import type { EditorialSectionContent } from "@/lib/content";
import { Highlight } from "./Highlight";
import { Section } from "./Section";

type EditorialSectionProps = {
  section: EditorialSectionContent;
};

export function EditorialSection({ section }: EditorialSectionProps) {
  const t = useTranslations("Editorial");

  return (
    <Section className="cusec-editorial-section">
      <article className={`cusec-editorial cusec-editorial--image-${section.imageSide}`}>
        <div className="cusec-editorial__copy">
          <h2>{t.rich(`${section.id}.heading`, { em: (chunks) => <em>{chunks}</em> })}</h2>
          {section.bodyKeys.map((bodyKey) => (
            <p key={bodyKey}>
              {t.rich(`${section.id}.${bodyKey}`, {
                hl: (chunks) => <Highlight>{chunks}</Highlight>,
              })}
            </p>
          ))}
        </div>
        <div className="cusec-editorial__media">
          <Image
            src={section.image}
            alt={t(`${section.id}.alt`)}
            quality={95}
            sizes="(max-width: 720px) 100vw, (max-width: 1728px) 42vw, 720px"
          />
        </div>
      </article>
    </Section>
  );
}
