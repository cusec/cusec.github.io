import type { StaticImageData } from "next/image";
import { pickByKey } from "./pick";
import onepassword from "../assets/sponsor-logos/1password-logo.png";
import accenture from "../assets/sponsor-logos/accenture_logo.png";
import adobe from "../assets/sponsor-logos/adobe-logo.png";
import aerotek from "../assets/sponsor-logos/aerotek.svg";
import amazon from "../assets/sponsor-logos/amazon_logo.png";
import appDirect from "../assets/sponsor-logos/AppDirect.svg";
import apress from "../assets/sponsor-logos/apress.svg";
import autodesk from "../assets/sponsor-logos/autodesk.webp";
import aws from "../assets/sponsor-logos/aws.png";
import azure from "../assets/sponsor-logos/azure.svg";
import balsamiq from "../assets/sponsor-logos/balsamiq.svg";
import benbria from "../assets/sponsor-logos/benbria.webp";
import blackberry from "../assets/sponsor-logos/blackberry.svg";
import bmo from "../assets/sponsor-logos/bmo.svg";
import cae from "../assets/sponsor-logos/cae.svg";
import capitalOne from "../assets/sponsor-logos/capitalone.png";
import ciena from "../assets/sponsor-logos/ciena.png";
import cisco from "../assets/sponsor-logos/cisco.svg";
import compulsionGames from "../assets/sponsor-logos/compulsion.svg";
import cse from "../assets/sponsor-logos/cse.png";
import cutc from "../assets/sponsor-logos/cutc.jpeg";
import d2l from "../assets/sponsor-logos/d2l.png";
import deloitte from "../assets/sponsor-logos/deloitte.png";
import diff from "../assets/sponsor-logos/diff.svg";
import digitalOcean from "../assets/sponsor-logos/digitalocean.svg";
import directEnergy from "../assets/sponsor-logos/directenergy.webp";
import dropbox from "../assets/sponsor-logos/dropbox-logo.png";
import ea from "../assets/sponsor-logos/ea.svg";
import egghead from "../assets/sponsor-logos/egghead.webp";
import emids from "../assets/sponsor-logos/emids.svg";
import evertz from "../assets/sponsor-logos/evertz.svg";
import evolvingWeb from "../assets/sponsor-logos/evolvingweb.svg";
import fellow from "../assets/sponsor-logos/fellow.svg";
import gadget from "../assets/sponsor-logos/gadget.svg";
import gameloft from "../assets/sponsor-logos/gameloft-logo.png";
import ge from "../assets/sponsor-logos/GE.png";
import genetec from "../assets/sponsor-logos/genetec.png";
import geotab from "../assets/sponsor-logos/geotab.svg";
import gm from "../assets/sponsor-logos/generalmotors.svg";
import google from "../assets/sponsor-logos/google.png";
import ibm from "../assets/sponsor-logos/ibm.png";
import iqmetrix from "../assets/sponsor-logos/iqmetrix.png";
import khanAcademy from "../assets/sponsor-logos/khan academy.png";
import kinaxis from "../assets/sponsor-logos/kinaxis.svg";
import knox from "../assets/sponsor-logos/knox.png";
import leaseweb from "../assets/sponsor-logos/leaseweb.svg";
import lightspeed from "../assets/sponsor-logos/lightspeed.png";
import megaBloks from "../assets/sponsor-logos/megablocks.png";
import microsoft from "../assets/sponsor-logos/microsoft.png";
import morganStanley from "../assets/sponsor-logos/morgan-stanley.png";
import namecheap from "../assets/sponsor-logos/namecheap.svg";
import nexj from "../assets/sponsor-logos/nexj.svg";
import nexsan from "../assets/sponsor-logos/nexsan.svg";
import nokia from "../assets/sponsor-logos/nokia.png";
import numerator from "../assets/sponsor-logos/numerator.svg";
import oreilly from "../assets/sponsor-logos/oreilly.png";
import oracle from "../assets/sponsor-logos/oracle-logo.png";
import palantir from "../assets/sponsor-logos/palantir.png";
import qlik from "../assets/sponsor-logos/qlik.svg";
import qnx from "../assets/sponsor-logos/qnx.svg";
import rbc from "../assets/sponsor-logos/rbc.svg";
import realDecoy from "../assets/sponsor-logos/realdecoy.svg";
import riotGames from "../assets/sponsor-logos/riot.png";
import sap from "../assets/sponsor-logos/SAP.png";
import serviceNow from "../assets/sponsor-logos/servicenow.svg";
import shopify from "../assets/sponsor-logos/shopify.png";
import spiria from "../assets/sponsor-logos/spiria.jpg";
import ssense from "../assets/sponsor-logos/ssense_logo.png";
import stickerBeaver from "../assets/sponsor-logos/stickerbeaver.png";
import stickerMule from "../assets/sponsor-logos/stickermule.png";
import stripe from "../assets/sponsor-logos/stripe.png";
import tailed from "../assets/sponsor-logos/tailed.svg";
import tandemLaunch from "../assets/sponsor-logos/tandemlaunch.svg";
import td from "../assets/sponsor-logos/TD.png";
import telus from "../assets/sponsor-logos/telus-logo.png";
import tripAdvisor from "../assets/sponsor-logos/tripadvisor.svg";
import ubisoft from "../assets/sponsor-logos/ubisoft.png";
import unity from "../assets/sponsor-logos/unity.png";
import velocity from "../assets/sponsor-logos/velocity.png";
import voiceflow from "../assets/sponsor-logos/voiceflow.svg";
import wealthsimple from "../assets/sponsor-logos/wealthsimple.png";
import wish from "../assets/sponsor-logos/wish.svg";
import wolfram from "../assets/sponsor-logos/wolfram.png";
import wonsulting from "../assets/sponsor-logos/wonsulting.png";
import yelp from "../assets/sponsor-logos/yelp.png";

export type Sponsor = {
  name: string;
  logo: StaticImageData;
};

function sponsor(name: string, logo: StaticImageData): Sponsor {
  return { name, logo };
}

export const sponsorsData: Sponsor[] = [
  sponsor("Google", google),
  sponsor("Microsoft", microsoft),
  sponsor("Shopify", shopify),
  sponsor("Amazon", amazon),
  sponsor("AWS", aws),
  sponsor("Stripe", stripe),
  sponsor("Palantir", palantir),
  sponsor("Dropbox", dropbox),
  sponsor("Adobe", adobe),
  sponsor("Oracle", oracle),
  sponsor("EA", ea),
  sponsor("Riot Games", riotGames),
  sponsor("Unity", unity),
  sponsor("General Motors", gm),
  sponsor("RBC", rbc),
  sponsor("IBM", ibm),
  sponsor("Deloitte", deloitte),
  sponsor("Morgan Stanley", morganStanley),
  sponsor("Nokia", nokia),
  sponsor("SAP", sap),
  sponsor("TD", td),
  sponsor("Capital One", capitalOne),
  sponsor("GE", ge),
  sponsor("Wealthsimple", wealthsimple),
  sponsor("Lightspeed", lightspeed),
  sponsor("TELUS", telus),
  sponsor("Research In Motion", blackberry),
  sponsor("Autodesk", autodesk),
  sponsor("QNX", qnx),
  sponsor("Gameloft", gameloft),
  sponsor("Voiceflow", voiceflow),
  sponsor("iQmetrix", iqmetrix),
  sponsor("SPIRIA", spiria),
  sponsor("Trip Advisor", tripAdvisor),
  sponsor("Wolfram", wolfram),
  sponsor("Compulsion Games", compulsionGames),
  sponsor("Accenture", accenture),
  sponsor("1Password", onepassword),
  sponsor("CSE", cse),
  sponsor("Kinaxis", kinaxis),
  sponsor("Wonsulting", wonsulting),
  sponsor("Wish", wish),
  sponsor("Yelp", yelp),
  sponsor("Khan Academy", khanAcademy),
  sponsor("CAE", cae),
  sponsor("Qlik", qlik),
  sponsor("D2L", d2l),
  sponsor("TandemLaunch", tandemLaunch),
  sponsor("Evolving Web", evolvingWeb),
  sponsor("Ubisoft", ubisoft),
  sponsor("Tailed", tailed),
  sponsor("Knox", knox),
  sponsor("Genetec", genetec),
  sponsor("Sticker Mule", stickerMule),
  sponsor("Sticker Beaver", stickerBeaver),
  sponsor("SSENSE", ssense),
  sponsor("Fellow", fellow),
  sponsor("Egghead", egghead),
  sponsor("Diff", diff),
  sponsor("Ciena", ciena),
  sponsor("Balsamiq", balsamiq),
  sponsor("Gadget", gadget),
  sponsor("Aerotek", aerotek),
  sponsor("AppDirect", appDirect),
  sponsor("Apress", apress),
  sponsor("Benbria", benbria),
  sponsor("BMO", bmo),
  sponsor("Cisco", cisco),
  sponsor("CUTC", cutc),
  sponsor("DigitalOcean", digitalOcean),
  sponsor("Direct Energy", directEnergy),
  sponsor("Emids", emids),
  sponsor("Evertz", evertz),
  sponsor("Geotab", geotab),
  sponsor("Leaseweb", leaseweb),
  sponsor("Mega Bloks", megaBloks),
  sponsor("Microsoft Azure", azure),
  sponsor("Namecheap", namecheap),
  sponsor("NexJ Systems", nexj),
  sponsor("Nexsan", nexsan),
  sponsor("Numerator", numerator),
  sponsor("O'Reilly", oreilly),
  sponsor("RealDecoy", realDecoy),
  sponsor("ServiceNow", serviceNow),
  sponsor("Velocity", velocity),
];

function sponsorsByName(names: string[]): Sponsor[] {
  return pickByKey(sponsorsData, "name", names);
}

export const sponsorMarqueeRows = {
  top: sponsorsByName([
    "Google",
    "Microsoft",
    "Amazon",
    "Shopify",
    "Stripe",
    "Palantir",
    "Dropbox",
    "Adobe",
    "Oracle",
    "IBM",
    "EA",
    "Riot Games",
    "Unity",
    "General Motors",
    "1Password",
  ]),
  bottom: sponsorsByName([
    "Lightspeed",
    "Wealthsimple",
    "SAP",
    "iQmetrix",
    "SPIRIA",
    "Fellow",
    "Gadget",
    "Voiceflow",
    "QNX",
    "TELUS",
    "Research In Motion",
    "Autodesk",
    "Gameloft",
    "Morgan Stanley",
    "RBC",
    "Deloitte",
    "Accenture",
  ]),
};
