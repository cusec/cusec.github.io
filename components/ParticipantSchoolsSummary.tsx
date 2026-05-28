"use client";

import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar, Pie } from "@visx/shape";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import {
  historicDegreeMix,
  historicStudyMix,
} from "@/lib/participantSchoolsSummaryData";

const palette = ["#222222", "#6f7f65", "#b87946", "#3b6f7a", "#9b6f82", "#a8a29a", "#d6c16e"];

type LabeledMetric = {
  label: string;
  value: number;
};

function formatPercent(value: number) {
  return `${Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)}%`;
}

function ChartShell({
  id,
  title,
  footnote,
  children,
  className = "",
}: {
  id: string;
  title: string;
  footnote?: string;
  children: ReactNode;
  className?: string;
}) {
  const titleId = `${id}-title`;

  return (
    <section className={`cusec-summary-panel ${className}`} aria-labelledby={titleId}>
      <div className="cusec-summary-panel__copy">
        <h3 id={titleId}>{title}</h3>
      </div>
      {children}
      {footnote ? <p className="cusec-summary-panel__footnote">{footnote}</p> : null}
    </section>
  );
}

function HorizontalBars({
  metrics,
  ariaLabel,
}: {
  metrics: LabeledMetric[];
  ariaLabel: string;
}) {
  const width = 640;
  const rowHeight = 34;
  const height = metrics.length * rowHeight;
  const barX = 230;
  const valueX = 620;
  const barWidth = valueX - barX - 52;
  const xScale = scaleLinear<number>({
    domain: [0, 100],
    range: [0, barWidth],
    nice: false,
  });
  const yScale = scaleBand<string>({
    domain: metrics.map((metric) => metric.label),
    range: [0, height],
    padding: 0.34,
  });

  return (
    <div className="cusec-summary-chart cusec-summary-chart--bars">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={ariaLabel}>
        <title>{ariaLabel}</title>
        {metrics.map((metric, index) => {
          const y = yScale(metric.label) ?? 0;
          const barHeight = yScale.bandwidth();
          return (
            <Group key={metric.label} top={y}>
              <text className="cusec-summary-chart__label" x={0} y={barHeight / 2} dy="0.36em">
                {metric.label}
              </text>
              <Bar
                x={barX}
                y={0}
                width={xScale(metric.value)}
                height={barHeight}
                fill={palette[index % palette.length]}
                rx={0.6}
              />
              <text
                className="cusec-summary-chart__value"
                x={valueX}
                y={barHeight / 2}
                dy="0.36em"
                textAnchor="end"
              >
                {formatPercent(metric.value)}
              </text>
            </Group>
          );
        })}
      </svg>
    </div>
  );
}

function PieChart({
  metrics,
  label,
  size = 188,
}: {
  metrics: LabeledMetric[];
  label: string;
  size?: number;
}) {
  const radius = size / 2;

  return (
    <div className="cusec-summary-pie">
      <svg
        className="cusec-summary-pie__figure"
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={label}
      >
        <title>{label}</title>
        <Group top={radius} left={radius}>
          <Pie
            data={metrics}
            pieValue={(metric) => metric.value}
            outerRadius={radius}
            innerRadius={0}
            padAngle={0.012}
          >
            {(pie) =>
              pie.arcs.map((arc) => (
                <path
                  key={arc.data.label}
                  d={pie.path(arc) ?? undefined}
                  fill={palette[metrics.indexOf(arc.data) % palette.length]}
                />
              ))
            }
          </Pie>
        </Group>
      </svg>
      <div className="cusec-summary-pie__legend">
        {metrics.map((metric, index) => (
          <div key={metric.label}>
            <span style={{ background: palette[index % palette.length] }} aria-hidden="true" />
            <strong>{formatPercent(metric.value)}</strong>
            <small>{metric.label}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ParticipantSchoolsSummary() {
  const t = useTranslations("Summary");

  const studyMetrics: LabeledMetric[] = historicStudyMix.metrics.map((metric) => ({
    label: t(`studyMix.metrics.${metric.key}`),
    value: metric.value,
  }));

  const degreeMetrics: LabeledMetric[] = historicDegreeMix.metrics.map((metric) => ({
    label: t(`degreeMix.metrics.${metric.key}`),
    value: metric.value,
  }));

  return (
    <div className="cusec-schools-summary">
      <div className="cusec-summary-layout">
        <ChartShell
          id={historicStudyMix.id}
          title={t("studyMix.title")}
          footnote={historicStudyMix.hasFootnote ? t("studyMix.footnote") : undefined}
        >
          <HorizontalBars metrics={studyMetrics} ariaLabel={t("barChartAria")} />
        </ChartShell>

        <ChartShell id={historicDegreeMix.id} title={t("degreeMix.title")}>
          <PieChart metrics={degreeMetrics} label={t("degreePieAria")} />
        </ChartShell>
      </div>
    </div>
  );
}
