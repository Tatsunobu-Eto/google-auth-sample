"use client"

import { useState } from "react"
import { submitRequest } from "@/frontend/actions/permissionActions"

type Props = {
  services: { id: string; name: string }[]
  roles: { id: string; name: string }[]
  pendingServiceIds: string[]
}

export function RequestForm({ services, roles, pendingServiceIds }: Props) {
  const [serviceId, setServiceId] = useState(services.find(s => !pendingServiceIds.includes(s.id))?.id || "")
  const [roleId, setRoleId] = useState(roles[0]?.id || "")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitRequest(serviceId, roleId)
      setMessage("申請を送信しました。")
    } catch (error) {
      setMessage("エラーが発生しました。")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h3 className="text-lg font-bold mb-4 text-gray-800">権限申請</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">サービス</label>
          <select
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {services.map((s) => {
              const isPending = pendingServiceIds.includes(s.id)
              return (
                <option key={s.id} value={s.id} disabled={isPending}>
                  {s.name} {isPending ? "(申請中)" : ""}
                </option>
              )
            })}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">希望権限</label>
          <select
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {roles.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:bg-blue-300"
        >
          {loading ? "送信中..." : "申請する"}
        </button>
        {message && <p className="text-sm text-center text-blue-600 mt-2">{message}</p>}
      </form>
    </div>
  )
}
