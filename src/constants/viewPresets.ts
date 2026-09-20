import type { ViewConfig } from "../types";
import { CARD_INFOS } from "./cardInfos";

export const VIEW_PRESETS: ViewConfig[] = [
  {
    id: "overview",
    label: "全体 (Overview)",
    position: [5.2, 4.6, 5.2],
    target: [0, 0.75, 0],
  },
  {
    id: "desk",
    label: `${CARD_INFOS.desk.label} (${CARD_INFOS.desk.subLabel})`,
    position: [2.0, 2.3, 1.4],
    target: [0.3, 1.05, -0.65],
  },
  {
    id: "bookshelf",
    label: `${CARD_INFOS.bookshelf.label} (${CARD_INFOS.bookshelf.subLabel})`,
    position: [1.3, 1.8, 1.2],
    target: [-1.4, 0.75, -0.1],
  },
  {
    id: "window",
    label: `${CARD_INFOS.window.label} (${CARD_INFOS.window.subLabel})`,
    position: [2.4, 2.1, 2.3],
    target: [-0.8, 0.85, 0.3],
  },
];
