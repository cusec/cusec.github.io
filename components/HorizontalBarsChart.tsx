import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { formatPercent, type LabeledMetric, palette } from "@/lib/chartTheme";

export function HorizontalBarsChart({
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
