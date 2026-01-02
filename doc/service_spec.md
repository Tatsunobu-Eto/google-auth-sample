# サービス・アクション仕様書 (Service & Action Specifications)

本プロジェクトの主要なビジネスロジック（Service）と、クライアントから呼び出される操作（Server Actions）の仕様です。

## 1. Permission Service (`serverside/services/permissionService.ts`)

データベース操作を伴うビジネスロジックの実装層です。

### 権限検証系
- **`getUserPermissions(userId: string)`**
    - ユーザーの全保有権限（サービス名とロール名のペア）を配列で返します。
- **`hasPermission(userId, serviceName, roleName?)`**
    - ユーザーが指定の権限を持っているか判定します。
    - ※システム管理者ロールを持つユーザーは、常に `true` を返します。

### 登録・申請フロー系
- **`createRegistrationRequest(data)`**
    - 新規ユーザーの登録申請を作成します（パスワードをハッシュ化して保存）。
- **`approveRegistration(requestId)`**
    - 登録申請を承認し、本登録用トークンを発行。メール送信サービスを呼び出します。
- **`verifyRegistrationToken(token)`**
    - トークンを検証し、成功すれば User テーブルに正規ユーザーを作成、申請データを削除します。
- **`approveRequest(requestId)`**
    - 権限利用申請を承認し、UserPermission テーブルを更新します（トランザクション処理）。

### 管理系
- **`promoteToSystemAdmin(email)`**
    - 指定したメールアドレスのユーザーを、全サービスに対する「システム管理者」に昇格させます。
- **`getAllUsers()`**
    - 全ユーザーとそれぞれの保有権限を一覧で取得します。

## 2. Server Actions (`frontend/actions/permissionActions.ts`)

UIコンポーネントから直接呼び出される非同期関数群です。

### アカウント操作
- **`submitRegistration(formData)`**
    - 登録フォームからの入力を受け取り、申請を作成します。
- **`handleApproveRegistration(requestId)`**
    - 【管理者専用】登録申請を承認します。
- **`handleDeleteUser(userId)`**
    - 【管理者専用】ユーザーを削除し、一覧を再検証（revalidate）します。

### 権限操作
- **`submitRequest(serviceId, roleId)`**
    - ログインユーザーが自分自身の権限申請を送信します（二重申請チェック付き）。
- **`handleApprove(requestId)`**
    - 【管理者専用】権限申請を承認し、画面を更新します。
- **`handleReject(requestId)`**
    - 【管理者専用】権限申請を却下します。

## 3. 型定義 (`serverside/types/index.ts`)

システム全体で共通利用される型定義です。

- **`UserPermissionInfo`**: `{ service: string; role: string; }`
- **`SessionUser`**: NextAuth のセッションに含まれるユーザー情報の構造
- **`PermissionRequestWithDetails`**: ユーザー、サービス、ロール情報を含む申請データ
- **`UserWithPermissions`**: 権限情報が付随したユーザーデータ
