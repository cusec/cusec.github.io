import type { StaticImageData } from "next/image";
import aadityaChopra from "../assets/speaker-photos/aaditya_chopra.jpg";
import aaronPatterson from "../assets/speaker-photos/aaron-patterson.png";
import alexVelazquez from "../assets/speaker-photos/alex_velazquez.jpg";
import alexKarp from "../assets/speaker-photos/alex-karp.png";
import alexaStroll from "../assets/speaker-photos/alexa_stroll.jpg";
import alexisOhanian from "../assets/speaker-photos/alexis-ohanian.png";
import ananyaNair from "../assets/speaker-photos/ananya_nair.jpg";
import augusteRame from "../assets/speaker-photos/auguste_rame.jpg";
import bretVictor from "../assets/speaker-photos/bret-victor.png";
import bruceSchneier from "../assets/speaker-photos/bruce-schneier.png";
import caitlinKelleher from "../assets/speaker-photos/caitlin_kelleher.jpg";
import cameronAlexander from "../assets/speaker-photos/cameron_alexander.jpg";
import camilleFournier from "../assets/speaker-photos/camille-fournier.png";
import claudiuScotnotis from "../assets/speaker-photos/claudiu_scotnotis.jpg";
import davidHeinemeierHansson from "../assets/speaker-photos/david-heinemeier-hansson.png";
import devonKnight from "../assets/speaker-photos/devon_knight.jpg";
import douglasCrockford from "../assets/speaker-photos/douglas-crackford.png";
import dylanSteen from "../assets/speaker-photos/dylan_steen.jpg";
import edwinSarmiento from "../assets/speaker-photos/edwin_sarmiento.jpg";
import eleanorRumsey from "../assets/speaker-photos/eleanor_rumsey.jpg";
import evaGalperin from "../assets/speaker-photos/eva-galperin.jpg";
import fatimaTaj from "../assets/speaker-photos/fatima_taj.jpg";
import florentGiraud from "../assets/speaker-photos/florent_giraud.jpg";
import gailCarmichael from "../assets/speaker-photos/gail_carmichael.jpg";
import gayleLaakmannMcdowell from "../assets/speaker-photos/gayle-laakmann-mcdowell.jpg";
import gaziJarin from "../assets/speaker-photos/gazi_jarin.jpg";
import georgesAntoineAssi from "../assets/speaker-photos/georges-antoine_assi.png";
import gradyBooch from "../assets/speaker-photos/grady-booch.png";
import gregWilson from "../assets/speaker-photos/greg_wilson.jpg";
import gregKroahHartman from "../assets/speaker-photos/greg-kroah-hartman.png";
import jeffAtwood from "../assets/speaker-photos/jeff-atwood.png";
import jeffUllman from "../assets/speaker-photos/jeff-ullman.png";
import jocelyneMurphy from "../assets/speaker-photos/jocelyne_murphy.png";
import joelSpolsky from "../assets/speaker-photos/joel-spolsky.png";
import joellePineau from "../assets/speaker-photos/joelle-pineau.png";
import juliaEvans from "../assets/speaker-photos/julia-evans.png";
import kathySierra from "../assets/speaker-photos/kathy-sierra.png";
import kentBeck from "../assets/speaker-photos/kent-beck.png";
import laurenceLiang from "../assets/speaker-photos/laurence_liang.jpg";
import laurieHendren from "../assets/speaker-photos/laurie-hendren.jpg";
import leahCulver from "../assets/speaker-photos/leah_culver.jpg";
import lynChen from "../assets/speaker-photos/lyn_chen.jpg";
import marceloArdiles from "../assets/speaker-photos/marcelo-ardiles.jpg";
import marshaChechik from "../assets/speaker-photos/marsha_chechik.jpg";
import matthewMacraeBovell from "../assets/speaker-photos/matthew_macra-bovell.jpg";
import mayaLekhi from "../assets/speaker-photos/maya_lekhi.jpg";
import michaelSeibel from "../assets/speaker-photos/michael-seibel.png";
import michelleZatlyn from "../assets/speaker-photos/michelle-zatlyn.png";
import mukundMauji from "../assets/speaker-photos/mukund_mauji.jpg";
import nivyKani from "../assets/speaker-photos/nivy_kani.jpg";
import pirijanKeth from "../assets/speaker-photos/pirijan_keth.jpg";
import prashanthiRamesh from "../assets/speaker-photos/prashanthi_ramesh.jpg";
import rababAzeem from "../assets/speaker-photos/rabab_azeem.jpg";
import richardStallman from "../assets/speaker-photos/richard-stallman.png";
import ridaMehdi from "../assets/speaker-photos/rida_mehdi.jpg";
import rueSriharsha from "../assets/speaker-photos/rue_sriharsha.jpg";
import samuelCormierIijima from "../assets/speaker-photos/samuel_cormier-iijima.jpg";
import sandiMetz from "../assets/speaker-photos/sandi-metz.png";
import shanWu from "../assets/speaker-photos/shan_wu.jpg";
import sophySun from "../assets/speaker-photos/sophy_sun.jpg";
import tjKlint from "../assets/speaker-photos/tj_klint.jpg";
import vickyDesjardins from "../assets/speaker-photos/vicky_desjardins.jpg";
import victorLi from "../assets/speaker-photos/victor_li.jpg";
import yehudaKatz from "../assets/speaker-photos/yehuda-katz.png";
import zachHolman from "../assets/speaker-photos/zach_holman.jpg";
import { pickByKey } from "./pick";

export type Speaker = {
  name: string;
  url?: string;
  image: StaticImageData | string;
  year?: number;
  title?: string;
  talkTitle?: string;
  bio?: string;
  sourceUrl?: string;
};

function speaker(name: string, url: string, image: StaticImageData, year?: number): Speaker {
  return { name, url, image, year };
}

// Past-conference speakers shown on the per-year archive pages. They carry no
// landing-page url/year; their photos are matched to historicSpeakersData by name.
function archived(name: string, image: StaticImageData): Speaker {
  return { name, image };
}

export const speakersData: Speaker[] = [
  speaker("Kent Beck", "https://kentbeck.com/", kentBeck, 2008),
  speaker("Richard Stallman", "https://stallman.org/", richardStallman, 2004),
  speaker("Joel Spolsky", "https://www.joelonsoftware.com/", joelSpolsky, 2006),
  speaker("Jeff Atwood", "https://blog.codinghorror.com/", jeffAtwood, 2007),
  speaker("Alexis Ohanian", "https://en.wikipedia.org/wiki/Alexis_Ohanian", alexisOhanian, 2011),
  speaker("David Heinemeier Hansson", "https://dhh.dk/", davidHeinemeierHansson, 2009),
  speaker("Douglas Crockford", "https://www.crockford.com/", douglasCrockford, 2010),
  speaker("Bruce Schneier", "https://www.schneier.com/", bruceSchneier, 2012),
  speaker("Bret Victor", "http://worrydream.com/", bretVictor, 2013),
  speaker(
    "Greg Kroah-Hartman",
    "https://en.wikipedia.org/wiki/Greg_Kroah-Hartman",
    gregKroahHartman,
    2014,
  ),
  speaker("Grady Booch", "https://en.wikipedia.org/wiki/Grady_Booch", gradyBooch, 2005),
  speaker("Jeff Ullman", "https://profiles.stanford.edu/jeffrey-ullman", jeffUllman, 2015),
  speaker("Michael Seibel", "https://www.michaelseibel.com/", michaelSeibel, 2018),
  speaker("Alex Karp", "https://www.alexkarp.net/", alexKarp, 2019),
  speaker("Joelle Pineau", "https://www.cs.mcgill.ca/~jpineau/", joellePineau, 2020),
  speaker("Yehuda Katz", "https://yehudakatz.com/", yehudaKatz, 2016),
  speaker("Aaron Patterson", "https://tenderlovemaking.com/", aaronPatterson, 2017),
  speaker("Julia Evans", "https://jvns.ca/", juliaEvans, 2021),
  speaker("Kathy Sierra", "https://en.wikipedia.org/wiki/Kathy_Sierra", kathySierra, 2008),
  speaker("Sandi Metz", "https://sandimetz.com/", sandiMetz, 2022),
  archived("Aaditya Chopra", aadityaChopra),
  archived("Alex Velazquez", alexVelazquez),
  archived("Alexa Stroll", alexaStroll),
  archived("Ananya Nair", ananyaNair),
  archived("Auguste Rame", augusteRame),
  archived("Cameron Alexander", cameronAlexander),
  archived("Caitlin Kelleher", caitlinKelleher),
  archived("Claudiu Scotnotis", claudiuScotnotis),
  archived("Devon Knight", devonKnight),
  archived("Dylan Steen", dylanSteen),
  archived("Edwin Sarmiento", edwinSarmiento),
  archived("Eleanor Rumsey", eleanorRumsey),
  archived("Fatima Taj", fatimaTaj),
  archived("Florent Giraud", florentGiraud),
  archived("Gail Carmichael", gailCarmichael),
  archived("Gazi Jarin", gaziJarin),
  archived("Georges-Antoine Assi", georgesAntoineAssi),
  archived("Greg Wilson", gregWilson),
  archived("Jocelyne Murphy", jocelyneMurphy),
  archived("Laurence Liang", laurenceLiang),
  archived("Leah Culver", leahCulver),
  archived("Lyn Chen", lynChen),
  archived("Michelle Zatlyn", michelleZatlyn),
  archived("Camille Fournier", camilleFournier),
  archived("Eva Galperin", evaGalperin),
  archived("Gayle Laakmann McDowell", gayleLaakmannMcdowell),
  archived("Laurie Hendren", laurieHendren),
  archived("Marcelo Ardiles", marceloArdiles),
  archived("Marsha Chechik", marshaChechik),
  archived("Matthew MacRae-Bovell", matthewMacraeBovell),
  archived("Maya Lekhi", mayaLekhi),
  archived("Mukund Mauji", mukundMauji),
  archived("Nivy Kani", nivyKani),
  archived("Prashanthi Ramesh", prashanthiRamesh),
  archived("Pirijan Keth", pirijanKeth),
  archived("Rabab Azeem", rababAzeem),
  archived("Rida Mehdi", ridaMehdi),
  archived("Rue Sriharsha", rueSriharsha),
  archived("Samuel Cormier-Iijima", samuelCormierIijima),
  archived("Shan Wu", shanWu),
  archived("Sophy Sun", sophySun),
  archived("TJ Klint", tjKlint),
  archived("Vicky Desjardins", vickyDesjardins),
  archived("Victor Li", victorLi),
  archived("Zach Holman", zachHolman),
];

// The curated set shown on the landing page before "See All Speakers".
export const featuredSpeakers: Speaker[] = pickByKey(speakersData, "name", [
  "Kathy Sierra",
  "Julia Evans",
  "Joelle Pineau",
  "Sandi Metz",
  "Kent Beck",
  "Richard Stallman",
  "Joel Spolsky",
  "Jeff Atwood",
  "Alexis Ohanian",
  "David Heinemeier Hansson",
  "Douglas Crockford",
  "Bruce Schneier",
  "Bret Victor",
]);
