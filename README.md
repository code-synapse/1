# 文字読み上げアプリ

入力した文字をブラウザの Web Speech API で読み上げるシンプルなアプリです。

## 使い方

1. `index.html` をブラウザで開きます。
2. テキストエリアに文字を入力します。
3. 音声・速度・高さを調整します。
4. **読み上げる** を押します。

## ローカル起動

```bash
python3 -m http.server 8000
```

起動後、`http://localhost:8000` にアクセスしてください。

## デプロイ（GitHub Pages）

このリポジトリには GitHub Pages への自動デプロイ用ワークフローを追加しています。  
`main` / `master` / `work` ブランチへの push、または手動実行で公開されます。

### 手順

1. GitHub リポジトリの **Settings > Pages** を開く。
2. **Build and deployment** の Source を **GitHub Actions** に設定する。
3. 対象ブランチへ push する（または Actions から `Deploy static site to GitHub Pages` を手動実行）。
4. Actions 完了後、公開 URL（`https://<user>.github.io/<repo>/`）へアクセスする。
