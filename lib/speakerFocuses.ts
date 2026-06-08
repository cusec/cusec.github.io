import type { Speaker } from "@/lib/speakersData";

export type SpeakerFocus = {
  id: string;
  years: number[];
};

export const speakerFocuses: SpeakerFocus[] = [
  { id: "legends", years: [] },
  { id: "2020s", years: [2020, 2021, 2022] },
  {
    id: "2010s",
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
  },
  { id: "2000s", years: [2004, 2005, 2006, 2007, 2008, 2009] },
];

export const legendNames = [
  "Kent Beck",
  "Richard Stallman",
  "Joel Spolsky",
  "Jeff Atwood",
  "Alexis Ohanian",
  "David Heinemeier Hansson",
  "Douglas Crockford",
  "Bruce Schneier",
  "Bret Victor",
];

export function getSpeakersForFocus(speakers: Speaker[], focus: SpeakerFocus) {
  if (focus.id === "legends") {
    const names = new Set(legendNames);
    return speakers.filter((speaker) => names.has(speaker.name));
  }

  const years = new Set(focus.years);
  return speakers.filter((speaker) => speaker.year && years.has(speaker.year));
}
