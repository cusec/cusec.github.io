export type HistoricSummaryMetric = {
  key: string;
  value: number;
};

export type HistoricSummaryDataset = {
  id: "studyMix" | "degreeMix";
  hasFootnote?: boolean;
  metrics: HistoricSummaryMetric[];
};

export const historicStudyMix: HistoricSummaryDataset = {
  id: "studyMix",
  hasFootnote: true,
  metrics: [
    { key: "computerScience", value: 50 },
    { key: "softwareEngineering", value: 31.3 },
    { key: "computerEngineering", value: 9.4 },
    { key: "mathStatsData", value: 5 },
    { key: "other", value: 6.6 },
    { key: "electricalEngineering", value: 2.9 },
  ],
};

export const historicDegreeMix: HistoricSummaryDataset = {
  id: "degreeMix",
  metrics: [
    { key: "bachelors", value: 93.2 },
    { key: "masters", value: 2.3 },
    { key: "other", value: 4.5 },
  ],
};
