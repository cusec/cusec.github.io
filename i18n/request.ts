import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

type Messages = Record<string, unknown>;

function isPlainObject(value: unknown): value is Messages {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Overlay locale messages on top of the English base so any key missing from a
// non-default locale falls back to English instead of throwing MISSING_MESSAGE.
function deepMerge(base: Messages, override: Messages): Messages {
  const result: Messages = { ...base };
  for (const key of Object.keys(override)) {
    const baseValue = result[key];
    const overrideValue = override[key];
    result[key] =
      isPlainObject(baseValue) && isPlainObject(overrideValue)
        ? deepMerge(baseValue, overrideValue)
        : overrideValue;
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const localeMessages = (await import(`../messages/${locale}.json`))
    .default as Messages;
  const messages =
    locale === routing.defaultLocale
      ? localeMessages
      : deepMerge(
          (await import("../messages/en.json")).default as Messages,
          localeMessages,
        );

  return {
    locale,
    messages,
  };
});
