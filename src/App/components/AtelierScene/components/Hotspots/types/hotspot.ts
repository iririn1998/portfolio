import type { ViewPreset } from "../../../../../../types";

/** @scope .. */
export type HotspotConfig = {
  id: Exclude<ViewPreset, "overview">;
  label: string;
  subLabel: string;
  icon: string;
  description: string;
  /** What the detail modal shows, displayed under the detail button label. */
  detailHint: string;
  position: [number, number, number];
};
