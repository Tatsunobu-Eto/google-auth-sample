"use client"

import { useTransition } from "react"
import { handleDeleteUser } from "@/frontend/actions/permissionActions"

type User = {
  id: string
  name: string | null
  email: string | null
  permissions: {
    service: { name: string }
    role: { name: string }
  }[]
}

type Props = {
  users: User[]
}

export function AdminUserList({ users }: Props) {
  const [isPending, startTransition] = useTransition()

  const onDelete = (id: string, email: string) => {
    if (confirm(`${email} を削除してもよろしいですか？`)) {
      startTransition(async () => {
        await handleDeleteUser(id)
      })
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase">
          <tr>
            <th className="px-6 py-4">ユーザー情報</th>
            <th className="px-6 py-4">保有権限</th>
            <th className="px-6 py-4 text-right">アクション</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4">
                <p className="font-medium text-gray-900">{user.name || "未設定"}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  {user.permissions.length > 0 ? (
                    user.permissions.map((p, i) => (
                      <span 
                        key={i} 
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                      >
                        {p.service.name}: {p.role.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs italic">権限なし</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onDelete(user.id, user.email || "")}
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
