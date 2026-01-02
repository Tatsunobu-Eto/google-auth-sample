"use client"

import { useTransition } from "react"
import { handleApprove, handleReject } from "@/frontend/actions/permissionActions"

type Request = {
  id: string
  user: { name: string | null; email: string | null }
  service: { name: string }
  role: { name: string }
  createdAt: Date
}

type Props = {
  requests: Request[]
}

export function AdminRequestList({ requests }: Props) {
  const [isPending, startTransition] = useTransition()

  const onApprove = (id: string) => {
    startTransition(async () => {
      await handleApprove(id)
    })
  }

  const onReject = (id: string) => {
    startTransition(async () => {
      await handleReject(id)
    })
  }

  if (requests.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl border border-gray-100 text-center text-gray-500">
        保留中の申請はありません。
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase">
          <tr>
            <th className="px-6 py-4">ユーザー</th>
            <th className="px-6 py-4">サービス / 希望権限</th>
            <th className="px-6 py-4">申請日</th>
            <th className="px-6 py-4 text-right">アクション</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {requests.map((req) => (
            <tr key={req.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4">
                <p className="font-medium text-gray-900">{req.user.name || "不明"}</p>
                <p className="text-xs text-gray-500">{req.user.email}</p>
              </td>
              <td className="px-6 py-4">
                <span className="font-medium text-gray-700">{req.service.name}</span>
                <span className="mx-2 text-gray-300">/</span>
                <span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded text-xs">
                  {req.role.name}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500">
                {new Date(req.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onApprove(req.id)}
                    disabled={isPending}
                    className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition text-xs font-bold disabled:bg-green-300"
                  >
                    承認
                  </button>
                  <button
                    onClick={() => onReject(req.id)}
                    disabled={isPending}
                    className="px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition text-xs font-bold disabled:bg-red-100 disabled:text-red-300"
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
