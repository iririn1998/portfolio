# Project Rules & Guidelines

## Component Directory Structure

- コンポーネントは各コンポーネントごとのディレクトリを作成し、エントリポイントを `index.tsx` とする構造で作成してください。
  - 例: `src/components/<ComponentName>/index.tsx`
- 既存のコンポーネントを参照する際のインポートパスは `src/components/<ComponentName>` または相対パス `./<ComponentName>` で解決可能です。

## Styling Guidelines

- 各コンポーネントのスタイルはグローバル CSS ではなく、コンポーネントディレクトリ内に `index.module.css` を作成して CSS Modules を利用してください。
  - 例: `src/components/<ComponentName>/index.module.css`
- `src/index.css` には `:root` 変数やベーススタイルなど、全体で共有する最小限の定義のみを配置してください。

## Shared Modules Organization (constants / types / utils)

- `constants`, `types`, `utils` はフラットな単一ファイルではなく、機能ごとのディレクトリ（`src/constants/`, `src/types/`, `src/utils/`）に配置してください。
- 各ディレクトリ内には機能に応じた命名のファイルを作成し、エントリポイントとして `index.ts`（バレルファイル）から re-export してください。
  - 例: `src/types/view.ts`, `src/types/card.ts` -> `src/types/index.ts` から `export * from "./view";`
