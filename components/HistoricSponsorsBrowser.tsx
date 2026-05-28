"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { z } from "zod";
import { LogoTile } from "@/components/LogoTile";
import type { Sponsor } from "@/lib/sponsorsData";

type SponsorFocus = {
  id: string;
  names: string[];
};

type HistoricSponsorsBrowserProps = {
  sponsors: Sponsor[];
};

const sponsorFocusSchema = z.object({
  id: z.string().min(1),
  names: z.array(z.string().min(1)),
});

const sponsorFocusesSchema = z
  .array(sponsorFocusSchema)
  .min(1)
  .superRefine((focuses, context) => {
    const focusIds = new Set<string>();

    for (const [focusIndex, focus] of focuses.entries()) {
      if (focusIds.has(focus.id)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate sponsor focus id: ${focus.id}`,
          path: [focusIndex, "id"],
        });
      }

      focusIds.add(focus.id);

      const sponsorNames = new Set<string>();

      for (const [nameIndex, sponsorName] of focus.names.entries()) {
        if (sponsorNames.has(sponsorName)) {
          context.addIssue({
            code: "custom",
            message: `Duplicate sponsor name "${sponsorName}" in focus "${focus.id}"`,
            path: [focusIndex, "names", nameIndex],
          });
        }

        sponsorNames.add(sponsorName);
      }
    }
  });

const sponsorLinksSchema = z.record(z.string().min(1), z.url());

const sponsorLinks = sponsorLinksSchema.parse({
  "1Password": "https://1password.com/",
  Accenture: "https://www.accenture.com/",
  Adobe: "https://www.adobe.com/",
  Aerotek: "https://www.aerotek.com/",
  Amazon: "https://www.amazon.com/",
  AppDirect: "https://www.appdirect.com/",
  Apress: "https://www.apress.com/",
  Autodesk: "https://www.autodesk.com/",
  AWS: "https://aws.amazon.com/",
  Balsamiq: "https://balsamiq.com/",
  Benbria: "https://www.benbria.com/",
  BMO: "https://www.bmo.com/",
  CAE: "https://www.cae.com/",
  "Capital One": "https://www.capitalone.com/",
  Ciena: "https://www.ciena.com/",
  Cisco: "https://www.cisco.com/",
  "Compulsion Games": "https://www.compulsiongames.com/",
  CSE: "https://www.cse-cst.gc.ca/",
  CUTC: "https://cutc.ca/",
  D2L: "https://www.d2l.com/",
  Deloitte: "https://www.deloitte.com/",
  Diff: "https://www.diffagency.com/",
  DigitalOcean: "https://www.digitalocean.com/",
  "Direct Energy": "https://www.directenergy.com/",
  Dropbox: "https://www.dropbox.com/",
  EA: "https://www.ea.com/",
  Egghead: "https://egghead.io/",
  Emids: "https://www.emids.com/",
  Evertz: "https://evertz.com/",
  "Evolving Web": "https://evolvingweb.com/",
  Fellow: "https://fellow.app/",
  Gadget: "https://gadget.dev/",
  Gameloft: "https://www.gameloft.com/",
  GE: "https://www.ge.com/",
  Genetec: "https://www.genetec.com/",
  Geotab: "https://www.geotab.com/",
  "General Motors": "https://www.gm.com/",
  Google: "https://www.google.com/",
  IBM: "https://www.ibm.com/",
  iQmetrix: "https://www.iqmetrix.com/",
  "Khan Academy": "https://www.khanacademy.org/",
  Kinaxis: "https://www.kinaxis.com/",
  Knox: "https://www.linkedin.com/company/knox/",
  Leaseweb: "https://www.leaseweb.com/",
  Lightspeed: "https://www.lightspeedhq.com/",
  "Mega Bloks": "https://www.megabrands.com/",
  Microsoft: "https://www.microsoft.com/",
  "Microsoft Azure": "https://azure.microsoft.com/",
  "Morgan Stanley": "https://www.morganstanley.com/",
  Namecheap: "https://www.namecheap.com/",
  "NexJ Systems": "https://www.linkedin.com/company/nexj-systems/",
  Nexsan: "https://www.nexsan.com/",
  Nokia: "https://www.nokia.com/",
  Numerator: "https://www.numerator.com/",
  "O'Reilly": "https://www.oreilly.com/",
  Oracle: "https://www.oracle.com/",
  Palantir: "https://www.palantir.com/",
  Qlik: "https://www.qlik.com/",
  QNX: "https://blackberry.qnx.com/",
  RBC: "https://www.rbc.com/",
  RealDecoy: "https://www.realdecoy.com/",
  "Research In Motion": "https://www.blackberry.com/",
  "Riot Games": "https://www.riotgames.com/",
  SAP: "https://www.sap.com/",
  ServiceNow: "https://www.servicenow.com/",
  Shopify: "https://www.shopify.com/",
  SPIRIA: "https://www.spiria.com/",
  SSENSE: "https://www.ssense.com/",
  "Sticker Beaver": "https://stickerbeaver.ca/",
  "Sticker Mule": "https://www.stickermule.com/",
  Stripe: "https://stripe.com/",
  Tailed: "https://www.linkedin.com/company/tailed/",
  TandemLaunch: "https://www.tandemlaunch.com/",
  TD: "https://www.td.com/",
  TELUS: "https://www.telus.com/",
  "Trip Advisor": "https://www.tripadvisor.com/",
  Ubisoft: "https://www.ubisoft.com/",
  Unity: "https://unity.com/",
  Velocity: "https://velocityincubator.com/",
  Voiceflow: "https://www.voiceflow.com/",
  Wealthsimple: "https://www.wealthsimple.com/",
  Wish: "https://www.wish.com/",
  Wolfram: "https://www.wolfram.com/",
  Wonsulting: "https://www.wonsulting.com/",
  Yelp: "https://www.yelp.com/",
});

const sponsorFocuses = sponsorFocusesSchema.parse([
  {
    id: "all",
    names: [],
  },
  {
    id: "platforms-infra",
    names: [
      "Google",
      "Microsoft",
      "Amazon",
      "Adobe",
      "Oracle",
      "IBM",
      "Dropbox",
      "AWS",
      "Microsoft Azure",
      "DigitalOcean",
      "Cisco",
      "Ciena",
      "Leaseweb",
      "Nexsan",
      "Nokia",
      "TELUS",
      "Evertz",
      "Namecheap",
      "QNX",
      "Research In Motion",
    ],
  },
  {
    id: "software-products",
    names: [
      "Shopify",
      "ServiceNow",
      "1Password",
      "Voiceflow",
      "Fellow",
      "Gadget",
      "Balsamiq",
      "D2L",
      "Qlik",
      "iQmetrix",
      "AppDirect",
      "NexJ Systems",
      "Numerator",
      "Kinaxis",
      "Geotab",
      "Palantir",
      "SAP",
      "Autodesk",
    ],
  },
  {
    id: "finance-commerce",
    names: [
      "RBC",
      "TD",
      "Morgan Stanley",
      "Capital One",
      "BMO",
      "Wealthsimple",
      "Stripe",
      "Shopify",
      "Lightspeed",
      "iQmetrix",
      "SSENSE",
      "Trip Advisor",
      "Yelp",
      "Wish",
      "Sticker Mule",
      "Sticker Beaver",
      "Mega Bloks",
      "Direct Energy",
    ],
  },
  {
    id: "games-creative",
    names: [
      "EA",
      "Riot Games",
      "Unity",
      "Gameloft",
      "Compulsion Games",
      "Ubisoft",
      "Adobe",
      "Autodesk",
      "SSENSE",
      "Trip Advisor",
      "Yelp",
    ],
  },
  {
    id: "services-public-systems",
    names: [
      "Deloitte",
      "Accenture",
      "SPIRIA",
      "Evolving Web",
      "Diff",
      "RealDecoy",
      "Aerotek",
      "Wonsulting",
      "Emids",
      "Benbria",
      "CSE",
      "Khan Academy",
      "D2L",
      "Wolfram",
      "Apress",
      "O'Reilly",
      "Egghead",
      "CUTC",
      "Velocity",
      "TandemLaunch",
      "General Motors",
      "GE",
      "CAE",
      "QNX",
      "Geotab",
      "Genetec",
      "Direct Energy",
      "Research In Motion",
      "Evertz",
    ],
  },
]) satisfies SponsorFocus[];

function assertSponsorBrowserData(sponsors: Sponsor[]) {
  const sponsorNames = new Set(sponsors.map((sponsor) => sponsor.name));

  for (const sponsorName of Object.keys(sponsorLinks)) {
    if (!sponsorNames.has(sponsorName)) {
      throw new Error(`Missing sponsor for configured sponsor link: ${sponsorName}`);
    }
  }

  for (const focus of sponsorFocuses) {
    for (const sponsorName of focus.names) {
      if (!sponsorNames.has(sponsorName)) {
        throw new Error(`Missing sponsor "${sponsorName}" in focus "${focus.id}"`);
      }
    }
  }
}

function getSponsorLink(sponsorName: string) {
  return (
    sponsorLinks[sponsorName] ??
    `https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(sponsorName)}`
  );
}

function getSponsorsForFocus(sponsors: Sponsor[], focus: SponsorFocus) {
  if (focus.id === "all") {
    return sponsors;
  }

  const names = new Set(focus.names);
  return sponsors.filter((sponsor) => names.has(sponsor.name));
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const t = useTranslations("SponsorsBrowser");
  const sponsorLink = getSponsorLink(sponsor.name);

  return (
    <article className="cusec-archive-item cusec-historic-sponsor cusec-historic-sponsor--mosaic">
      <div className="cusec-archive-item__header">
        <a
          className="cusec-archive-item__brand cusec-historic-sponsor__brand cusec-historic-sponsor__link"
          href={sponsorLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LogoTile name={sponsor.name} logo={sponsor.logo} variant="compact-left" />

          <h3>{sponsor.name}</h3>
        </a>
      </div>

      <div className="cusec-archive-item__content">
        <p>{t(`descriptions.${sponsor.name}`)}</p>
      </div>
    </article>
  );
}

export function HistoricSponsorsBrowser({ sponsors }: HistoricSponsorsBrowserProps) {
  assertSponsorBrowserData(sponsors);

  const t = useTranslations("SponsorsBrowser");
  const [activeFocusId, setActiveFocusId] = useState(sponsorFocuses[0].id);
  const activeFocus =
    sponsorFocuses.find((focus) => focus.id === activeFocusId) ?? sponsorFocuses[0];

  const displayedSponsors = getSponsorsForFocus(sponsors, activeFocus);
  const panelId = "sponsor-focus-panel";

  return (
    <div className="cusec-historic-sponsors-browser">
      <div className="cusec-sponsor-filter">
        <div className="cusec-sponsor-filter__summary" aria-live="polite">
          <strong>{t(`focus.${activeFocus.id}.label`)}</strong>
          <p>{t(`focus.${activeFocus.id}.description`)}</p>
          <p className="cusec-sponsor-filter__note">{t("note")}</p>
        </div>

        <div
          className="cusec-sponsor-filter__tabs"
          role="tablist"
          aria-label={t("ariaIndustry")}
        >
          {sponsorFocuses.map((focus) => {
            const isActive = focus.id === activeFocus.id;

            return (
              <button
                key={focus.id}
                type="button"
                className={`cusec-sponsor-filter__tab${
                  isActive ? " cusec-sponsor-filter__tab--active" : ""
                }`}
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                onClick={() => setActiveFocusId(focus.id)}
              >
                <span>{t(`focus.${focus.id}.label`)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="cusec-archive-list cusec-historic-sponsors-list"
        id={panelId}
        role="tabpanel"
        aria-label={t(`focus.${activeFocus.id}.label`)}
      >
        {displayedSponsors.map((sponsor) => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
    </div>
  );
}
