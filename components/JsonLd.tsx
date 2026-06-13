import { jsonLdScript } from "@/lib/seo";

type JsonLdProps = {
  data: unknown;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be emitted as a script tag; content is JSON-stringified and escaped.
      dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
    />
  );
}
