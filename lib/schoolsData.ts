import type { StaticImageData } from "next/image";
import algonquin from "../assets/school-logos/algonquin 1.png";
import athabasca from "../assets/school-logos/athabasca 1.png";
import bishops from "../assets/school-logos/bishops 1.png";
import brandon from "../assets/school-logos/brandon 1.png";
import calgary from "../assets/school-logos/calgary 1.png";
import carleton from "../assets/school-logos/carleton 1.png";
import centennial from "../assets/school-logos/centennial 1.png";
import concordia from "../assets/school-logos/concordia 1.png";
import dalhousie from "../assets/school-logos/dalhousie 1.png";
import dawson from "../assets/school-logos/dwason 1.png";
import ets from "../assets/school-logos/ets 1.png";
import fanshawe from "../assets/school-logos/fanshawe 1.png";
import geraldgodin from "../assets/school-logos/geraldgodin 1.png";
import jac from "../assets/school-logos/jac 1.png";
import laval from "../assets/school-logos/laval 1.png";
import marianopolis from "../assets/school-logos/mario 1.png";
import mcgill from "../assets/school-logos/mcgill 1.png";
import mcmaster from "../assets/school-logos/mcmaster 1.png";
import moncton from "../assets/school-logos/moncton 1.png";
import otu from "../assets/school-logos/otu 1.png";
import poly from "../assets/school-logos/poly 1.png";
import queens from "../assets/school-logos/queens 1.png";
import rmc from "../assets/school-logos/rmc 1.png";
import rrc from "../assets/school-logos/rrc 1.png";
import seneca from "../assets/school-logos/Seneca 1.png";
import sait from "../assets/school-logos/sait 1.png";
import sfu from "../assets/school-logos/sfu 1.png";
import sherbrooke from "../assets/school-logos/sherbrooke 1.png";
import sheridan from "../assets/school-logos/sheridan 1.png";
import standrews from "../assets/school-logos/standrews 1.png";
import teluq from "../assets/school-logos/teluq 1.png";
import thompson from "../assets/school-logos/thompson 1.png";
import tmu from "../assets/school-logos/tmu 1.png";
import ualberta from "../assets/school-logos/ualberta 1.png";
import ubc from "../assets/school-logos/ubc 1.png";
import ucw from "../assets/school-logos/ucw 1.png";
import udem from "../assets/school-logos/udem 1.png";
import unb from "../assets/school-logos/unb 1.png";
import union from "../assets/school-logos/union 1.png";
import uofg from "../assets/school-logos/uofg 1.png";
import uofi from "../assets/school-logos/uofi 1.png";
import uofm from "../assets/school-logos/uofm 1.png";
import uofr from "../assets/school-logos/uofr 1.png";
import uoft from "../assets/school-logos/uoft 1.png";
import uofw from "../assets/school-logos/uofw 1.png";
import uottawa from "../assets/school-logos/uottawa 1.png";
import uqam from "../assets/school-logos/uqam 1.png";
import uvic from "../assets/school-logos/uvic 1.png";
import vanier from "../assets/school-logos/vanier 1.png";
import waterloo from "../assets/school-logos/waterloo 1.png";
import western from "../assets/school-logos/western 1.png";
import wilfridlaurier from "../assets/school-logos/wilfridlaurier 1.png";
import windsor from "../assets/school-logos/windsor 1.png";
import york from "../assets/school-logos/york 1.png";
import { pickByKey } from "./pick";

export type School = {
  name: string;
  url: string;
  logo?: StaticImageData;
  city: string;
  lat: number;
  lon: number;
};

function school(
  name: string,
  logo: StaticImageData,
  url: string,
  city: string,
  lat: number,
  lon: number,
): School {
  return { name, url, logo, city, lat, lon };
}

export type Region = {
  name: string;
  schools: School[];
};

export const regionsData: Region[] = [
  {
    name: "Ontario",
    schools: [
      school(
        "University of Waterloo",
        waterloo,
        "https://uwaterloo.ca",
        "Waterloo, ON",
        43.4723,
        -80.5449,
      ),
      school(
        "University of Toronto",
        uoft,
        "https://www.utoronto.ca",
        "Toronto, ON",
        43.6629,
        -79.3957,
      ),
      school(
        "McMaster University",
        mcmaster,
        "https://www.mcmaster.ca",
        "Hamilton, ON",
        43.2609,
        -79.9192,
      ),
      school(
        "Queen's University",
        queens,
        "https://www.queensu.ca",
        "Kingston, ON",
        44.2253,
        -76.4951,
      ),
      school("Western University", western, "https://www.uwo.ca", "London, ON", 43.0096, -81.2737),
      school(
        "University of Ottawa",
        uottawa,
        "https://www.uottawa.ca",
        "Ottawa, ON",
        45.4231,
        -75.6831,
      ),
      school(
        "Carleton University",
        carleton,
        "https://carleton.ca",
        "Ottawa, ON",
        45.3868,
        -75.6961,
      ),
      school(
        "Toronto Metropolitan University",
        tmu,
        "https://www.torontomu.ca",
        "Toronto, ON",
        43.6577,
        -79.3788,
      ),
      school("York University", york, "https://www.yorku.ca", "Toronto, ON", 43.7735, -79.5019),
      school(
        "University of Guelph",
        uofg,
        "https://www.uoguelph.ca",
        "Guelph, ON",
        43.5327,
        -80.2262,
      ),
      school(
        "Wilfrid Laurier University",
        wilfridlaurier,
        "https://www.wlu.ca",
        "Waterloo, ON",
        43.4737,
        -80.5275,
      ),
      school(
        "University of Windsor",
        windsor,
        "https://www.uwindsor.ca",
        "Windsor, ON",
        42.3043,
        -83.0664,
      ),
      school(
        "Ontario Tech University",
        otu,
        "https://ontariotechu.ca",
        "Oshawa, ON",
        43.9457,
        -78.8957,
      ),
      school(
        "Algonquin College",
        algonquin,
        "https://www.algonquincollege.com",
        "Ottawa, ON",
        45.3489,
        -75.7575,
      ),
      school(
        "Centennial College",
        centennial,
        "https://www.centennialcollege.ca",
        "Toronto, ON",
        43.7847,
        -79.23,
      ),
      school(
        "Fanshawe College",
        fanshawe,
        "https://www.fanshawec.ca",
        "London, ON",
        43.0107,
        -81.1995,
      ),
      school(
        "Royal Military College",
        rmc,
        "https://www.rmc-cmr.ca",
        "Kingston, ON",
        44.2333,
        -76.4661,
      ),
      school(
        "Seneca Polytechnic",
        seneca,
        "https://www.senecapolytechnic.ca",
        "Toronto, ON",
        43.7972,
        -79.3492,
      ),
      school(
        "Sheridan College",
        sheridan,
        "https://www.sheridancollege.ca",
        "Oakville, ON",
        43.4675,
        -79.6877,
      ),
      school(
        "St. Andrew's College",
        standrews,
        "https://www.sac.on.ca",
        "Aurora, ON",
        44.0079,
        -79.45,
      ),
    ],
  },
  {
    name: "Quebec",
    schools: [
      school(
        "McGill University",
        mcgill,
        "https://www.mcgill.ca",
        "Montreal, QC",
        45.5048,
        -73.5772,
      ),
      school(
        "Concordia University",
        concordia,
        "https://www.concordia.ca",
        "Montreal, QC",
        45.497,
        -73.579,
      ),
      school(
        "Université de Montréal",
        udem,
        "https://www.umontreal.ca",
        "Montreal, QC",
        45.5048,
        -73.6177,
      ),
      school(
        "Polytechnique Montréal",
        poly,
        "https://www.polymtl.ca",
        "Montreal, QC",
        45.5044,
        -73.6133,
      ),
      school(
        "École de technologie supérieure (ÉTS)",
        ets,
        "https://www.etsmtl.ca",
        "Montreal, QC",
        45.4944,
        -73.5618,
      ),
      school(
        "Université du Québec à Montréal",
        uqam,
        "https://uqam.ca",
        "Montreal, QC",
        45.5117,
        -73.5616,
      ),
      school(
        "Université Laval",
        laval,
        "https://www.ulaval.ca",
        "Quebec City, QC",
        46.7825,
        -71.275,
      ),
      school(
        "Université de Sherbrooke",
        sherbrooke,
        "https://www.usherbrooke.ca",
        "Sherbrooke, QC",
        45.3786,
        -71.9301,
      ),
      school("TÉLUQ", teluq, "https://teluq.ca", "Quebec City, QC", 46.8139, -71.208),
      school(
        "Bishop's University",
        bishops,
        "https://www.ubishops.ca",
        "Sherbrooke, QC",
        45.3589,
        -71.8617,
      ),
      school(
        "Dawson College",
        dawson,
        "https://www.dawsoncollege.qc.ca",
        "Montreal, QC",
        45.4894,
        -73.5878,
      ),
      school(
        "John Abbott College",
        jac,
        "https://www.johnabbott.qc.ca",
        "Sainte-Anne-de-Bellevue, QC",
        45.4034,
        -73.9485,
      ),
      school(
        "Vanier College",
        vanier,
        "https://www.vaniercollege.qc.ca",
        "Montreal, QC",
        45.5189,
        -73.6629,
      ),
      school(
        "Marianopolis College",
        marianopolis,
        "https://www.marianopolis.edu",
        "Westmount, QC",
        45.4885,
        -73.5934,
      ),
      school(
        "Collège Gérald-Godin",
        geraldgodin,
        "https://www.cgodin.qc.ca",
        "Montreal, QC",
        45.4827,
        -73.874,
      ),
    ],
  },
  {
    name: "British Columbia",
    schools: [
      school(
        "University of British Columbia",
        ubc,
        "https://www.ubc.ca",
        "Vancouver, BC",
        49.2606,
        -123.246,
      ),
      school(
        "Simon Fraser University",
        sfu,
        "https://www.sfu.ca",
        "Burnaby, BC",
        49.2767,
        -122.918,
      ),
      school(
        "University of Victoria",
        uvic,
        "https://www.uvic.ca",
        "Victoria, BC",
        48.4634,
        -123.3117,
      ),
      school(
        "Thompson Rivers University",
        thompson,
        "https://www.tru.ca",
        "Kamloops, BC",
        50.6716,
        -120.3604,
      ),
    ],
  },
  {
    name: "Prairies",
    schools: [
      school(
        "University of Alberta",
        ualberta,
        "https://www.ualberta.ca",
        "Edmonton, AB",
        53.5232,
        -113.5263,
      ),
      school(
        "University of Calgary",
        calgary,
        "https://www.ucalgary.ca",
        "Calgary, AB",
        51.0786,
        -114.1342,
      ),
      school(
        "University of Manitoba",
        uofm,
        "https://umanitoba.ca",
        "Winnipeg, MB",
        49.8094,
        -97.13,
      ),
      school(
        "University of Winnipeg",
        uofw,
        "https://www.uwinnipeg.ca",
        "Winnipeg, MB",
        49.8919,
        -97.153,
      ),
      school(
        "University of Regina",
        uofr,
        "https://www.uregina.ca",
        "Regina, SK",
        50.4154,
        -104.5872,
      ),
      school(
        "Athabasca University",
        athabasca,
        "https://www.athabascau.ca",
        "Athabasca, AB",
        54.7236,
        -113.2862,
      ),
      school(
        "Brandon University",
        brandon,
        "https://www.brandonu.ca",
        "Brandon, MB",
        49.847,
        -99.9533,
      ),
      school(
        "Southern Alberta Institute of Technology",
        sait,
        "https://www.sait.ca",
        "Calgary, AB",
        51.066,
        -114.0894,
      ),
      school(
        "Red River College Polytechnic",
        rrc,
        "https://www.rrc.ca",
        "Winnipeg, MB",
        49.9081,
        -97.0998,
      ),
    ],
  },
  {
    name: "Atlantic",
    schools: [
      school(
        "Dalhousie University",
        dalhousie,
        "https://www.dal.ca",
        "Halifax, NS",
        44.6366,
        -63.591,
      ),
      school(
        "University of New Brunswick",
        unb,
        "https://www.unb.ca",
        "Fredericton, NB",
        45.9476,
        -66.6411,
      ),
      school(
        "Université de Moncton",
        moncton,
        "https://www.umoncton.ca",
        "Moncton, NB",
        46.1129,
        -64.7886,
      ),
    ],
  },
  {
    name: "Other",
    schools: [
      school(
        "University of Illinois at Urbana-Champaign",
        uofi,
        "https://illinois.edu",
        "Urbana, IL, USA",
        40.102,
        -88.2272,
      ),
      school(
        "Université Canada West",
        ucw,
        "https://www.ucanwest.ca",
        "Vancouver, BC",
        49.2828,
        -123.1207,
      ),
      school(
        "Union College",
        union,
        "https://www.union.edu",
        "Schenectady, NY, USA",
        42.8166,
        -73.9279,
      ),
    ],
  },
];

function region(name: string): Region {
  return pickByKey(regionsData, "name", [name])[0];
}

function schoolsOf(regionName: string, schoolNames: string[]): School[] {
  return pickByKey(region(regionName).schools, "name", schoolNames);
}

// The curated regions and schools shown on the landing page teaser.
export const featuredRegions: Region[] = [
  {
    name: "Ontario",
    schools: schoolsOf("Ontario", [
      "University of Waterloo",
      "University of Toronto",
      "McMaster University",
      "Queen's University",
    ]),
  },
  {
    name: "Quebec",
    schools: schoolsOf("Quebec", [
      "McGill University",
      "Concordia University",
      "Université de Montréal",
      "Polytechnique Montréal",
    ]),
  },
  {
    name: "British Columbia",
    schools: schoolsOf("British Columbia", [
      "University of British Columbia",
      "Simon Fraser University",
      "University of Victoria",
      "Thompson Rivers University",
    ]),
  },
];

// Primary brand color per school (approximate hex of the main institutional color).
// Used for the colored dots on the Canada map. Schools missing here fall back
// to ink so the map still renders.
const SCHOOL_COLORS: Record<string, string> = {
  // Ontario
  "University of Waterloo": "#FED34C",
  "University of Toronto": "#002A5C",
  "McMaster University": "#7A003C",
  "Queen's University": "#B92335",
  "Western University": "#4F2683",
  "University of Ottawa": "#8C2233",
  "Carleton University": "#C8102E",
  "Toronto Metropolitan University": "#FFCB05",
  "York University": "#E31837",
  "University of Guelph": "#C20430",
  "Wilfrid Laurier University": "#50298C",
  "University of Windsor": "#0033A0",
  "Ontario Tech University": "#003A70",
  "Algonquin College": "#00853E",
  "Centennial College": "#00803E",
  "Fanshawe College": "#C8102E",
  "Royal Military College": "#C8102E",
  "Seneca Polytechnic": "#BB133E",
  "Sheridan College": "#00337F",
  "St. Andrew's College": "#002F5F",
  // Quebec
  "McGill University": "#ED1B2F",
  "Concordia University": "#912338",
  "Université de Montréal": "#0033A0",
  "Polytechnique Montréal": "#003366",
  "École de technologie supérieure (ÉTS)": "#E4002B",
  "Université du Québec à Montréal": "#FFD200",
  "Université Laval": "#E2231A",
  "Université de Sherbrooke": "#00773D",
  TÉLUQ: "#007A33",
  "Bishop's University": "#6E1F2A",
  "Dawson College": "#00529B",
  "John Abbott College": "#003E7E",
  "Vanier College": "#003B5C",
  "Marianopolis College": "#003366",
  "Collège Gérald-Godin": "#C8102E",
  // British Columbia
  "University of British Columbia": "#002145",
  "Simon Fraser University": "#A6192E",
  "University of Victoria": "#005493",
  "Thompson Rivers University": "#003E7E",
  // Prairies
  "University of Alberta": "#007C41",
  "University of Calgary": "#D6001C",
  "University of Manitoba": "#582C83",
  "University of Winnipeg": "#582C83",
  "University of Regina": "#006F51",
  "Athabasca University": "#007A53",
  "Brandon University": "#5F2167",
  "Southern Alberta Institute of Technology": "#C8102E",
  "Red River College Polytechnic": "#003366",
  // Atlantic
  "Dalhousie University": "#FFCD00",
  "University of New Brunswick": "#ED1C24",
  "Université de Moncton": "#0033A0",
  // Other
  "University of Illinois at Urbana-Champaign": "#E84A27",
  "Université Canada West": "#003C71",
  "Union College": "#722F37",
};

export function schoolColor(name: string): string {
  return SCHOOL_COLORS[name] ?? "#222222";
}

export function schoolSlug(name: string): string {
  return `school-${name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}

export function allSchoolsWithRegion(): Array<School & { region: string }> {
  return regionsData.flatMap((r) => r.schools.map((s) => ({ ...s, region: r.name })));
}
