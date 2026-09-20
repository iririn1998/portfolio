import type { ViewPreset } from "./view";

export type HotspotConfig = {
  id: Exclude<ViewPreset, "overview">;
  label: string;
  subLabel: string;
  icon: string;
  description: string;
  position: [number, number, number];
};
