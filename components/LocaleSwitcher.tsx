"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { localeNames } from "@/lib/localeNames";

export function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <select
      className="cusec-locale-switcher"
      aria-label={t("label")}
      value={locale}
      disabled={isPending}
      onChange={(event) => {
        const nextLocale = event.target.value;
        startTransition(() => {
          router.replace(pathname, { locale: nextLocale });
        });
      }}
    >
      {routing.locales.map((value) => (
        <option key={value} value={value}>
          {localeNames[value] ?? value}
        </option>
      ))}
    </select>
  );
}
