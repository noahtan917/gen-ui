import type { CSSProperties } from "react";
import type { GenUIDocument } from "@gen-ui/core";

export function themeToCssVars(themeRef?: GenUIDocument["themeRef"]): CSSProperties {
  if (!themeRef) {
    return {};
  }
  const colors = themeRef.colors as Record<string, string> | undefined;
  const radius = themeRef.radius as Record<string, string> | undefined;
  const typography = themeRef.typography as { fontFamily?: string } | undefined;

  const vars: Record<string, string> = {};
  if (colors?.primary) vars["--genui-color-primary"] = colors.primary;
  if (colors?.surface) vars["--genui-color-surface"] = colors.surface;
  if (colors?.text) vars["--genui-color-text"] = colors.text;
  if (radius?.md) vars["--genui-radius-md"] = radius.md;

  return {
    ...vars,
    ...(typography?.fontFamily ? { fontFamily: typography.fontFamily } : {}),
  } as CSSProperties;
}
