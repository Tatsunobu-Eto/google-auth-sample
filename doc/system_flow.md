# システムフロー (System Flows)

本プロジェクトにおける主要な業務フローについて解説します。

## 1. アカウント登録フロー (Account Registration)

新規ユーザーがアカウントを作成し、管理者が承認するまでの流れです。

```mermaid
sequenceDiagram
    participant User as 未登録ユーザー
    participant App as 画面 (RegistrationForm)
    participant Action as Server Action
    participant DB as データベース (RegistrationRequest)
    participant Admin as 管理者
    participant Mail as メールサーバー

    User->>App: 氏名・メール・パスワード入力
    App->>Action: submitRegistration()
    Action->>DB: 申請データを保存 (Status: PENDING)
    Note right of DB: RegistrationRequestテーブル

    Admin->>App: 管理画面で申請を確認
    Admin->>App: 「承認」をクリック
    App->>Action: handleApproveRegistration()
    Action->>DB: Token生成, Status: APPROVED に更新
    Action->>Mail: 本登録用URLを送信
    Mail-->>User: メール着信

    User->>App: メール内のURLをクリック
    App->>Action: verifyRegistrationToken(token)
    Action->>DB: Token有効性チェック
    Action->>DB: Userテーブルにデータ作成
    Action->>DB: 申請データを削除
    User->>App: 登録完了 (ログイン可能に)
```

## 2. 権限利用申請フロー (Permission Request)

ログイン済みユーザーが、特定のサービスの権限（ロール）を申請する流れです。

```mermaid
sequenceDiagram
    participant User as ログインユーザー
    participant App as 画面 (RequestForm)
    participant Action as Server Action
    participant DB as データベース (PermissionRequest / UserPermission)
    participant Admin as 管理者

    User->>App: サービスとロールを選択して申請
    App->>Action: submitRequest()
    Action->>DB: 申請データを保存 (Status: PENDING)

    Admin->>App: 管理画面で権限申請を確認
    Admin->>App: 「承認」をクリック
    App->>Action: handleApprove()
    Action->>DB: トランザクション開始
    Action->>DB: PermissionRequest Status: APPROVED
    Action->>DB: UserPermission を更新 (upsert)
    Action->>DB: トランザクション終了

    User->>App: 次回ログイン/ページ遷移時に権限が有効化
```

## 3. 認証・認可フロー (Auth & Authorization)

NextAuth によるセッション管理と、取得した権限情報の利用フローです。

```mermaid
sequenceDiagram
    participant Browser as ブラウザ
    participant NextAuth as Auth.js (Middleware/Callback)
    participant Service as PermissionService
    participant DB as データベース
    participant Page as アプリ画面 (Page/Action)

    Browser->>NextAuth: リクエスト (Cookie同封)
    NextAuth->>Service: getUserPermissions(userId)
    Service->>DB: UserPermissionテーブル取得
    DB-->>Service: 権限一覧
    Service-->>NextAuth: [{service, role}, ...]
    NextAuth-->>NextAuth: セッション(JWT)に権限情報を埋め込む

    Note over Browser, Page: アプリケーション内での利用
    Page->>Service: hasPermission(userId, "在庫管理", "管理者")
    Service-->>Page: true / false
    Page-->>Browser: 権限に応じた表示 / 処理実行
```
