import { auth } from "@/auth"
import { AuthForm } from "@/frontend/components/AuthForm"

export default async function Home() {
  const session = await auth()

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
            <span className="text-white font-bold text-3xl">P</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Portalへようこそ</h2>
          <p className="text-gray-500 mt-2">サービスポータルをご利用いただくにはログインが必要です</p>
        </div>

        <AuthForm />
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">ホーム</h1>
        <p className="text-gray-500">サービスポータルの最新情報</p>
      </header>

      <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
            />
          </svg>
          重要なお知らせ
        </h2>

        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4 py-1">
            <p className="text-xs text-gray-400 font-medium uppercase mb-1">2026.01.03</p>
            <h3 className="text-lg font-bold text-gray-900 mb-1">新ポータルサイトを公開しました</h3>
            <p className="text-gray-600 leading-relaxed">
              Google認証、権限申請、承認機能を集約した新しい社内ポータルサイトを公開しました。
              左側のメニューから各機能へアクセスいただけます。
            </p>
          </div>

          <div className="border-l-4 border-gray-200 pl-4 py-1">
            <p className="text-xs text-gray-400 font-medium uppercase mb-1">2026.01.02</p>
            <h3 className="text-lg font-bold text-gray-900 mb-1">システムメンテナンスのお知らせ</h3>
            <p className="text-gray-600 leading-relaxed">
              来週末、データベースエンジンのアップデートに伴うメンテナンスを実施します。
              詳細は後日改めてご案内いたします。
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
          <h3 className="font-bold text-lg mb-2">権限申請</h3>
          <p className="text-blue-100 text-sm mb-6">新しいサービスへのアクセスが必要な場合はこちらから申請してください。</p>
          <a href="/requests" className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition">
            申請フォームへ
          </a>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 text-white">
          <h3 className="font-bold text-lg mb-2">保有権限</h3>
          <p className="text-gray-400 text-sm mb-6">現在あなたが利用可能なサービスはサイドメニューからご確認いただけます。</p>
          <div className="text-xs font-mono bg-gray-800 p-2 rounded">Total Roles: {session.user.permissions.length}</div>
        </div>
      </section>
    </div>
  )
}
