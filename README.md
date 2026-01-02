# Google Auth Sample (Next.js + Tailwind CSS)

Next.js (App Router), NextAuth.js (v5), Tailwind CSS を使用した Google 認証のサンプルアプリケーションです。

## 機能

*   **Google アカウントでのログイン**: NextAuth.js を使用。
*   **セッション管理**: ログイン状態の永続化と、サーバー/クライアントサイドでの状態取得。
*   **モダンな UI**: Tailwind CSS を使用したレスポンシブでクリーンなデザイン。
*   **ユーザー情報表示**: ログインユーザーのアイコンと名前を表示。

## 使用技術

*   [Next.js](https://nextjs.org/) 15+ (App Router)
*   [NextAuth.js](https://authjs.dev/) v5 (Beta)
*   [Tailwind CSS](https://tailwindcss.com/)
*   TypeScript

## セットアップ手順

1.  **リポジトリのクローン**
    ```bash
    git clone <repository-url>
    cd google-auth-sample
    npm install
    ```

2.  **環境変数の設定**
    `.env.local` ファイルをルートディレクトリに作成し、以下の値を設定してください。
    
    ```env
    AUTH_SECRET="your-generated-secret" # npx auth secret で生成可能
    AUTH_GOOGLE_ID="your-google-client-id"
    AUTH_GOOGLE_SECRET="your-google-client-secret"
    ```
    
    *   Google Cloud Console で OAuth 2.0 クライアントを作成し、リダイレクト URI に `http://localhost:3000/api/auth/callback/google` を設定してください。

3.  **開発サーバーの起動**
    ```bash
    npm run dev
    ```
    http://localhost:3000 にアクセスします。

## ディレクトリ構成

*   `app/`: アプリケーションのコード
    *   `api/auth/`: NextAuth 用の API ルート
*   `components/`: UI コンポーネント (SignIn/SignOut ボタンなど)
*   `auth.ts`: NextAuth の設定ファイル
*   `doc/`: 開発ドキュメント (セットアップ手順、アーキテクチャ図など)
