import type { StaticImageData } from "next/image";
import logo2003 from "../assets/cusec-logos/2003.png";
import logo2004 from "../assets/cusec-logos/2004.png";
import logo2005 from "../assets/cusec-logos/2005.png";
import logo2006 from "../assets/cusec-logos/2006.png";
import logo2007 from "../assets/cusec-logos/2007.png";
import logo2008 from "../assets/cusec-logos/2008.png";
import logo2009 from "../assets/cusec-logos/2009.png";
import logo2010 from "../assets/cusec-logos/2010.png";
import logo2011 from "../assets/cusec-logos/2011.png";
import logo2012 from "../assets/cusec-logos/2012.png";
import logo2013 from "../assets/cusec-logos/2013.png";
import logo2014 from "../assets/cusec-logos/2014.png";
import logo2015 from "../assets/cusec-logos/2015.png";
import logo2016 from "../assets/cusec-logos/2016.png";
import logo2017 from "../assets/cusec-logos/2017.png";
import logo2018 from "../assets/cusec-logos/2018.png";
import logo2019 from "../assets/cusec-logos/2019.png";
import logo2020 from "../assets/cusec-logos/2020.png";
import logo2021 from "../assets/cusec-logos/2021.png";
import logo2022 from "../assets/cusec-logos/2022.png";
import logo2023 from "../assets/cusec-logos/2023.png";
import logo2024 from "../assets/cusec-logos/2024.png";
import logo2025 from "../assets/cusec-logos/2025.png";
import logo2026 from "../assets/cusec-logos/2026.png";
import { pickByKey } from "./pick";

export type ArchiveYear = {
  year: number;
  logo: StaticImageData;
  title: string;
  url?: string;
  hasDetailedInfo?: boolean;
  logoNeedsDarkBg?: boolean;
};

export const archiveData: ArchiveYear[] = [
  { year: 2026, logo: logo2026, title: "CUSEC 2026", url: "https://2026.cusec.net" },
  { year: 2025, logo: logo2025, title: "CUSEC 2025", url: "https://2025.cusec.net" },
  { year: 2024, logo: logo2024, title: "CUSEC 2024", url: "https://2024.cusec.net" },
  { year: 2023, logo: logo2023, title: "CUSEC 2023", url: "https://2023.cusec.net" },
  { year: 2022, logo: logo2022, title: "CUSEC 2022", url: "https://2022.cusec.net" },
  { year: 2021, logo: logo2021, title: "CUSEC 2021", url: "https://2021.cusec.net" },
  {
    year: 2020,
    logo: logo2020,
    title: "CUSEC 2020",
    url: "https://2020.cusec.net",
    logoNeedsDarkBg: true,
  },
  { year: 2019, logo: logo2019, title: "CUSEC 2019", url: "https://2019.cusec.net" },
  { year: 2018, logo: logo2018, title: "CUSEC 2018", url: "https://2018.cusec.net" },
  { year: 2017, logo: logo2017, title: "CUSEC 2017", url: "https://2017.cusec.net" },
  {
    year: 2016,
    logo: logo2016,
    title: "CUSEC 2016",
    url: "https://2016.cusec.net",
    logoNeedsDarkBg: true,
  },
  { year: 2015, logo: logo2015, title: "CUSEC 2015", url: "https://2015.cusec.net" },
  { year: 2014, logo: logo2014, title: "CUSEC 2014", url: "https://2014.cusec.net" },
  { year: 2013, logo: logo2013, title: "CUSEC 2013", url: "https://2013.cusec.net" },
  { year: 2012, logo: logo2012, title: "CUSEC 2012", url: "https://2012.cusec.net" },
  { year: 2011, logo: logo2011, title: "CUSEC 2011", url: "https://2011.cusec.net" },
  { year: 2010, logo: logo2010, title: "CUSEC 2010", hasDetailedInfo: true },
  { year: 2009, logo: logo2009, title: "CUSEC 2009", hasDetailedInfo: true },
  { year: 2008, logo: logo2008, title: "CUSEC 2008", hasDetailedInfo: true },
  { year: 2007, logo: logo2007, title: "CUSEC 2007", hasDetailedInfo: true },
  { year: 2006, logo: logo2006, title: "CUSEC 2006", hasDetailedInfo: true },
  { year: 2005, logo: logo2005, title: "CUSEC 2005", hasDetailedInfo: true },
  { year: 2004, logo: logo2004, title: "CUSEC 2004", hasDetailedInfo: true },
  { year: 2003, logo: logo2003, title: "CUSEC 2003", hasDetailedInfo: true },
];

// The curated years shown on the landing page before "See Full Archive".
export const featuredArchive: ArchiveYear[] = pickByKey(
  archiveData,
  "year",
  [2026, 2025, 2024, 2023, 2022, 2021],
);
