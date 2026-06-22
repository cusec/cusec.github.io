import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cusec.net";
export const defaultOgImage = "/og-image.png";

export type SeoPageConfig = {
  locale: string;
  path: string;
  title: string;
  description: string;
  image?: string;
};

export function localePath(locale: string, path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${prefix}${normalizedPath}` || "/";
}

export function absoluteUrl(locale: string, path = "/") {
  return new URL(localePath(locale, path), siteUrl).toString();
}

export function languageAlternates(path = "/") {
  return {
    "x-default": new URL(localePath(routing.defaultLocale, path), siteUrl).toString(),
    ...Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        new URL(localePath(locale, path), siteUrl).toString(),
      ]),
    ),
  };
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  image = defaultOgImage,
}: SeoPageConfig): Metadata {
  const url = absoluteUrl(locale, path);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      siteName: "CUSEC",
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
