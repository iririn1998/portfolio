import type { CardInfo, ViewPreset } from "../types";

export const CARD_INFOS: Record<ViewPreset, CardInfo> = {
  overview: {
    id: "overview",
    label: "アトリエ空間",
    subLabel: "3D Workspace",
    icon: "🎨",
    description:
      "デザインと開発を行う3Dアトリエ空間。空間内のピンにカーソルを合わせると各エリアの詳細が確認できます。",
  },
  desk: {
    id: "desk",
    label: "デスク",
    subLabel: "Workspace",
    icon: "💻",
    description:
      "デュアル環境とエルゴノミクス設計のデスク。コード設計やデザイン制作を行うメイン作業環境です。",
  },
  bookshelf: {
    id: "bookshelf",
    label: "本棚",
    subLabel: "Library",
    icon: "📚",
    description:
      "デザイン書・技術書・アートブックが並ぶ本棚。アイデアや知見をストックするインスピレーションの源です。",
  },
  window: {
    id: "window",
    label: "観葉植物",
    subLabel: "Greenery",
    icon: "🪴",
    description:
      "柔らかな自然光が差し込むアトリエの窓辺。観葉植物がデスク周りに安らぎと心地よい集中をもたらします。",
  },
};
