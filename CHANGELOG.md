# CHANGELOG

## [Unreleased] - 2026-04-06

### Refactored (SvelteKit → Vite + React)
- フレームワーク全体を SvelteKit から Vite + React (React Router v7) に移行
- 全 `.svelte` コンポーネントを `.tsx` に書き直し
- `@threlte/core` / `@threlte/extras` → `@react-three/fiber` + `@react-three/drei` に置き換え
- `svelte/transition` ページ遷移 → `framer-motion` (`AnimatePresence`) に置き換え
- `$app/state` (page store) → `useLocation()` に置き換え
- `mdsvex` Markdown レンダリング → `react-markdown` + `gray-matter` に置き換え
- SvelteKit file-based routing → React Router の `<Routes>` で手動定義
- `src/routes/` ディレクトリを廃止、`src/pages/` に移行
- `src/main.tsx` + `src/App.tsx` をエントリーポイントとして新規作成
- `index.html` を React 用に更新（`%sveltekit.body%` → `<div id="root">`）
- `tsconfig.json` を SvelteKit 依存から独立した React 用設定に更新
- 不要ファイル削除: `svelte.config.js`, `next-env.d.ts`, `src/app.d.ts`, `src/app.html`

## [Unreleased] - 2026-03-06

### Refactored
- `notes/+page.ts`: `fetch('/api/posts')` 経由を廃止し、`import.meta.glob` で直接 Markdown を読み込むように変更
- `notes/+page.server.ts`: 誤配置の `GET` エクスポートを削除（`+page.server.ts` には置けない）
- `src/routes/api/posts/+server.ts`: 不要になった API エンドポイントを削除

## [Unreleased] - 2026-03-05

### Added
- `+layout.svelte`: `app.css` をグローバルインポートし、Tailwind を全ページに適用
- `+layout.svelte`: Threlte の three 背景（`ThreeBackground`）を全ページ共通で表示
- `+layout.svelte`: `/blog` 配下では three 背景を非表示にする条件分岐（ブログは SPA 外想定）
- コンテンツラッパーに `relative z-10` を付与し、three 背景の前面に表示

### Changed
- `three/Index.svelte`: `-z-5` → `-z-10`（Tailwind 標準クラスに統一）
- `+layout.svelte`: 未使用の `navigating` インポートを削除

### Added (2026-03-03 以前)
- `@tailwindcss/vite` プラグインをインストール・vite.config.ts に追加（Tailwind v4 動作に必須）
- `gsap` をインストール（FadeBlob アニメーション用）
- `Menu.svelte` を新規実装（ナビゲーションリンク、現在パスのハイライト付き）
- `Sun.svelte` / `OrbitRing.svelte` のスタブコンポーネントを作成

### Fixed
- `+layout.svelte`: Svelte 4 の `<slot />` → Svelte 5 の `{@render children()}`
- `+layout.svelte`: `$app/state` の `page` は store ではないため `$page` → `page`
- `navigation.ts`: `get(page)` → `page.url.pathname`（同上）
- `about/+page.svelte`: `export const socials` → `const socials`、`MenuItem` → `Menu`（インポート追加）
- `contact/+page.svelte`: `ContactForm` のインポートを追加
- `ContactForm.svelte`: Svelte 4 `on:submit` → Svelte 5 `onsubmit`、インポートパス `~/shared/...` → `$lib/components/ui/...`、`sonner` 依存を除去しステート管理に置換
- `Stars.svelte`: `T` のインポートが欠落していたため追加
- `CameraRig.svelte`: threlte v8 では `useThrelte()` に `pointer` がないため、window mousemove イベントで代替
- `Scene.svelte`: 存在しない `Sun.svelte` / `OrbitRing.svelte` のインポートエラーを解消
- `FadeBlob.svelte`: Svelte 4 props・`on:click`・`<slot />` → Svelte 5 対応
- `lab/+page.svelte`: `worksData` のインポート追加、`ImageMetadata` 型を `string` に修正
