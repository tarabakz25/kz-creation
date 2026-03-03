# CHANGELOG

## [Unreleased] - 2026-03-03

### Added
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
