# セットアップ手順書 (Tailwind CSS 版)

このプロジェクトの構築に使用したコマンドと手順です。
既存の `.env.local` や `doc` フォルダを維持したまま、Next.js プロジェクトを作成する手順を含みます。

## 1. Next.js プロジェクトの作成 (一時フォルダ経由)

既存ファイルとの競合を避けるため、一時フォルダ `tmp_app` に作成してから移動します。
Tailwind CSS を有効にしています。

```bash
# 一時フォルダにNext.jsアプリを作成
npx create-next-app@latest tmp_app --typescript --eslint --tailwind --no-src-dir --app --import-alias "@/*" --use-npm
```

## 2. ファイルの移動

PowerShell コマンドを使用して、作成したファイルをルートディレクトリに移動します。

```powershell
# 通常ファイルの移動
Get-ChildItem tmp_app | Move-Item -Destination . -Force

# ドットファイル (.gitignoreなど) の移動
Get-ChildItem tmp_app -Hidden | Move-Item -Destination . -Force

# 一時フォルダの削除
Remove-Item tmp_app -Force
```

## 3. 依存関係のインストール

NextAuth.js (v5 beta) をインストールします。

```bash
npm install next-auth@beta
```
