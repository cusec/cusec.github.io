import { z } from "zod";
import { sponsorLinks } from "@/lib/sponsorLinks";
import type { Sponsor } from "@/lib/sponsorsData";

export type SponsorFocus = {
  id: string;
  names: string[];
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

export const sponsorFocuses = sponsorFocusesSchema.parse([
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

export function assertSponsorBrowserData(sponsors: Sponsor[]) {
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

export function getSponsorsForFocus(sponsors: Sponsor[], focus: SponsorFocus) {
  if (focus.id === "all") {
    return sponsors;
  }

  const names = new Set(focus.names);
  return sponsors.filter((sponsor) => names.has(sponsor.name));
}
