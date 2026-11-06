import type { CSSProperties } from "react";
import type { GenUIDocument } from "@gen-ui/core";

export function themeToCssVars(themeRef?: GenUIDocument["themeRef"]): CSSProperties {
  if (!themeRef) {
    return {};
  }
  const colors = themeRef.colors as Record<string, string> | undefined;
  const radius = themeRef.radius as Record<string, string> | undefined;
  const typography = themeRef.typography as {
    fontFamily?: string;
    fontFamilyDisplay?: string;
  } | undefined;

  const vars: Record<string, string> = {};
  if (colors?.primary) {
    vars["--genui-color-primary"] = colors.primary;
    vars["--action"] = colors.primary;
    vars["--link"] = colors.primary;
  }
  if (colors?.focus || colors?.primary) {
    vars["--focus"] = colors?.focus ?? colors?.primary ?? "";
  }
  if (colors?.primaryHover) {
    vars["--genui-color-primary-hover"] = colors.primaryHover;
    vars["--action-hover"] = colors.primaryHover;
  }
  if (colors?.primaryPressed) vars["--action-pressed"] = colors.primaryPressed;
  if (colors?.onPrimary) vars["--on-action"] = colors.onPrimary;
  if (colors?.surface) {
    vars["--genui-color-surface"] = colors.surface;
    vars["--surface-page"] = colors.surface;
  }
  if (colors?.surfaceElevated) vars["--surface-card"] = colors.surfaceElevated;
  if (colors?.text) {
    vars["--genui-color-text"] = colors.text;
    vars["--text-primary"] = colors.text;
  }
  if (colors?.textMuted) {
    vars["--genui-color-text-muted"] = colors.textMuted;
    vars["--text-secondary"] = colors.textMuted;
  }
  if (colors?.border) {
    vars["--genui-color-border"] = colors.border;
    vars["--border"] = colors.border;
  }
  if (radius?.sm) {
    vars["--genui-radius-sm"] = radius.sm;
    vars["--radius-sm"] = radius.sm;
  }
  if (radius?.md) {
    vars["--genui-radius-md"] = radius.md;
    vars["--radius-md"] = radius.md;
  }
  if (typography?.fontFamily) vars["--font-text"] = typography.fontFamily;
  if (typography?.fontFamilyDisplay) vars["--font-display"] = typography.fontFamilyDisplay;

  return {
    ...vars,
    ...(typography?.fontFamily ? { fontFamily: typography.fontFamily } : {}),
  } as CSSProperties;
}
