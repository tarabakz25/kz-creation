# CHANGELOG

## 2026-02-24 (2)

### fix: Header の backdrop-blur が本文を貫通する問題を修正

**原因:**
`motion.div`（PageMigration）の opacity アニメーション中は `opacity < 1` となり、新しいスタッキングコンテキストが生成される。
`fixed` + `backdrop-filter` を持つ Header がそのコンテキスト内にあると、backdrop-filter がコンテキスト境界を越えられずブラーが機能しない。

**変更内容:**
- `[id].astro`: `<Header>` を `<PageMigration>` の外（上位）に移動し `client:load` を付与

---

### fix: 記事ページのレイアウト崩れ・スクロール率が反映されない問題を修正

**原因:**
1. `Content.tsx` の `article` に `flex` はあるが `flex-col` がなく、子要素が横並びになっていた
2. `[id].astro` の `<Content>` に `client:load` がなく、React の `useEffect` が一切動作しない（= スクロールリスナー未登録）
3. `main` に `prose` クラス（znc と競合）と意味のない `flex justify-between` が混在

**変更内容:**
- `Content.tsx`: `flex flex-col items-center` に修正、`ref` をスクロールコンテナである `article` に移動、`useRef` 型を `HTMLElement` に変更、コンテンツ幅を `max-w-2xl` で制限
- `[id].astro`: `<Content client:load />` を追加、`main` の不要クラスを除去

---

## 2026-02-24

### fix: Tailwind CSS v4への移行・依存パッケージの修正

**背景:**
`global.css`がTailwind v4構文（`@import "tailwindcss"`, `@theme {}`）に更新済みだったが、
`package.json`はv3（`tailwindcss@3.4.19` + `@astrojs/tailwind`）のままで矛盾状態だった。

**変更内容:**
- `tailwindcss@3` + `@astrojs/tailwind` を削除
- `tailwindcss@4` + `@tailwindcss/vite` をインストール
- `astro.config.mjs`: `integrations: [tailwind()]` → `vite.plugins: [tailwindcss()]` に変更
- `@tailwindcss/typography` 削除（prosestyleはglobal.cssに直接定義済みのため不要）
- 未インストールだった依存を追加:
  - `node-html-parser` (API route `/api/blog/[id].json.ts` で使用)
  - `markdown-it`, `@types/markdown-it`
  - `markdown-it-anchor`, `markdown-it-container`, `markdown-it-footnote`, `markdown-it-task-lists`
