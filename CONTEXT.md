# CONTEXT

Shared vocabulary for the CUSEC landing site. Use these terms exactly in code,
comments, and architecture reviews.

## Domain nouns

- **Sponsor** — a company that has supported CUSEC (`lib/sponsorsData.ts`).
- **School** — a university or college that has participated (`lib/schoolsData.ts`). Each
  School carries `name`, `url`, `logo`, `city` (e.g. "Toronto, ON"), and `lat` / `lon`
  (main-campus coordinates used to place pins on the Canada map).
- **Region** — a named group of Schools (Ontario, Quebec, …).
- **Speaker** — a person who has spoken at a CUSEC conference (`lib/speakersData.ts`).
  Speaker bios live in i18n at `Speakers.bios.<name>`; both `SpeakersSection` (marquee
  card) and `PastSpeakersBrowser` read from there.
- **Archive year** — one past conference edition (`lib/archiveData.ts`).
- **Editorial section** — a long-form heading + prose + image block (`lib/content.tsx`).
- **Testimonial** — a quote with attribution (`lib/content.tsx`).
- **Map pin** — a marker on the Canada map representing one School. Pins sharing a
  `city` are jittered around the city centroid with a faint stem; single-city pins sit
  on their true coordinates. Pin id is `schoolSlug(name)` so the participant-schools
  page can scroll to the matching card on click. Pin fill is the school's primary
  brand color, looked up via `schoolColor(name)` from the `SCHOOL_COLORS` map in
  `lib/schoolsData.ts`; missing entries fall back to ink. Hover/active states preserve
  the brand color and convey state via glow filter, larger radius, focus-stroke, and
  pulse animation rather than a color swap.

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
- **Canada map** — `components/CanadaMap.tsx`. Client component built on
  `react-simple-maps` with a `geoAlbers` projection (rotate `[98, 0, 0]`, center
  `[0, 54.5]`, parallels `[44, 58]`, scale `950`) tuned to frame populated Canada and
  drop the empty Arctic band. Renders a `<Sphere>` outline, a faint `<Graticule>` at
  10° steps, the Canada feature from `/public/maps/world-110m.json` (world-atlas
  topojson, ISO id `124`), and pins as SVG `<circle>`s. Static when called without
  `onPinClick`; interactive (hover glow, active pulse, keyboard activate, click-to-scroll)
  when a handler is passed. `SchoolsSection` (landing page) keeps the original logo
  grid; the map is only used on `/participant-schools` via `ParticipantSchoolsBrowser`.
- **ButtonLink** (`components/ButtonLink.tsx`) — accepts an optional `newTab` prop
  that sets `target="_blank"` + `rel="noopener noreferrer"` on http(s)/anchor hrefs.
  Used for the Hero CTA pointing at `https://2027.cusec.net`.
