"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { RegistrationForm } from "./RegistrationForm"

export function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      if (result?.error) {
        setError("ログインに失敗しました。メールアドレスまたはパスワードが正しくないか、まだ承認されていない可能性があります。")
      } else {
        window.location.href = window.location.origin
      }
    } catch (err) {
      setError("エラーが発生しました。")
    } finally {
      setLoading(false)
    }
  }

  if (mode === "signup") {
    return (
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-300">
        <RegistrationForm />
        <p className="text-center mt-6 text-sm text-gray-500">
          既にアカウントをお持ちですか？{" "}
          <button onClick={() => setMode("signin")} className="text-blue-600 font-bold hover:underline">
            ログインはこちら
          </button>
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md animate-in fade-in zoom-in duration-300">
      <div className="bg-white p-8 rounded-2xl shadow-xl ring-1 ring-gray-900/5">
        <h3 className="text-xl font-bold mb-8 text-gray-900 text-center">ログイン</h3>

        {/* Google Auth */}
        <button
          onClick={() => signIn("google", { callbackUrl: window.location.origin })}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-bold py-2.5 rounded-lg hover:bg-gray-50 transition mb-6"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.11 0 5.71-1.02 7.62-2.77l-3.57-2.77c-.99.66-2.25 1.05-4.05 1.05-3.11 0-5.75-2.1-6.69-4.93H1.72v2.84C3.63 20.31 7.52 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.31 13.58c-.24-.71-.38-1.46-.38-2.25s.14-1.54.38-2.25V6.24H1.72C.62 8.44 0 10.91 0 13.5s.62 5.06 1.72 7.26l3.59-2.84c-.24-.71-.38-1.46-.38-2.25z"
            />
            <path
              fill="#EA4335"
              d="M12 4.68c1.69 0 3.2.58 4.39 1.72l3.3-3.3C17.71 1.25 15.11 0 12 0 7.52 0 3.63 2.69 1.72 6.24L5.31 9.08c.94-2.83 3.58-4.93 6.69-4.93z"
            />
          </svg>
          Googleでログイン
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-400">Or use email</span>
          </div>
        </div>

        {/* Credentials Auth */}
        <form onSubmit={handleCredentialsSignIn} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tanaka@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white font-bold py-2.5 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-400 mt-2"
          >
            {loading ? "ログイン中..." : "ログイン"}
          </button>
        </form>
      </div>

      <p className="text-center mt-8 text-sm text-gray-500">
        アカウントをお持ちではありませんか？{" "}
        <button onClick={() => setMode("signup")} className="text-blue-600 font-bold hover:underline">
          アカウント作成申請
        </button>
      </p>
    </div>
  )
}
