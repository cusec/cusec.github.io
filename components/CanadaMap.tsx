"use client";

import type { CSSProperties } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker,
  Sphere,
} from "react-simple-maps";
import { Tooltip, TooltipProvider } from "@/components/Tooltip";

export type MapPin = {
  id: string;
  name: string;
  city?: string;
  lat: number;
  lon: number;
  color?: string;
};

type CanadaMapProps = {
  pins: MapPin[];
  onPinClick?: (id: string) => void;
  activeId?: string | null;
  ariaLabel: string;
};

const GEO_URL = "/maps/world-110m.json";
// ISO 3166-1 numeric code for Canada (used by world-atlas topojson).
const CANADA_ID = "124";

const MAP_WIDTH = 980;
const MAP_HEIGHT = 520;

type JitteredPin = MapPin & { dx: number; dy: number; clustered: boolean };

function jitterByCity(pins: MapPin[]): JitteredPin[] {
  const byCity = new Map<string, MapPin[]>();
  for (const pin of pins) {
    const key = pin.city ?? `${pin.lat.toFixed(3)},${pin.lon.toFixed(3)}`;
    const group = byCity.get(key);
    if (group) {
      group.push(pin);
    } else {
      byCity.set(key, [pin]);
    }
  }

  const result: JitteredPin[] = [];
  for (const group of byCity.values()) {
    if (group.length === 1) {
      result.push({ ...group[0], dx: 0, dy: 0, clustered: false });
      continue;
    }
    const sorted = [...group].sort((a, b) => a.name.localeCompare(b.name));
    const radius = Math.min(16, 6 + sorted.length * 1.1);
    const startAngle = -Math.PI / 2;
    sorted.forEach((pin, index) => {
      const angle = startAngle + (index / sorted.length) * Math.PI * 2;
      result.push({
        ...pin,
        dx: Math.cos(angle) * radius,
        dy: Math.sin(angle) * radius,
        clustered: true,
      });
    });
  }
  return result;
}

export function CanadaMap({ pins, onPinClick, activeId, ariaLabel }: CanadaMapProps) {
  const interactive = Boolean(onPinClick);
  const jitteredPins = jitterByCity(pins);

  return (
    <TooltipProvider>
      <div
        className={`cusec-canada-map${interactive ? " cusec-canada-map--interactive" : ""}`}
        role="img"
        aria-label={ariaLabel}
      >
        <ComposableMap
          projection="geoAlbers"
          projectionConfig={{
            rotate: [98, 0, 0],
            center: [0, 54.5],
            parallels: [44, 58],
            scale: 950,
          }}
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          style={{ width: "100%", height: "auto" }}
        >
          <defs>
            <radialGradient id="cusec-map-land-gradient" cx="50%" cy="40%" r="75%">
              <stop offset="0%" stopColor="rgba(255, 219, 74, 0.10)" />
              <stop offset="55%" stopColor="rgba(34, 34, 34, 0.05)" />
              <stop offset="100%" stopColor="rgba(34, 34, 34, 0.10)" />
            </radialGradient>
            <filter id="cusec-map-pin-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <Sphere
            id="cusec-map-sphere"
            stroke="rgba(34, 34, 34, 0.18)"
            strokeWidth={0.5}
            fill="transparent"
          />

          <Graticule stroke="rgba(34, 34, 34, 0.07)" strokeWidth={0.4} step={[10, 10]} />

          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies
                .filter((geo) => geo.id === CANADA_ID)
                .map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    className="cusec-canada-map__land"
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
            }
          </Geographies>

          {jitteredPins.map((pin) => {
            const isActive = activeId === pin.id;
            const handleClick = onPinClick ? () => onPinClick(pin.id) : undefined;
            const colorStyle = pin.color
              ? ({ "--cusec-pin-color": pin.color } as CSSProperties)
              : undefined;
            const label = pin.city ? `${pin.name} — ${pin.city}` : pin.name;

            return (
              <Marker
                key={pin.id}
                coordinates={[pin.lon, pin.lat]}
                onClick={handleClick}
                className={`cusec-canada-map__pin${isActive ? " cusec-canada-map__pin--active" : ""}`}
                style={{
                  default: { cursor: interactive ? "pointer" : "default" },
                  hover: { cursor: interactive ? "pointer" : "default" },
                  pressed: { cursor: interactive ? "pointer" : "default" },
                }}
                tabIndex={interactive ? 0 : -1}
                onKeyDown={
                  interactive
                    ? (event: React.KeyboardEvent<SVGGElement>) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          onPinClick?.(pin.id);
                        }
                      }
                    : undefined
                }
                aria-label={label}
              >
                {pin.clustered && (
                  <>
                    <line
                      x1={0}
                      y1={0}
                      x2={pin.dx}
                      y2={pin.dy}
                      className="cusec-canada-map__pin-stem"
                    />
                    <circle r={1.4} className="cusec-canada-map__pin-anchor" />
                  </>
                )}
                <Tooltip label={label}>
                  <g transform={`translate(${pin.dx}, ${pin.dy})`} style={colorStyle}>
                    <circle r={9} className="cusec-canada-map__pin-hit" />
                    <circle r={3.5} className="cusec-canada-map__pin-dot" />
                  </g>
                </Tooltip>
              </Marker>
            );
          })}
        </ComposableMap>
      </div>
    </TooltipProvider>
  );
}
