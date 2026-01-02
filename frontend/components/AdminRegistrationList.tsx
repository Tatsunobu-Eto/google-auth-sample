"use client"

import { useTransition } from "react"
import { handleApproveRegistration, handleRejectRegistration } from "@/frontend/actions/permissionActions"

type RegistrationRequest = {
  id: string
  name: string
  email: string
  createdAt: Date
}

type Props = {
  requests: RegistrationRequest[]
}

export function AdminRegistrationList({ requests }: Props) {
  const [isPending, startTransition] = useTransition()

  const onApprove = (id: string) => {
    startTransition(async () => {
      const result = await handleApproveRegistration(id)
      if (result.success) {
        alert("本登録用メールを送信しました（モック）。サーバーログをご確認ください。")
      }
    })
  }

  const onReject = (id: string) => {
    startTransition(async () => {
      await handleRejectRegistration(id)
    })
  }

  if (requests.length === 0) {
    return (
      <div className="text-sm text-gray-500 bg-white p-4 rounded-lg border border-gray-100">
        新規ユーザーの登録申請はありません。
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mt-4">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase">
          <tr>
            <th className="px-6 py-3">氏名 / メールアドレス</th>
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
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onApprove(req.id)}
                    disabled={isPending}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 disabled:bg-blue-300 transition"
                  >
                    承認
                  </button>
                  <button
                    onClick={() => onReject(req.id)}
                    disabled={isPending}
                    className="px-3 py-1 bg-red-50 text-red-600 rounded text-xs font-bold hover:bg-red-100 disabled:bg-red-100 transition"
                  >
                    却下
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
