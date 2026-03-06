---
title: honoX + Tailwindcss環境のブログサイトでAdobe Fontsを読み込みたい
date: 2025-2-17
---

## 始めに

Webサイトを作るうえで、自分はよくAdobe Fontsを採用しているが、
honoX + Tailwindcss環境でのフォント呼び出しに結構手間がかかった。

## 試したこと

### 1. unplugin-fontを使う

[[https://github.com/cssninjaStudio/unplugin-fonts]]

様々なフォントローダーとプロジェクトをシームレスに統合できるツールらしい。

実装したものの、adobe fontsではerror 412で衝突して、うまく表示されなかった。

### 2. Linkタグで埋め込む

`<Link href="https://use.typekit.net/vza3sdw.css" rel="stylesheet" />`

おそらくReactではデフォルトの書き方? しかしこれも error 412で衝突。

### 3. Adobe Fontsプロジェクト上のコードを埋め込み。

<img src="/photos/8f9deda712291d11f49e80404cae6e5a87420afbb609afa0f1755310fbbb8c4e.png" alt="Adobe Fontsのコード" />

今度は `Cross-Origin Request Blocked` でエラーが発生。 なんでなん? 🤔

と、思ったら普通にglobal.cssでbodyにfont-familyを指定したら反映された。

`font-family: "avenir-next-lt-pro", "dnp-shuei-gothic-gin-std", sans-serif;`

## Tailwindcss風に書けるようにしたい

反映されたは良いものの、Tailwindcssを使ってるので、`--sans-jp`みたくclassで割り当てたい。

実装はシンプルで、

```
@theme {
  --font-sans-en: "avenir-next-lt-pro", sans-serif;
  --font-sans-jp: "dnp-shuei-gothic-gin-std", sans-serif;
}
```

これでclassに指定できるようになった。

## Error 412とは?

どの方法の実装を試しても、typekitを呼び出す際に、クライアント側で`error 412`が発生する。

ネット上で同じような現象がないか探したが、見つからず。
