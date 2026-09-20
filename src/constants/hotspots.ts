import type { HotspotConfig } from "../types";
import { CARD_INFOS } from "./cardInfos";

export const HOTSPOTS: HotspotConfig[] = [
  {
    id: "desk",
    label: CARD_INFOS.desk.label,
    subLabel: CARD_INFOS.desk.subLabel,
    icon: CARD_INFOS.desk.icon,
    description: CARD_INFOS.desk.description,
    position: [0.3, 1.85, -0.65],
  },
  {
    id: "bookshelf",
    label: CARD_INFOS.bookshelf.label,
    subLabel: CARD_INFOS.bookshelf.subLabel,
    icon: CARD_INFOS.bookshelf.icon,
    description: CARD_INFOS.bookshelf.description,
    position: [-1.45, 1.45, -0.1],
  },
  {
    id: "window",
    label: CARD_INFOS.window.label,
    subLabel: CARD_INFOS.window.subLabel,
    icon: CARD_INFOS.window.icon,
    description: CARD_INFOS.window.description,
    position: [-1.05, 1.15, 1.05],
  },
];
