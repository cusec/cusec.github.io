// Regenerates assets/anniversary-25.png. Requires a one-off install:
//   npm i --no-save @resvg/resvg-js && node scripts/generate-anniversary-25.mjs

import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOGO_DIR = path.join(ROOT, "assets/cusec-logos");
const OUT = path.join(ROOT, "assets/anniversary-25.png");
const FONT_CACHE = path.join(ROOT, "scripts/.cache/karla-var.ttf");
const FONT_URL =
  "https://raw.githubusercontent.com/google/fonts/main/ofl/karla/Karla%5Bwght%5D.ttf";

const VIEW_W = 720;
const VIEW_H = 460;
const STEP = 66;
const LOGO = 108;
const JITTER = 22;
const PLATE_PAD = 16;
const CELL = 60;
const INK = "#222222";
const RENDER_WIDTH = 1440;
const THICKEN = 16;

function hash01(n) {
  let x = (n ^ 0x9e3779b9) >>> 0;
  x = Math.imul(x ^ (x >>> 16), 0x21f0aaad) >>> 0;
  x = Math.imul(x ^ (x >>> 15), 0x735a2d97) >>> 0;
  x = (x ^ (x >>> 15)) >>> 0;
  return x / 4294967296;
}

const archiveData = [
  2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011,
  2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003,
].map((year) => ({ year, logoNeedsDarkBg: year === 2020 || year === 2016 }));

function buildPlacements() {
  const out = [];
  let i = 0;
  for (let r = 0; r * STEP - LOGO / 2 < VIEW_H + STEP; r += 1) {
    for (let c = 0; c * STEP - LOGO / 2 < VIEW_W + STEP; c += 1) {
      const seed = r * 211 + c * 17;
      const jx = Math.round((hash01(seed) - 0.5) * 2 * JITTER);
      const jy = Math.round((hash01(seed + 911) - 0.5) * 2 * JITTER);
      const brick = (r % 2) * (STEP / 2);
      out.push({
        item: archiveData[(i * 7) % archiveData.length],
        x: Math.round(c * STEP + brick - LOGO / 2 + jx),
        y: Math.round(r * STEP - LOGO / 2 + jy),
        rot: Math.round((hash01(seed + 53) - 0.5) * 16),
      });
      i += 1;
    }
  }
  return out;
}

function buildPixelCells() {
  const out = [];
  const cols = Math.ceil(VIEW_W / CELL);
  const rows = Math.ceil(VIEW_H / CELL);
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const seed = r * 97 + c * 131 + 7;
      out.push({
        x: c * CELL,
        y: r * CELL,
        fill: hash01(seed) > 0.5 ? "#ffffff" : "#000000",
        opacity: Math.round((0.12 + hash01(seed + 41) * 0.5) * 100) / 100,
      });
    }
  }
  return out;
}

async function ensureFont() {
  if (existsSync(FONT_CACHE)) return;
  await fs.mkdir(path.dirname(FONT_CACHE), { recursive: true });
  const res = await fetch(FONT_URL);
  if (!res.ok) throw new Error(`Failed to download Karla: ${res.status}`);
  await fs.writeFile(FONT_CACHE, Buffer.from(await res.arrayBuffer()));
}

async function buildSvg() {
  const defsImages = await Promise.all(
    archiveData.map(async ({ year }) => {
      const buf = await fs.readFile(path.join(LOGO_DIR, `${year}.png`));
      const uri = `data:image/png;base64,${buf.toString("base64")}`;
      return `<image id="crest-${year}" x="0" y="0" width="${LOGO}" height="${LOGO}" preserveAspectRatio="xMidYMid meet" href="${uri}"/>`;
    }),
  );

  const placements = buildPlacements()
    .map(({ item, x, y, rot }) => {
      const cx = x + LOGO / 2;
      const cy = y + LOGO / 2;
      const plate = item.logoNeedsDarkBg
        ? `<rect x="${x + PLATE_PAD}" y="${y + PLATE_PAD}" width="${LOGO - PLATE_PAD * 2}" height="${LOGO - PLATE_PAD * 2}" rx="9" fill="${INK}" stroke="rgba(255,255,255,0.14)" stroke-width="1"/>`
        : "";
      return `<g transform="rotate(${rot} ${cx} ${cy})">${plate}<use href="#crest-${item.year}" x="${x}" y="${y}"/></g>`;
    })
    .join("\n");

  const pixels = buildPixelCells()
    .map(
      ({ x, y, fill, opacity }) =>
        `<rect x="${x}" y="${y}" width="${CELL}" height="${CELL}" fill="${fill}" opacity="${opacity}"/>`,
    )
    .join("\n");

  const numeral = (extra) =>
    `<text x="${VIEW_W / 2}" y="${VIEW_H / 2}" text-anchor="middle" dominant-baseline="central" font-family="Karla" font-weight="800" font-size="500" letter-spacing="-25"${extra}>25</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${VIEW_W}" height="${VIEW_H}" viewBox="0 0 ${VIEW_W} ${VIEW_H}">
<defs>
${defsImages.join("\n")}
<mask id="jubilee-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="${VIEW_W}" height="${VIEW_H}">
<rect width="${VIEW_W}" height="${VIEW_H}" fill="#000000"/>
${numeral(` fill="#ffffff" stroke="#ffffff" stroke-width="${THICKEN}" stroke-linejoin="miter" stroke-miterlimit="2" paint-order="stroke"`)}
</mask>
</defs>
<g mask="url(#jubilee-mask)">
<rect width="${VIEW_W}" height="${VIEW_H}" fill="#ffffff"/>
${placements}
<rect width="${VIEW_W}" height="${VIEW_H}" fill="#000000" opacity="0.45"/>
<g>
${pixels}
</g>
</g>
</svg>`;
}

async function main() {
  await ensureFont();
  const svg = await buildSvg();
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: RENDER_WIDTH },
    font: { fontFiles: [FONT_CACHE], defaultFontFamily: "Karla", loadSystemFonts: false },
    background: "rgba(0,0,0,0)",
  });
  const png = resvg.render().asPng();
  await fs.writeFile(OUT, png);
  console.log(`wrote ${path.relative(ROOT, OUT)} (${(png.length / 1024).toFixed(0)} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
