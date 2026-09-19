import type { ViewConfig } from "./types";

export const VIEW_PRESETS: ViewConfig[] = [
  {
    id: "overview",
    label: "全体 (Overview)",
    position: [5.2, 4.6, 5.2],
    target: [0, 0.75, 0],
  },
  {
    id: "desk",
    label: "デスク (Desk)",
    position: [2.0, 2.3, 1.4],
    target: [0.3, 1.05, -0.65],
  },
  {
    id: "bookshelf",
    label: "本棚 (Bookshelf)",
    position: [1.3, 1.8, 1.2],
    target: [-1.4, 0.75, -0.1],
  },
  {
    id: "window",
    label: "窓辺・植物 (Window)",
    position: [2.4, 2.1, 2.3],
    target: [-0.8, 0.85, 0.3],
  },
];
