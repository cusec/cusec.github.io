# Translation catalogs

`en.json` is the source of truth. `fr.json`, `es.json`, `zh.json` (Simplified Chinese), and
`pa.json` (Punjabi / Gurmukhi) were **AI-generated and have NOT been reviewed by native
speakers**. Have a fluent speaker review each before relying on them in production.

Any key missing from a non-English file falls back to the English value at runtime
(`i18n/request.ts` deep-merges `en.json` under the active locale). Because of this:

- `SponsorsBrowser.descriptions` is intentionally **omitted** from the non-English files and
  served from English until real per-sponsor translations exist. Don't reintroduce generic
  stub sentences — either add a faithful translation or leave the key out to fall back.

Conventions:

- `<b>`, `<em>`, `<hl>` are rich-text tags rendered by `t.rich(...)` — keep them intact and
  wrapped around the equivalent translated phrase.
- `{name}`, `{region}`, `{year}` are ICU placeholders — do not translate or remove them.
- Proper nouns (CUSEC, company/school/people names, MBA, SaaS) stay untranslated.
