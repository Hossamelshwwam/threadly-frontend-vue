import type { Variant } from "../type";

export const VARIANTS: Record<
  Variant,
  {
    accentLine: string; // gradient color stop
    iconBg: string; // icon wrapper bg + border
    iconColor: string; // icon color
    titleColor: string;
    checkboxBg: string;
    confirmTheme: "primary" | "neutral" | "danger" | "warning" | "success"; // maps to CustomButton theme
  }
> = {
  default: {
    accentLine: "#d99a4a",
    iconBg: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-500",
    titleColor: "text-zinc-900",
    checkboxBg: "bg-zinc-50 border-zinc-200",
    confirmTheme: "primary",
  },
  danger: {
    accentLine: "#b03a2e",
    iconBg: "bg-red-50 border-red-200",
    iconColor: "text-red-500",
    titleColor: "text-red-700",
    checkboxBg: "bg-red-50 border-red-200",
    confirmTheme: "danger",
  },
  warning: {
    accentLine: "#c47f2e",
    iconBg: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-500",
    titleColor: "text-amber-700",
    checkboxBg: "bg-amber-50 border-amber-200",
    confirmTheme: "warning",
  },
  info: {
    accentLine: "#3f3f46",
    iconBg: "bg-zinc-100 border-zinc-300",
    iconColor: "text-zinc-600",
    titleColor: "text-zinc-800",
    checkboxBg: "bg-zinc-50 border-zinc-200",
    confirmTheme: "neutral",
  },
  success: {
    accentLine: "#3d7a5e",
    iconBg: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
    titleColor: "text-green-800",
    checkboxBg: "bg-green-50 border-green-200",
    confirmTheme: "success",
  },
};
