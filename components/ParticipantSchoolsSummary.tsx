"use client";

import { useTranslations } from "next-intl";
import { ChartShell } from "@/components/ChartShell";
import { HorizontalBarsChart } from "@/components/HorizontalBarsChart";
import { PieChart } from "@/components/PieChart";
import type { LabeledMetric } from "@/lib/chartTheme";
import {
  historicDegreeMix,
  historicStudyMix,
} from "@/lib/participantSchoolsSummaryData";

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
          <HorizontalBarsChart metrics={studyMetrics} ariaLabel={t("barChartAria")} />
        </ChartShell>

        <ChartShell id={historicDegreeMix.id} title={t("degreeMix.title")}>
          <PieChart metrics={degreeMetrics} label={t("degreePieAria")} />
        </ChartShell>
      </div>
    </div>
  );
}
