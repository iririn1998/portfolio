export type ViewPreset = "overview" | "desk" | "bookshelf" | "window";

export type ViewConfig = {
  id: ViewPreset;
  label: string;
  position: [number, number, number];
  target: [number, number, number];
};

export type HotspotConfig = {
  id: Exclude<ViewPreset, "overview">;
  label: string;
  subLabel: string;
  icon: string;
  position: [number, number, number];
};
