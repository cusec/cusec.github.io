import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { archiveData } from "@/lib/archiveData";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

const staticPaths = [
  "",
  "/archives",
  "/historic-sponsors",
  "/participant-schools",
  "/past-speakers",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...staticPaths, ...archiveData.map((item) => `/archives/${item.year}`)];

  return paths.map((path) => ({
    url: absoluteUrl(routing.defaultLocale, path),
    alternates: {
      languages: languageAlternates(path),
    },
  }));
}
