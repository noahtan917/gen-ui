import { buildInteractionContext, type GenUIComponent } from "@gen-ui/core";
import type { ReactNode } from "react";
import type { RenderContext } from "./registry.js";

/** Blue-scale cycle from design-system/tokens/colors.css. */
const SERIES_COLORS = ["#2F63D6", "#A8C0F4", "#1A3A8C", "#5E88E4", "#0B1B45", "#86A8F2"];

/** Hex values in design-system/tokens/colors.css. Compared case-insensitively. */
const BRAND_HEX = new Set(
  [
    "#0A0C11",
    "#FFFFFF",
    "#2F63D6",
    "#0B1B45",
    "#1A3A8C",
    "#A8C0F4",
    "#EEF1F5",
    "#12161F",
    "#10141C",
    "#737373",
    "#EEF3FD",
    "#DCE6FB",
    "#86A8F2",
    "#5E88E4",
    "#2551B6",
    "#13296A",
    "#F4F6F9",
    "#D8DEE7",
    "#AEB8C8",
    "#98A2B4",
    "#667085",
    "#586173",
    "#3A4354",
    "#1B212C",
    "#252C39",
    "#3F9BF0",
    "#6E5BE0",
    "#A35CE6",
    "#1FA971",
    "#E59E1A",
    "#F26B3A",
    "#EF4F6B",
    "#6FA11F",
    "#D64FA8",
    "#7A2FB0",
    "#1F9D63",
    "#D99A21",
    "#D2483B",
    "#A9BCEB",
    "#F1F3F7",
  ].map((hex) => hex.toUpperCase()),
);

type ChartKind = "bar" | "column" | "stacked-bar";

interface Series {
  key: string;
  label: string;
  color: string;
}

interface ChartRow {
  label: string;
  values: Record<string, number>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function own(row: Record<string, unknown>, key: string): unknown {
  return Object.prototype.hasOwnProperty.call(row, key) ? row[key] : undefined;
}

function asNumber(value: unknown): number {
  const n = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  return Number.isFinite(n) ? n : 0;
}

function hexColor(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const match = /^#([0-9A-Fa-f]{6})$/.exec(value.trim());
  if (!match) return fallback;
  const hex = `#${match[1].toUpperCase()}`;
  return BRAND_HEX.has(hex) ? hex : fallback;
}

function formatNumber(value: number): string {
  return Number.isInteger(value) ? value.toLocaleString("en-US") : value.toLocaleString("en-US", { maximumFractionDigits: 1 });
}

function readSeries(props: Record<string, unknown>): Series[] {
  if (!Array.isArray(props.series)) return [];
  return props.series.flatMap((entry, index) => {
    if (!isRecord(entry) || typeof entry.key !== "string" || typeof entry.label !== "string") return [];
    return [
      {
        key: entry.key,
        label: entry.label,
        color: hexColor(entry.color, SERIES_COLORS[index % SERIES_COLORS.length]),
      },
    ];
  });
}

function readRows(props: Record<string, unknown>, series: Series[], state: Record<string, unknown>): ChartRow[] {
  if (!Array.isArray(props.data)) return [];
  const stateKey = typeof props.stateKey === "string" ? props.stateKey : "";
  const selected = stateKey ? String(state[stateKey] ?? "") : "";
  return props.data.flatMap((entry) => {
    if (!isRecord(entry)) return [];
    if (stateKey && String(own(entry, stateKey) ?? "") !== selected) return [];
    const values: Record<string, number> = {};
    for (const item of series) values[item.key] = asNumber(own(entry, item.key));
    return [{ label: String(own(entry, "label") ?? ""), values }];
  });
}

function kindOf(props: Record<string, unknown>, seriesCount: number): ChartKind {
  const raw = props.chartType;
  if (raw === "bar" || raw === "column" || raw === "stacked-bar") return raw;
  return seriesCount > 1 ? "stacked-bar" : "bar";
}

function withUnit(value: number, unit: string): string {
  const text = formatNumber(value);
  if (!unit) return text;
  return unit === "%" ? `${text}%` : `${text} ${unit}`;
}

export function renderChart(component: GenUIComponent, ctx: RenderContext): ReactNode {
  const series = readSeries(component.props);
  const rows = readRows(component.props, series, ctx.state);
  const kind = kindOf(component.props, series.length);
  const ariaLabel = String(component.props.ariaLabel ?? "Chart");
  const unit = typeof component.props.unit === "string" ? component.props.unit : "";
  const clickable = Boolean(component.actionId);

  const activate = (label: string) => {
    if (!component.actionId) return;
    ctx.onInteract(component.actionId, component.id, {
      ...buildInteractionContext(component, ctx.state),
      label,
    });
  };

  const maxCell = Math.max(1, ...rows.flatMap((row) => series.map((item) => row.values[item.key] ?? 0)));
  const maxTotal = Math.max(
    1,
    ...rows.map((row) => series.reduce((sum, item) => sum + (row.values[item.key] ?? 0), 0)),
  );

  const legend = (
    <div className="genui-chart__legend">
      {series.map((item) => (
        <span key={item.key} className="genui-chart__legend-item">
          <i className="genui-chart__swatch" style={{ background: item.color }} />
          {item.label}
        </span>
      ))}
    </div>
  );

  const rowBody = (row: ChartRow) => {
    const total = series.reduce((sum, item) => sum + (row.values[item.key] ?? 0), 0);
    if (kind === "column") {
      return (
        <span className="genui-chart__column">
          <span className="genui-chart__column-plot">
            {series.map((item) => {
              const value = row.values[item.key] ?? 0;
              return (
                <span
                  key={item.key}
                  className="genui-chart__column-bar"
                  style={{ height: `${(value / maxCell) * 100}%`, background: item.color }}
                  title={`${item.label} ${withUnit(value, unit)}`}
                />
              );
            })}
          </span>
          <span className="genui-chart__tick">{row.label}</span>
        </span>
      );
    }

    const segments =
      kind === "stacked-bar"
        ? series.map((item) => {
            const value = row.values[item.key] ?? 0;
            return { ...item, value, width: (value / maxTotal) * 100 };
          })
        : series.map((item) => {
            const value = row.values[item.key] ?? 0;
            return { ...item, value, width: (value / maxCell) * 100 };
          });

    return (
      <>
        <span className="genui-chart__label">{row.label}</span>
        <span className="genui-chart__tracks">
          {kind === "stacked-bar" ? (
            <span className="genui-chart__track">
              {segments.map((item) => (
                <span
                  key={item.key}
                  className="genui-chart__segment"
                  style={{ width: `${item.width}%`, background: item.color }}
                  title={`${item.label} ${withUnit(item.value, unit)}`}
                />
              ))}
            </span>
          ) : (
            segments.map((item) => (
              <span key={item.key} className="genui-chart__track">
                <span
                  className="genui-chart__segment"
                  style={{ width: `${item.width}%`, background: item.color }}
                  title={`${item.label} ${withUnit(item.value, unit)}`}
                />
              </span>
            ))
          )}
        </span>
        <span className="genui-chart__value">{withUnit(kind === "stacked-bar" ? total : maxOf(row, series), unit)}</span>
      </>
    );
  };

  return (
    <div className="genui-chart" data-component-id={component.id} role="group" aria-label={ariaLabel}>
      {legend}
      {rows.length === 0 ? (
        <p className="genui-chart__empty">No rows for this selection.</p>
      ) : kind === "column" ? (
        <div className="genui-chart__columns">
          {rows.map((row) =>
            clickable ? (
              <button key={row.label} type="button" className="genui-chart__column-button" onClick={() => activate(row.label)}>
                {rowBody(row)}
              </button>
            ) : (
              <div key={row.label}>{rowBody(row)}</div>
            ),
          )}
        </div>
      ) : (
        <div className="genui-chart__rows">
          {rows.map((row) =>
            clickable ? (
              <button key={row.label} type="button" className="genui-chart__row" onClick={() => activate(row.label)}>
                {rowBody(row)}
              </button>
            ) : (
              <div key={row.label} className="genui-chart__row">
                {rowBody(row)}
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}

function maxOf(row: ChartRow, series: Series[]): number {
  return Math.max(0, ...series.map((item) => row.values[item.key] ?? 0));
}
