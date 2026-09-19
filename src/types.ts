export type ViewPreset = "overview" | "desk" | "bookshelf" | "window";

export type ViewConfig = {
  id: ViewPreset;
  label: string;
  position: [number, number, number];
  target: [number, number, number];
};

export type CardInfo = {
  id: ViewPreset;
  label: string;
  subLabel: string;
  icon: string;
  description: string;
};

export type HotspotConfig = {
  id: Exclude<ViewPreset, "overview">;
  label: string;
  subLabel: string;
  icon: string;
  description: string;
  position: [number, number, number];
};

export type ScreenPosition = {
  x: number;
  y: number;
};
