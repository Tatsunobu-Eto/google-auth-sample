"use client"

import { useTransition } from "react"
import { handleRejectRegistration } from "@/frontend/actions/permissionActions"

type RegistrationRequest = {
  id: string
  name: string
  email: string
  updatedAt: Date
  expiresAt: Date | null
}

type Props = {
  requests: RegistrationRequest[]
}

export function AdminPendingVerificationList({ requests }: Props) {
  const [isPending, startTransition] = useTransition()

  const onDelete = (id: string) => {
    if (confirm("この申請を削除してもよろしいですか？ユーザーは再度申請が可能になります。")) {
      startTransition(async () => {
        await handleRejectRegistration(id)
      })
    }
  }

  if (requests.length === 0) {
    return (
      <div className="text-sm text-gray-500 bg-white p-4 rounded-lg border border-gray-100">
        現在、メール確認待ちの申請はありません。
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mt-4">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase">
          <tr>
            <th className="px-6 py-3">氏名 / メールアドレス</th>
            <th className="px-6 py-3">承認日</th>
            <th className="px-6 py-3 text-right">アクション</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {requests.map((req) => (
            <tr key={req.id}>
              <td className="px-6 py-4">
                <p className="font-medium text-gray-900">{req.name}</p>
                <p className="text-xs text-gray-500">{req.email}</p>
              </td>
              <td className="px-6 py-4 text-gray-500">
                {new Date(req.updatedAt).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onDelete(req.id)}
                  disabled={isPending}
                  className="text-red-600 hover:text-red-800 text-xs font-bold transition disabled:text-gray-300"
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
