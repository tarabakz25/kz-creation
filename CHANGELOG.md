## 2026-02-28

### ポートフォリオサイト統合

- ポートフォリオ（tarabakz25/kz-creation-portfolio）とブログサイトを統合。SvelteKit ベースを維持しつつ、ポートフォリオのビジュアルデザインを全面採用
- **デザインシステム刷新**: 背景色を `#121212`、フォント `futura-pt` / `avenir-next-lt-pro` / `dnp-shuei-gothic-gin-std` に統一。Adobe Typekit kit を `vza3sdw` に更新
- **Three.js スター背景**: `ThreeBackground.svelte` を新規作成。500個の stars, wireframe icosahedron (sun), orbit ring, マウス追従カメラ を実装
- **グリッドパターン背景**: CSS linear-gradient によるサブタイルグリッドをレイアウトに追加
- **GSAP FadeBlob ナビゲーション**: `MenuItem.svelte` を新規作成。Svelte action で GSAP アニメーション（ドット出現 + テキストスライド）を実装。全ページに共通ナビとして配置
- **トップページ**: ポートフォリオの two-column full-screen レイアウトに変更。左: タイトル + ナビ、右: キャッチコピー
- **About ページ**: ポートフォリオスタイルに刷新。左: ナビ、右: プロフィール / スキルスタック / SNSリンク
- **Lab ページ新規追加** (`/lab`): Works ショーケース。右側スクロールリスト + モーダルポップアップ。`works.json` とポートフォリオの作品画像を移植
- **Contact ページ新規追加** (`/contact`): SNS リンク + メールアドレス
- **Notes ページ**: ポートフォリオレイアウトに合わせて two-column に変更。TitleCard も右寄せスタイルに更新
- **記事詳細ページ**: 左サイドにナビを配置するレイアウトに変更
- **vite.config.ts 分離**: vitest 設定を `vitest.config.ts` に分離し、`vite.config.ts` をシンプル化（bun + esbuild EPIPE 問題を解消）
- **package.json スクリプト修正**: `bun run dev` でEPIPEが発生する問題を回避するため `node node_modules/.bin/vite` を明示的に使用
- `three`, `gsap`, `@types/three` を追加。`works.json` と作品画像 (`static/images/works/`) を追加

## 2026-02-26

- レイアウト構造を route group で分離: トップページ (`/`) では Header/Footer を非表示、その他のページ (`/notes`, `/about`, `/admin`) では表示するよう対応。root layout は Typekit + CSS のみに、`(top)/` グループはヘッダーなし、`(app)/` グループに Header/Footer を配置し、各ルートを移動。

- 記事一覧のソートロジックを修正: `new Date(dateStr)` の代わりに年月日を分割してパースすることで、`2025-2-18` のようなゼロパディングなし日付でも正確にソートされるよう対応。新しい順（降順）を維持。



- タイポグラフィのグローバル統一: `layout.css` で `--font-sans` を定義し、`body` に適用。各コンポーネントの場当たり的なフォントクラス指定を削除。
- レイアウトと余白の共通化: サイト全体のコンテンツの最大幅を `max-w-3xl` に統一し、中央揃え (`mx-auto`) と左右のパディング (`px-6`) を共通化。ヘッダーとフッターもメインコンテンツの幅に合わせて調整。

## 2026-02-25

- Fix root page load to use SvelteKit `event.fetch` instead of global `fetch` for `/api/posts`.
- Fix `/api/posts` route to use a valid `GET` export and clean up Markdown post import logic.
