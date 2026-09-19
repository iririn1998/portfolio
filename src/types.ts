export type ViewPreset = "overview" | "desk" | "bookshelf" | "window";

export type ViewConfig = {
  id: ViewPreset;
  label: string;
  position: [number, number, number];
  target: [number, number, number];
};
