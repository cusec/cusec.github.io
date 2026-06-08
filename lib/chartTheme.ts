export type LabeledMetric = {
  label: string;
  value: number;
};

export const palette = [
  "#222222",
  "#6f7f65",
  "#b87946",
  "#3b6f7a",
  "#9b6f82",
  "#a8a29a",
  "#d6c16e",
];

export function formatPercent(value: number) {
  return `${Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)}%`;
}
