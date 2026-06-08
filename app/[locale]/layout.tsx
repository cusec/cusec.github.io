import type { Metadata } from "next";
import { EB_Garamond, Karla, Noto_Sans_Gurmukhi, Noto_Sans_SC } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { routing } from "@/i18n/routing";
import "../globals.css";

const karla = Karla({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-karla",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sc",
  display: "swap",
});

const notoSansGurmukhi = Noto_Sans_Gurmukhi({
  subsets: ["gurmukhi", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-gurmukhi",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cusec.net";

const localePath = (locale: string) => (locale === routing.defaultLocale ? "/" : `/${locale}`);

// Namespaces consumed by "use client" components. Server components resolve
// their messages during SSR, so only these need to ship in the client bundle.
const clientNamespaces = [
  "Nav",
  "LocaleSwitcher",
  "Archive",
  "Sponsors",
  "SponsorsBrowser",
  "Speakers",
  "SpeakersBrowser",
  "Schools",
  "SchoolsBrowser",
  "Summary",
] as const;

function pick<T extends Record<string, unknown>>(source: T, keys: readonly string[]): Partial<T> {
  const result: Partial<T> = {};
  for (const key of keys) {
    if (key in source) {
      result[key as keyof T] = source[key as keyof T];
    }
  }
  return result;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const languages: Record<string, string> = {
    "x-default": "/",
  };
  for (const supported of routing.locales) {
    languages[supported] = localePath(supported);
  }

  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localePath(locale),
      languages,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${karla.variable} ${ebGaramond.variable} ${notoSansSC.variable} ${notoSansGurmukhi.variable}`}
    >
      <body>
        <NextIntlClientProvider
          messages={pick(messages as Record<string, unknown>, clientNamespaces)}
        >
          <div className="cusec-paper-surface">
            <div className="cusec-paper-overlay" />
            <Navbar />
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
