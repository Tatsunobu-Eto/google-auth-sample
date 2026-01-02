"use client"

import { useState } from "react"
import { submitRegistration } from "@/frontend/actions/permissionActions"

export function RegistrationForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setLoading(true)
    setMessage("")
    const formData = new FormData(form)
    try {
      await submitRegistration(formData)
      setMessage("ユーザー登録申請を送信しました。管理者の承認をお待ちください。")
      form.reset()
    } catch (error: any) {
      console.error("REGISTRATION_FORM_ERROR:", error.message)
      // サーバー側で具体的なエラーを投げている場合はそれを表示
      if (error.message.includes("already registered")) {
        setMessage("エラー: このメールアドレスは既に登録されています。")
      } else if (error.message.includes("already exists")) {
        setMessage("エラー: このメールアドレスでの申請は既に受理され、承認待ちです。")
      } else {
        setMessage(`エラーが発生しました: ${error.message || "送信に失敗しました。"}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl ring-1 ring-gray-900/5 mt-8">
      <h3 className="text-xl font-bold mb-6 text-gray-900 text-center">新規ユーザー登録申請</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ユーザー名</label>
          <input
            name="name"
            type="text"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="田中 太郎"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="tanaka@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">パスワード</label>
          <input
            name="password"
            type="password"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white font-bold py-2.5 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-400 mt-2"
        >
          {loading ? "送信中..." : "利用を申請する"}
        </button>
        {message && (
          <p
            className={`text-sm text-center mt-4 p-3 rounded-lg ${
              message.includes("エラー") ? "bg-red-50 text-red-600 border border-red-100" : "bg-green-50 text-green-600 border border-green-100"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
