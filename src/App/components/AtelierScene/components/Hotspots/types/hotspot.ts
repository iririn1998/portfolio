import type { ViewPreset } from "../../../../../../types";

/** @scope .. */
export type HotspotConfig = {
  id: Exclude<ViewPreset, "overview">;
  label: string;
  subLabel: string;
  icon: string;
  description: string;
  position: [number, number, number];
};
