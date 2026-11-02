import type { DetailData, DetailPreset } from "../types";

export const DETAIL_CONTENTS: Record<DetailPreset, DetailData> = {
  desk: {
    id: "desk",
    title: "自己紹介",
    subtitle: "About Me",
    icon: "💻",
    lead: "Webフロントエンド開発を中心に、デザインとテクノロジーの境界をなめらかに繋ぐ心地よいユーザー体験を探求しています。",
    sections: [
      {
        heading: "プロフィール",
        paragraphs: [
          "Webフロントエンドエンジニアとして、モダンなWeb技術を活用したUI/UXの設計・実装に取り組んでいます。",
          "直感的で心地よいインタラクション設計と、型安全性や保守性・拡張性に優れたフロントエンドアーキテクチャの構築を得意としています。",
          "Web標準技術に加え、Three.jsやWebGLを活用したブラウザ上でのリッチな3D表現、パフォーマンス最適化にも情熱を注いでいます。",
        ],
      },
      {
        heading: "ものづくりで大切にしていること",
        items: [
          {
            title: "直感的な操作性とアクセシビリティ",
            description:
              "視覚的な美しさはもちろんのこと、誰にとっても迷わず自然に扱えるインターフェース設計を心がけています。",
          },
          {
            title: "細部へのクラフトマンシップ",
            description:
              "余白、タイポグラフィ、トランジションのイージングなど、細部への配慮が全体の完成度と心地よさを生み出すと信じています。",
          },
          {
            title: "継続的な探求と技術還元",
            description:
              "日々進化するフロントエンドエコシステムやWebグラフィックスの可能性をキャッチアップし、実際のプロダクトへ還元しています。",
          },
        ],
      },
    ],
  },
  bookshelf: {
    id: "bookshelf",
    title: "スキル",
    subtitle: "Skills",
    icon: "📚",
    lead: "TypeScriptとReactを中心としたモダンなフロントエンド技術スタックと、WebGL/Three.jsを用いた3D表現を武器としています。",
    sections: [
      {
        heading: "開発スキル・技術領域",
        items: [
          {
            title: "Frontend Development",
            description:
              "React / Next.js / TypeScriptを用いたコンポーネント指向のUI設計と堅牢な状態管理。",
            tags: ["TypeScript", "React", "Next.js", "HTML5", "CSS3", "Vite"],
          },
          {
            title: "3D & Creative Web",
            description:
              "Three.jsおよびReact Three Fiberを活用したリアルタイム3D演出、カメラ制御、アニメーション実装。",
            tags: ["Three.js", "React Three Fiber", "Drei", "WebGL", "GLSL"],
          },
          {
            title: "UI / UX & Styling",
            description:
              "CSS ModulesやモダンCSSを用いたモジュラーなスタイリング、レスポンシブデザイン、デザインシステム構築。",
            tags: ["CSS Modules", "Tailwind CSS", "Figma", "Design System"],
          },
        ],
      },
      {
        heading: "ツール・開発環境",
        items: [
          {
            title: "品質管理 & テスト",
            description: "型チェック、リンティング、ユニットテストによるコード品質の担保。",
            tags: ["Vitest", "ESLint", "Oxlint", "Stylelint"],
          },
          {
            title: "ワークフロー & デプロイ",
            description:
              "Gitによるバージョン管理、モダンパッケージマネージャー、CI/CD環境での自動化。",
            tags: ["Git", "GitHub", "GitHub Actions", "pnpm", "Vercel"],
          },
        ],
      },
    ],
  },
  window: {
    id: "window",
    title: "プロダクト",
    subtitle: "Products",
    icon: "🪴",
    lead: "これまでに設計・開発したプロダクトや、実験的なWeb体験のプロジェクトです。",
    sections: [
      {
        heading: "制作実績・プロジェクト",
        items: [
          {
            title: "3D Atelier Portfolio (本サイト)",
            description:
              "アトリエ空間をモチーフにしたインタラクティブな3Dポートフォリオ。Three.jsとReactを融合し、滑らかなカメラ移動と詳細情報のモーダル展開を実現。",
            tags: ["React 19", "Three.js", "React Three Fiber", "TypeScript", "Vite"],
          },
          {
            title: "Webアプリケーション開発",
            description:
              "使いやすさと軽快なパフォーマンスを両立したWebフロントエンドの実装。アクセシビリティへの配慮や状態管理の最適化を実施。",
            tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
          },
          {
            title: "3Dビジュアルインタラクション",
            description:
              "WebGL / Three.jsを用いたブラウザ上でのグラフィック演出や、3Dモデルの最適化・軽量化によるスムーズな描画体験の追求。",
            tags: ["Three.js", "WebGL", "Blender", "GLSL"],
          },
        ],
      },
    ],
  },
};
