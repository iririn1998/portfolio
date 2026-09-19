import type { HotspotConfig, ViewConfig } from "./types";

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

export const HOTSPOTS: HotspotConfig[] = [
  {
    id: "desk",
    label: "デスク",
    subLabel: "Workspace",
    icon: "💻",
    description:
      "デュアル環境とエルゴノミクス設計のデスク。コード設計やデザイン制作を行うメイン作業環境です。",
    position: [0.3, 1.85, -0.65],
  },
  {
    id: "bookshelf",
    label: "本棚",
    subLabel: "Library",
    icon: "📚",
    description:
      "デザイン書・技術書・アートブックが並ぶ本棚。アイデアや知見をストックするインスピレーションの源です。",
    position: [-1.45, 1.45, -0.1],
  },
  {
    id: "window",
    label: "観葉植物",
    subLabel: "Greenery",
    icon: "🪴",
    description:
      "柔らかな自然光が差し込むアトリエの窓辺。観葉植物がデスク周りに安らぎと心地よい集中をもたらします。",
    position: [-1.05, 1.15, 1.05],
  },
];
