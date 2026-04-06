---
title: honoの環境でlucide iconsは使えないのか?
date: 2025-2-18
---

## lucide iconが使えない。

ブログサイトのヘッダーの部分にlucide iconを採用する。

```typescript
import { useState, useEffect } from "hono/jsx";
import { Sun, Moon } from "lucide-react";

export default function Header() {
	const [dark, setDark] = useState(false);

	useEffect(() => {
		setDark(document.documentElement.classList.contains("dark"));
	}, []);

	const toggle = () => {
		const next = !dark;
		setDark(next);
		document.documentElement.classList.toggle("dark", next);
		localStorage.setItem("theme", next ? "dark" : "light");
	};

	return (
		<header class="border-b fixed top-0 left-0 right-0 z-10 px-32 py-6" style="border-color: var(--border)">
			<nav class="flex items-center justify-between">
				<a href="/" class="text-2xl no-underline --sans-en" style="color: var(--foreground)">
					KZ Creation Notes
				</a>
				<div class="flex items-center gap-6">
					<a href="/" class="text-sm font-medium hover:opacity-70 transition-opacity">
						Posts
					</a>
					<a href="/about" class="text-sm font-medium hover:opacity-70 transition-opacity">
						About
					</a>
					<button
						type="button"
						onClick={toggle}
						class="text-sm hover:opacity-70 transition-opacity cursor-pointer"
						aria-label="Toggle theme"
					>
					// ここ
            {dark ? <Moon /> : <Sun />}
					</button>
				</div>
			</nav>
		</header>
	);
}
```

これで開発環境を起動するとこうなった。

<img src="/photos/dcd671362671b52baffb827d2c8e164259f7d52b0f92264ba48e7b6465e2dc8b.png" alt="image" />

`<[object Object]>`と表示されてる。なんだこれは?

## 原因

