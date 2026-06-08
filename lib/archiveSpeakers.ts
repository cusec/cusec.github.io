import placeholder from "../assets/speaker-photos/placeholder-speaker.svg";
import { historicSpeakersData } from "./historicSpeakersData";
import { speakersData, type Speaker } from "./speakersData";

const curatedByName = new Map(speakersData.map((s) => [s.name, s]));

export const curatedSpeakerNames = new Set(speakersData.map((s) => s.name));

export function getArchiveSpeakers(year: number): Speaker[] {
  return (historicSpeakersData[year] ?? []).map(
    (name) => curatedByName.get(name) ?? { name, image: placeholder },
  );
}
