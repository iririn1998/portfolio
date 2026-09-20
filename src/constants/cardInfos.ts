import type { CardInfo, ViewPreset } from "../types";

export const CARD_INFOS: Record<ViewPreset, CardInfo> = {
  overview: {
    id: "overview",
    label: "アトリエ空間",
    subLabel: "3D Workspace",
    icon: "🎨",
    description:
      "自己紹介・スキル・プロダクトを紹介する3Dアトリエ。デスクは自己紹介、本棚はスキル、植物はプロダクトに対応しています。空間内のピンにカーソルを合わせて探索できます。",
  },
  desk: {
    id: "desk",
    label: "自己紹介",
    subLabel: "About Me",
    icon: "💻",
    description:
      "デスクは自己紹介のエリア。プロフィールやこれまでの歩み、ものづくりで大切にしていることを紹介します。",
  },
  bookshelf: {
    id: "bookshelf",
    label: "スキル",
    subLabel: "Skills",
    icon: "📚",
    description: "本棚はスキルのエリア。開発やデザインで使う技術・ツール、得意分野を紹介します。",
  },
  window: {
    id: "window",
    label: "プロダクト",
    subLabel: "Products",
    icon: "🪴",
    description:
      "植物はプロダクトのエリア。これまでに制作したプロダクトや、制作の背景・工夫を紹介します。",
  },
};
