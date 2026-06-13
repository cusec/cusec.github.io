type SpeakerLike = {
  name: string;
};

export function normalizeSpeakerName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

type ArchiveSpeakerIntegrityInput = {
  scrapedArchiveSpeakersData: Record<number, SpeakerLike[]>;
  historicSpeakersData: Record<number, string[]>;
  curatedSpeakerNames: Iterable<string>;
};

export function assertArchiveSpeakerIntegrity({
  scrapedArchiveSpeakersData,
  historicSpeakersData,
  curatedSpeakerNames,
}: ArchiveSpeakerIntegrityInput) {
  const violations: string[] = [];

  for (const [year, speakers] of Object.entries(scrapedArchiveSpeakersData)) {
    const seenNames = new Map<string, string>();

    for (const speaker of speakers) {
      collectDuplicateNameViolation(
        violations,
        seenNames,
        normalizeSpeakerName(speaker.name),
        speaker.name,
        `archiveSpeakerDetailsData ${year}`,
      );
    }
  }

  for (const [year, names] of Object.entries(historicSpeakersData)) {
    const seenNames = new Map<string, string>();

    for (const name of names) {
      collectDuplicateNameViolation(
        violations,
        seenNames,
        normalizeSpeakerName(name),
        name,
        `historicSpeakersData ${year}`,
      );
    }
  }

  const seenCuratedNames = new Map<string, string>();
  for (const name of curatedSpeakerNames) {
    collectDuplicateNameViolation(
      violations,
      seenCuratedNames,
      normalizeSpeakerName(name),
      name,
      "speakersData",
    );
  }

  if (violations.length > 0) {
    throw new Error(`Archive speaker integrity errors:\n${violations.join("\n")}`);
  }
}

function collectDuplicateNameViolation(
  violations: string[],
  seenNames: Map<string, string>,
  normalizedName: string,
  name: string,
  source: string,
) {
  if (seenNames.has(normalizedName)) {
    violations.push(`${source}: duplicate speaker "${name}"`);
    return;
  }

  seenNames.set(normalizedName, name);
}

export function warnUnmatchedArchiveSponsors(
  archiveSponsorNames: Record<number, string[]>,
  knownNames: Set<string>,
) {
  const unmatchedNames = new Set<string>();

  for (const sponsorNames of Object.values(archiveSponsorNames)) {
    for (const sponsorName of sponsorNames) {
      if (!knownNames.has(sponsorName)) {
        unmatchedNames.add(sponsorName);
      }
    }
  }

  return [...unmatchedNames].sort((a, b) => a.localeCompare(b));
}
