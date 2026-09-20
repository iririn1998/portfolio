# Vite React Template

React アプリケーションを素早く立ち上げるための、再利用可能なプロジェクトテンプレートです。

必要最小限の構成を保ちつつ、開発・テスト・静的解析・フォーマット・ビルドに必要なツールをあらかじめ設定しています。このリポジトリから新しいプロジェクトを作成し、用途に応じてライブラリやディレクトリを追加していくことを想定しています。

## 主な構成

- React 19
- TypeScript
- Vite
- React Compiler
- Vitest + Happy DOM
- Oxlint
- ESLint + eslint-plugin-export-scope（export の公開範囲の検査）
- Stylelint
- Oxfmt
- destyle.css
- mise による Node.js / pnpm のバージョン管理

ルーティング、状態管理、UI ライブラリなどは含めていません。派生プロジェクトの要件に合わせて選択してください。

## 新しいプロジェクトを始める

GitHub でこのリポジトリの **Use this template** から、派生先となる新しいリポジトリを作成します。その後、作成した新しいリポジトリをローカルにクローンしてください。

クローン時に設定される `origin` は新しいリポジトリを指すため、元のテンプレートからリモートを付け替える必要はありません。

### 1. プロジェクト情報を変更する

`package.json` の `name` と `index.html` の `<title>` を、作成したプロジェクトに合わせて変更します。サイトの表示言語が英語以外の場合は、`index.html` の `<html lang="en">` も適切な言語へ変更してください。

`public/favicon.svg` をプロジェクトのファビコンに差し替え、この README もプロジェクト固有の内容へ書き換えます。

### 2. 開発環境を準備する

[mise](https://mise.jdx.dev/) を利用する場合は、プロジェクトで使用する Node.js と pnpm をまとめてインストールできます。

```sh
mise install
```

mise を利用しない場合は、`mise.toml` に記載されたバージョンの Node.js と pnpm を用意してください。

### 3. 依存関係をインストールする

```sh
pnpm install
```

### 4. 開発サーバーを起動する

```sh
pnpm dev
```

ターミナルに表示された URL をブラウザで開いてください。

## export の公開範囲

`pnpm lint` / `pnpm lint:js` は Oxlint に加えて ESLint の export-scope ルールを実行します。公開範囲だけを確認する場合は `pnpm lint:scope` を使います。ESLint の対象は `src` 配下の TypeScript / TSX です。

[eslint-plugin-export-scope](https://github.com/A-Shleifman/eslint-plugin-export-scope) のデフォルトを利用し、通常のファイルは同じディレクトリとその配下、`index.ts` / `index.tsx` は親ディレクトリとその配下からの import を許可します。

- `constants`・`types`・`utils` は `index.ts` 経由で参照してください。外部から内部ファイルを直接 import するとエラーになります。
- コンポーネントは `src/components/<ComponentName>/index.tsx` を公開入口にします。
- `hooks/` 内の hook は export の直前に `/** @scope .. */` を付け、所属するコンポーネントとその配下に公開します。他のコンポーネントからの直接 import は禁止します。
- `App` の default export は `/** @scope ../.. */` により `src/main.tsx` から利用できます。

VS Code では推奨拡張の ESLint をインストールし、TypeScript の「Use Workspace Version」を選択してください。`tsconfig.app.json` のプラグイン設定により、補完も公開範囲を考慮します。scope の変更が診断に反映されない場合は ESLint Server を再起動してください。

互換性について: eslint-plugin-export-scope 3.1.0 の TypeScript peer dependency は `>=4.9 <6` です。このプロジェクトでは既存の TypeScript 6 を維持しているため、依存関係のインストール時に警告が出ます。導入時に lint の正常通過と範囲外 import の検出を確認していますが、TypeScript 6 はプラグインの公式対応範囲外です。
