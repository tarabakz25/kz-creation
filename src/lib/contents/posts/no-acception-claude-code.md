---
title: Claude Codeで、安全に最小限の確認で回したい
date: 2026-02-24
---

# はじめに

Claude sonnet 4.6が登場してから、より一層Claude Codeを使うようになった。
色々なアプリを並列で開発していく中で、一つ問題が発生したのでそれを解決する。

# Claude Codeで、モードを`accept edits on`にしてもいっぱい聞いてくる

Web開発をしていると、Plan → Accept edits on の段階でPlaywrightによるテストが入るが、
そのたびに

```
⏺ plugin:playwright:playwright - Navigate to a URL (MCP)(url: "https://example.com")
  ⎿  Running…

───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 Tool use

   plugin:playwright:playwright - Navigate to a URL(url: "https://example.com") (MCP)
   Navigate to a URL

 Do you want to proceed?
 ❯ 1. Yes
   2. Yes, and don't ask again for plugin:playwright:playwright - Navigate to a URL commands in /Users/kz/Projects/apps/web
   3. No
```

といった感じで聞いてくる。

これ自体は別に問題ないが、これが数十回連続で起きるので度々確認しに行くのは時間がかかる

# 解決法

Claude Code自体に、**全てのコマンドに対するユーザー確認を無視する**引数が存在する。

```bash
 claude --dangerously-skip-permissions
```

しかしこれを使うと、`rm -rf` や `chmod` といった強い権限が使われるリスクがある。

## ~/.claude/settings.json

これを解決するために、`~/.claude/settings.json` に色々記述することで安全に上記コマンドを使うことが可能になる。

```json
{
  "permissions": {
    // 基本拒否するコマンドを羅列
    "deny": [
      "Bash(rm -rf /*)",
      "Bash(rm -rf ~/*)",
      "Bash(rm -rf $HOME/*)",
      "Bash(sudo *)",
      "Bash(su *)",
      "Bash(git config *)",
      "Bash(brew install *)",
      "Bash(chmod 777 *)",
      "Bash(chmod -R 777 /*)",
      "Bash(dd *)",
      "Bash(mkfs *)",
      "Bash(shutdown *)",
      "Bash(reboot *)",
      "Bash(curl * | bash)",
      "Bash(wget * | bash)",
      "Bash(curl * | sh)",
      "Bash(wget * | sh)",
      "Bash(gh repo delete *)"
    ]
  }
}
```

こうすることで、危険なコマンドは勝手にスキップされるので、安全にバイパスモードを回すことができる。