import { auth } from "@/auth"
import { AdminRequestList } from "@/frontend/components/AdminRequestList"
import { AdminRegistrationList } from "@/frontend/components/AdminRegistrationList"
import { AdminPendingVerificationList } from "@/frontend/components/AdminPendingVerificationList"
import { getPendingRequests, getPendingRegistrationRequests, getPendingVerificationRequests } from "@/serverside/services/permissionService"
import { redirect } from "next/navigation"

export default async function ApprovalsPage() {
  const session = await auth()
  if (!session) redirect("/")

  const isSysAdmin = session.user.permissions.some((p) => p.role === "システム管理者")
  if (!isSysAdmin) {
    return (
      <div className="bg-red-50 p-8 rounded-2xl border border-red-100 text-center">
        <h2 className="text-xl font-bold text-red-900 mb-2">アクセス権限がありません</h2>
        <p className="text-red-700">このページはシステム管理者のみがアクセス可能です。</p>
      </div>
    )
  }

  const pendingRequests = await getPendingRequests()
  const pendingRegRequests = await getPendingRegistrationRequests()
  const pendingVerifications = await getPendingVerificationRequests()

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">承認管理</h1>
        <p className="text-gray-500">ユーザーからの権限申請や新規登録を承認または却下します</p>
      </header>

      {/* 1. 利用者登録の一次承認 */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">新規ユーザー登録申請</h2>
            <p className="text-sm text-gray-500">管理者の一次承認が必要です</p>
          </div>
        </div>
        <AdminRegistrationList requests={pendingRegRequests} />
      </section>

      {/* 2. メール確認待ち一覧 */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">メール確認待ち (一次承認済み)</h2>
            <p className="text-sm text-gray-500">ユーザーの本登録完了を待機しています</p>
          </div>
        </div>
        <AdminPendingVerificationList requests={pendingVerifications as any} />
      </section>

      {/* 3. サービスの利用申請 */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 3V7m0 14v-4m0 0a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">サービス利用権限の申請</h2>
            <p className="text-sm text-gray-500">各サービスへの権限付与リクエストです</p>
          </div>
        </div>
        <AdminRequestList requests={pendingRequests} />
      </section>
    </div>
  )
}
