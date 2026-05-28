# CONTEXT

Shared vocabulary for the CUSEC landing site. Use these terms exactly in code,
comments, and architecture reviews.

## Domain nouns

- **Sponsor** — a company that has supported CUSEC (`lib/sponsorsData.ts`).
- **School** — a university or college that has participated (`lib/schoolsData.ts`).
- **Region** — a named group of Schools (Ontario, Quebec, …).
- **Speaker** — a person who has spoken at a CUSEC conference (`lib/speakersData.ts`).
- **Archive year** — one past conference edition (`lib/archiveData.ts`).
- **Editorial section** — a long-form heading + prose + image block (`lib/content.tsx`).
- **Testimonial** — a quote with attribution (`lib/content.tsx`).

## Architecture terms

- **Section** — the standard page band: `cusec-section` + `cusec-section__inner`
  chrome. Owned by `components/Section.tsx`.
- **Section heading** — the `<h2>` + lede block that opens a Section. One module
  (`components/SectionHeading.tsx`) with an `align: "left" | "center"` variant; list
  sections are left-aligned, marquee/grid sections centered.
- **Logo tile** — a fixed-size framed brand logo with a text fallback. One module
  (`components/LogoTile.tsx`) with a `"default" | "compact-left"` variant. The
  sponsors marquee is the deliberate exception: it keeps a bespoke `<Image>` because
  its per-logo load-tracking drives the marquee fade-in.
- **Featured view** — the curated subset of a data module shown on the landing page
  before "See All" (e.g. `featuredSpeakers`, `featuredArchive`, `featuredRegions`,
  `sponsorMarqueeRows`). Built with `pickByKey` (`lib/pick.ts`), which fails loud on
  an unknown key so curation typos surface at load time.
