# CHANGELOG

## 2026-04-04 — Initial migration from SvelteKit to Next.js (React)

### 概要
`kz-creation-svelte` プロジェクトを SvelteKit 2 + Svelte 5 から Next.js 16 + React 19 に移行。

### 技術スタック変更
| 変更前 | 変更後 |
|---|---|
| SvelteKit 2 | Next.js 16.2.2 (App Router) |
| Svelte 5 | React 19 |
| `@threlte/core` + `@threlte/extras` | `@react-three/fiber` + `@react-three/drei` |
| mdsvex | `next-mdx-remote/rsc` + `gray-matter` |
| `@lucide/svelte` | `lucide-react`（未使用のため未インポート） |
| Svelte 5 runes (`$state`) | React `useState` / `useRef` |
| `import.meta.glob()` | `fs.readdirSync()` (Server Component) |

### 新規作成ファイル一覧
- `app/layout.tsx` — ルートレイアウト（TypeKit、Three.js背景、Loading、Footer）
- `app/page.tsx` — Home ページ
- `app/about/page.tsx` — About ページ
- `app/contact/page.tsx` — Contact ページ
- `app/lab/page.tsx` — Lab (Works) ページ
- `app/notes/page.tsx` — Notes 一覧ページ（SSG、fs で markdown 読み込み）
- `app/notes/[slug]/page.tsx` — Notes 個別ページ（MDXRemote RSC）
- `app/globals.css` — Tailwind CSS 4 + カスタムテーマ（Svelte版から移植）
- `components/three/ThreeBackground.tsx` — R3F Canvas ラッパー
- `components/three/Scene.tsx` — Three.js シーン構成
- `components/three/CameraRig.tsx` — マウス追従カメラ（maath.easing.damp3）
- `components/three/Stars.tsx` — 500個の Octahedron 星フィールド
- `components/three/Sun.tsx` — Icosahedron ワイヤーフレーム太陽
- `components/three/OrbitRing.tsx` — Torus 軌道リング
- `components/layouts/Menu.tsx` — ナビゲーション（usePathname でアクティブ判定）
- `components/layouts/Footer.tsx` — フッター
- `components/layouts/Loading.tsx` — GSAP ローディングアニメーション
- `components/layouts/TitleCard.tsx` — Notes 一覧カード
- `components/layouts/ContactForm.tsx` — Google Apps Script コンタクトフォーム
- `components/layouts/PageTransition.tsx` — パス変更時の CSS フェード遷移
- `components/layouts/TypekitLoader.tsx` — Adobe Fonts (TypeKit) スクリプトローダー
- `components/animations/FadeBlob.tsx` — GSAP ホバーアニメーションリンク
- `components/animations/ScrollProgress.tsx` — スクロール進捗インジケーター
- `components/ui/button.tsx` — tailwind-variants ボタン
- `components/ui/input.tsx` — フォーム Input
- `components/ui/textarea.tsx` — フォーム Textarea
- `lib/utils.ts` — cn ユーティリティ
- `lib/types.ts` — Post 型
- `lib/formatDate.ts` — 日付フォーマット
- `lib/contents/works.ts` — Works データ
- `lib/contents/profile.ts` — SNS リンクデータ
- `lib/contents/posts/` — Markdown ポスト（Svelte版からコピー）
