# Feature-Sliced Design (FSD) Architecture

このプロジェクトは Feature-Sliced Design (FSD) アーキテクチャに基づいて構成されています。

## ディレクトリ構造

```
src/
├── features/          # ビジネス機能・フィーチャー
│   ├── app/          # アプリケーションのコア機能
│   │   ├── App.tsx
│   │   └── navigationContext.tsx
│   ├── about/        # Aboutページ
│   │   └── index.tsx
│   ├── blog/         # ブログ機能
│   │   ├── components/
│   │   │   ├── BlogCard.tsx
│   │   │   └── BlogList.tsx
│   │   ├── layouts/
│   │   │   └── Layout.astro
│   │   ├── index.tsx
│   │   └── rss.xml.ts
│   ├── contact/      # Contactページ
│   │   └── index.tsx
│   ├── index/        # ホームページ
│   │   └── index.tsx
│   └── lab/          # Labページ
│       └── index.tsx
├── pages/            # Astroのルーティング
│   ├── [...slug].astro
│   └── index.astro
├── shared/           # 共有リソース
│   ├── layouts/
│   │   └── Layout.astro
│   └── ui/           # 共有UIコンポーネント
│       ├── Header.tsx
│       └── Footer.tsx
├── content/          # Astro Content Collections
└── styles/           # グローバルスタイル
```

## レイヤーの説明

### Features Layer (`src/features/`)

ビジネス機能ごとに分割されたモジュールです。各フィーチャーは独立しており、他のフィーチャーに直接依存しません。

- **app/**: アプリケーションのコア機能（ナビゲーション、グローバルステート等）
- **about/**: Aboutページの機能
- **blog/**: ブログ関連の全機能（コンポーネント、レイアウト、RSS等）
- **contact/**: Contactページの機能
- **index/**: ホームページの機能
- **lab/**: Labページの機能

### Pages Layer (`src/pages/`)

Astroのファイルベースルーティングを担当します。ページはフィーチャーを組み合わせて表示します。

### Shared Layer (`src/shared/`)

プロジェクト全体で再利用可能なコードです。

- **layouts/**: 基本的なレイアウトコンポーネント
- **ui/**: 共有UIコンポーネント（Header、Footer等）

## インポートルール

### パスエイリアス

`tsconfig.json`で`~/`を`./src/`にマッピングしています。

```typescript
// ✅ Good
import Layout from "~/shared/layouts/Layout.astro";
import AboutPage from "~/features/about";

// ❌ Bad
import Layout from "../../../shared/layouts/Layout.astro";
```

### レイヤー間の依存関係

FSDの基本ルール：
- **下位レイヤーは上位レイヤーに依存できない**
- **同じレイヤー内のモジュール間は依存しない**

```
pages → features → shared
```

```typescript
// ✅ features can import from shared
import Header from "~/shared/ui/Header";

// ✅ pages can import from features
import App from "~/features/app/App";

// ❌ shared cannot import from features
import BlogCard from "~/features/blog/components/BlogCard"; // Bad!
```

## フィーチャーの構成

各フィーチャーは以下のような構造を持つことができます：

```
features/blog/
├── components/       # フィーチャー固有のコンポーネント
│   ├── BlogCard.tsx
│   └── BlogList.tsx
├── layouts/         # フィーチャー固有のレイアウト
│   └── Layout.astro
├── index.tsx        # フィーチャーのエントリーポイント
└── rss.xml.ts       # その他の機能
```

## ベストプラクティス

1. **機能ごとに分離**: 各フィーチャーは独立した機能単位で分割します
2. **共有は最小限に**: 本当に共有する必要があるものだけを`shared/`に配置します
3. **明確なエクスポート**: 各フィーチャーは`index.tsx`で公開するAPIを明示的にエクスポートします
4. **型の共有**: 複数のフィーチャーで使う型定義は`shared/types/`に配置できます（必要に応じて）

## 移行の主な変更点

### Before (従来の構造)
```
src/
├── components/
│   └── layouts/
│       ├── header.tsx
│       └── footer.tsx
├── layouts/
│   └── Layout.astro
└── pages/
```

### After (FSD構造)
```
src/
├── features/          # NEW: 機能ごとに分割
│   ├── app/
│   ├── about/
│   ├── blog/
│   ├── contact/
│   ├── index/
│   └── lab/
├── shared/           # MOVED: componentsから移動
│   ├── layouts/
│   └── ui/          # RENAMED: layouts → ui
└── pages/
```

### 主な変更内容

1. `src/components/layouts/` → `src/shared/ui/`
   - より明確な命名に変更
   - FSDの標準的な構造に準拠

2. `src/layouts/Layout.astro` → `src/shared/layouts/Layout.astro`
   - sharedレイヤーに移動

3. 各ページの機能を`features/`配下に分離
   - about, blog, contact, index, labなど

4. インポートパスの更新
   - `~/layouts/Layout.astro` → `~/shared/layouts/Layout.astro`
   - `~/components/layouts/header` → `~/shared/ui/Header`

## 参考リンク

- [Feature-Sliced Design 公式ドキュメント](https://feature-sliced.design/)
- [FSD - Best Practices](https://feature-sliced.design/docs/guides/tech/with-astro)