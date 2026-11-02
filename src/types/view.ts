export type ViewPreset = "overview" | "desk" | "bookshelf" | "window";

export type DetailPreset = Exclude<ViewPreset, "overview">;

export type ViewConfig = {
  id: ViewPreset;
  label: string;
  position: [number, number, number];
  target: [number, number, number];
};
