# Project Rules & Guidelines

## Component Directory Structure

- コンポーネントは各コンポーネントごとのディレクトリを作成し、エントリポイントを `index.tsx` とする構造で作成してください。
  - 例: `src/components/<ComponentName>/index.tsx`
- 既存のコンポーネントを参照する際のインポートパスは `src/components/<ComponentName>` または相対パス `./<ComponentName>` で解決可能です。

## Styling Guidelines

- 各コンポーネントのスタイルはグローバル CSS ではなく、コンポーネントディレクトリ内に `index.module.css` を作成して CSS Modules を利用してください。
  - 例: `src/components/<ComponentName>/index.module.css`
- `src/index.css` には `:root` 変数やベーススタイルなど、全体で共有する最小限の定義のみを配置してください。
