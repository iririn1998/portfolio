# Project Rules & Guidelines

## Component Directory Structure

- コンポーネントは各コンポーネントごとのディレクトリを作成し、エントリポイントを `index.tsx` とする構造で作成してください。
  - 例: `src/components/<ComponentName>/index.tsx`
- 既存のコンポーネントを参照する際のインポートパスは `src/components/<ComponentName>` または相対パス `./<ComponentName>` で解決可能です。
