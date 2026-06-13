import placeholder from "../assets/speaker-photos/placeholder-speaker.svg";
import { scrapedArchiveSpeakersData } from "./archiveSpeakerDetailsData";
import { assertArchiveSpeakerIntegrity, normalizeSpeakerName } from "./contentChecks";
import { historicSpeakersData } from "./historicSpeakersData";
import { type Speaker, speakersData } from "./speakersData";

const archiveSpeakerImageByName = new Map([
  ["fatimataj", "/archive-speakers/2026/fatima-taj.jpg"],
  ["matthewmacraebovell", "/archive-speakers/2025/matthew-macrae-bovell.png"],
  ["ruesriharsha", "/archive-speakers/2025/rue-sriharsha.png"],
  ["victorli", "/archive-speakers/2025/victor-li.png"],
  ["zachholman", "/archive-speakers/2026/zach-holman.jpg"],
]);

assertArchiveSpeakerIntegrity({
  scrapedArchiveSpeakersData,
  historicSpeakersData,
  curatedSpeakerNames: speakersData.map((speaker) => speaker.name),
});

const curatedByName = new Map(speakersData.map((s) => [s.name, s]));
const curatedByCanonicalName = new Map(
  speakersData.map((speaker) => [canonicalSpeakerName(speaker.name), speaker]),
);

export const curatedSpeakerNames = new Set(speakersData.map((s) => s.name));

function canonicalSpeakerName(name: string) {
  return normalizeSpeakerName(name);
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
      curatedByName.get(name) ?? { name, image: placeholder },
  );
  const historicNames = new Set(
    historicSpeakers.map((speaker) => canonicalSpeakerName(speaker.name)),
  );
  const extraScrapedSpeakers = scrapedSpeakers.filter(
    (speaker) => !historicNames.has(canonicalSpeakerName(speaker.name)),
  );

  return [...historicSpeakers, ...extraScrapedSpeakers].map(withCanonicalImage);
}
