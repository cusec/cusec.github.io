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
};

function school(name: string, logo: StaticImageData, url: string): School {
  return { name, url, logo };
}

export type Region = {
  name: string;
  schools: School[];
};

export const regionsData: Region[] = [
  {
    name: "Ontario",
    schools: [
      school("University of Waterloo", waterloo, "https://uwaterloo.ca"),
      school("University of Toronto", uoft, "https://www.utoronto.ca"),
      school("McMaster University", mcmaster, "https://www.mcmaster.ca"),
      school("Queen's University", queens, "https://www.queensu.ca"),
      school("Western University", western, "https://www.uwo.ca"),
      school("University of Ottawa", uottawa, "https://www.uottawa.ca"),
      school("Carleton University", carleton, "https://carleton.ca"),
      school("Toronto Metropolitan University", tmu, "https://www.torontomu.ca"),
      school("York University", york, "https://www.yorku.ca"),
      school("University of Guelph", uofg, "https://www.uoguelph.ca"),
      school("Wilfrid Laurier University", wilfridlaurier, "https://www.wlu.ca"),
      school("University of Windsor", windsor, "https://www.uwindsor.ca"),
      school("Ontario Tech University", otu, "https://ontariotechu.ca"),
      school("Algonquin College", algonquin, "https://www.algonquincollege.com"),
      school("Centennial College", centennial, "https://www.centennialcollege.ca"),
      school("Fanshawe College", fanshawe, "https://www.fanshawec.ca"),
      school("Royal Military College", rmc, "https://www.rmc-cmr.ca"),
      school("Seneca Polytechnic", seneca, "https://www.senecapolytechnic.ca"),
      school("Sheridan College", sheridan, "https://www.sheridancollege.ca"),
      school("St. Andrew's College", standrews, "https://www.sac.on.ca"),
    ],
  },
  {
    name: "Quebec",
    schools: [
      school("McGill University", mcgill, "https://www.mcgill.ca"),
      school("Concordia University", concordia, "https://www.concordia.ca"),
      school("Université de Montréal", udem, "https://www.umontreal.ca"),
      school("Polytechnique Montréal", poly, "https://www.polymtl.ca"),
      school("École de technologie supérieure (ÉTS)", ets, "https://www.etsmtl.ca"),
      school("Université du Québec à Montréal", uqam, "https://uqam.ca"),
      school("Université Laval", laval, "https://www.ulaval.ca"),
      school("Université de Sherbrooke", sherbrooke, "https://www.usherbrooke.ca"),
      school("TÉLUQ", teluq, "https://teluq.ca"),
      school("Bishop's University", bishops, "https://www.ubishops.ca"),
      school("Dawson College", dawson, "https://www.dawsoncollege.qc.ca"),
      school("John Abbott College", jac, "https://www.johnabbott.qc.ca"),
      school("Vanier College", vanier, "https://www.vaniercollege.qc.ca"),
      school("Marianopolis College", marianopolis, "https://www.marianopolis.edu"),
      school("Collège Gérald-Godin", geraldgodin, "https://www.cgodin.qc.ca"),
    ],
  },
  {
    name: "British Columbia",
    schools: [
      school("University of British Columbia", ubc, "https://www.ubc.ca"),
      school("Simon Fraser University", sfu, "https://www.sfu.ca"),
      school("University of Victoria", uvic, "https://www.uvic.ca"),
      school("Thompson Rivers University", thompson, "https://www.tru.ca"),
    ],
  },
  {
    name: "Prairies",
    schools: [
      school("University of Alberta", ualberta, "https://www.ualberta.ca"),
      school("University of Calgary", calgary, "https://www.ucalgary.ca"),
      school("University of Manitoba", uofm, "https://umanitoba.ca"),
      school("University of Winnipeg", uofw, "https://www.uwinnipeg.ca"),
      school("University of Regina", uofr, "https://www.uregina.ca"),
      school("Athabasca University", athabasca, "https://www.athabascau.ca"),
      school("Brandon University", brandon, "https://www.brandonu.ca"),
      school("Southern Alberta Institute of Technology", sait, "https://www.sait.ca"),
      school("Red River College Polytechnic", rrc, "https://www.rrc.ca"),
    ],
  },
  {
    name: "Atlantic",
    schools: [
      school("Dalhousie University", dalhousie, "https://www.dal.ca"),
      school("University of New Brunswick", unb, "https://www.unb.ca"),
      school("Université de Moncton", moncton, "https://www.umoncton.ca"),
    ],
  },
  {
    name: "Other",
    schools: [
      school("University of Illinois at Urbana-Champaign", uofi, "https://illinois.edu"),
      school("Université Canada West", ucw, "https://www.ucanwest.ca"),
      school("Union College", union, "https://www.union.edu"),
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
