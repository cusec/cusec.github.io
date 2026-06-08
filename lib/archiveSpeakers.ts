import placeholder from "../assets/speaker-photos/placeholder-speaker.svg";
import { scrapedArchiveSpeakersData } from "./archiveSpeakerDetailsData";
import { historicSpeakersData } from "./historicSpeakersData";
import { type Speaker, speakersData } from "./speakersData";

const archiveSpeakerNameAliases = new Map([
  ["Antonio Gutiérrez", "Antonio Gutierrez"],
  ["Jocelyn Murphy", "Jocelyne Murphy"],
  ["Marcelo Ardilles", "Marcelo Ardiles"],
  ["Matthew MacRae-Bovell", "Matthew Macrae-Bovell"],
  ["Maya Lekhi", "Maya Lehki"],
  ["Prijan Keth", "Pirijan Keth"],
  // Reconcile historic-list name variants with their scraped-data counterparts
  // so each speaker renders once (with bio) instead of as an empty duplicate.
  ["Guy Barette", "Guy Barrette"],
  ["Gayle L. McDowell", "Gayle Laakmann McDowell"],
  ["Dr. Brian Cantwell Smith", "Brian Cantwell Smith"],
  ["Atefeh Farzindar Ph. D", "Atefeh Farzindar"],
  ["Dr. Marcelo M. Wanderley", "Marcelo M. Wanderley"],
  ["Dr. Paul Cisek", "Paul Cisek"],
  ["Dr. Sabine Bergler", "Sabine Bergler"],
  ["Prof. Sharief Oteafy", "Sharief Oteafy"],
]);

const archiveSpeakerImageByName = new Map([
  ["fatimataj", "/archive-speakers/2026/fatima-taj.jpg"],
  ["matthewmacraebovell", "/archive-speakers/2025/matthew-macrae-bovell.png"],
  ["ruesriharsha", "/archive-speakers/2025/rue-sriharsha.png"],
  ["victorli", "/archive-speakers/2025/victor-li.png"],
  ["zachholman", "/archive-speakers/2026/zach-holman.jpg"],
]);

const curatedByName = new Map(speakersData.map((s) => [s.name, s]));
const curatedByCanonicalName = new Map(
  speakersData.map((speaker) => [canonicalSpeakerName(speaker.name), speaker]),
);

export const curatedSpeakerNames = new Set(speakersData.map((s) => s.name));

function canonicalSpeakerName(name: string) {
  const aliasedName = archiveSpeakerNameAliases.get(name) ?? name;
  return aliasedName
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function isPlaceholderScrapedSpeaker(speaker: Speaker) {
  return /^Speaker \d+$/i.test(speaker.name);
}

function withCanonicalImage(speaker: Speaker): Speaker {
  const curatedSpeaker = curatedByCanonicalName.get(canonicalSpeakerName(speaker.name));

  return {
    ...speaker,
    image:
      curatedSpeaker?.image ??
      archiveSpeakerImageByName.get(canonicalSpeakerName(speaker.name)) ??
      speaker.image,
  };
}

export function getArchiveSpeakers(year: number): Speaker[] {
  const scrapedSpeakers = (scrapedArchiveSpeakersData[year] ?? []).filter(
    (speaker) => !isPlaceholderScrapedSpeaker(speaker),
  );
  const scrapedByName = new Map(
    scrapedSpeakers.map((speaker) => [canonicalSpeakerName(speaker.name), speaker]),
  );
  const historicSpeakers = (historicSpeakersData[year] ?? []).map(
    (name) =>
      scrapedByName.get(canonicalSpeakerName(name)) ??
      curatedByCanonicalName.get(canonicalSpeakerName(name)) ??
      curatedByName.get(name) ??
      { name, image: placeholder },
  );
  const historicNames = new Set(
    historicSpeakers.map((speaker) => canonicalSpeakerName(speaker.name)),
  );
  const extraScrapedSpeakers = scrapedSpeakers.filter(
    (speaker) => !historicNames.has(canonicalSpeakerName(speaker.name)),
  );

  return [...historicSpeakers, ...extraScrapedSpeakers].map(withCanonicalImage);
}
