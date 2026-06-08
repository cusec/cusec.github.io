import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { formatPercent, type LabeledMetric, palette } from "@/lib/chartTheme";

export function PieChart({
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
