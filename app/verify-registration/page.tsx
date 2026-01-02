import { auth } from "@/auth"
import { verifyRegistrationToken } from "@/serverside/services/permissionService"
import Link from "next/link"

export default async function VerifyRegistrationPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">無効なアクセス</h1>
        <p className="text-gray-500">トークンが見つかりません。メールのリンクを再度ご確認ください。</p>
        <Link href="/" className="mt-8 text-blue-600 font-bold hover:underline">
          ホームへ戻る
        </Link>
      </div>
    )
  }

  try {
    await verifyRegistrationToken(token)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">本登録が完了しました！</h1>
        <p className="text-gray-600 mb-8 text-lg">アカウントが有効化されました。ログインしてサービスをご利用いただけます。</p>
        <Link
          href="/"
          className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-200"
        >
          ログイン画面へ
        </Link>
      </div>
    )
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">登録に失敗しました</h1>
        <p className="text-gray-500 max-w-md">
          トークンが無効か、有効期限が切れている可能性があります。再度、管理者へお問い合わせいただくか、新規申請を行ってください。
        </p>
        <Link href="/" className="mt-8 text-blue-600 font-bold hover:underline">
          ホームへ戻る
        </Link>
      </div>
    )
  }
}
