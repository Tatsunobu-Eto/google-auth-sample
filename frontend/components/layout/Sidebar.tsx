import { auth } from "@/auth"
import Link from "next/link"

export async function Sidebar() {
  const session = await auth()
  if (!session) return null

  const isSysAdmin = session.user.permissions.some(p => p.role === "システム管理者")
  const userPermissions = session.user.permissions

  return (
    <aside className="w-64 bg-gray-50 border-r min-h-[calc(100vh-64px)] p-4 flex flex-col gap-8 sticky top-16">
      <nav className="flex flex-col gap-1">
        <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">General</p>
        <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition">
          ホーム
        </Link>
        <Link href="/requests" className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition">
          権限申請
        </Link>
      </nav>

      {userPermissions.length > 0 && (
        <nav className="flex flex-col gap-1">
          <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">My Services</p>
          {userPermissions.map((perm, i) => (
            <Link 
              key={i} 
              href={`/services/${perm.service}`} 
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition flex items-center justify-between"
            >
              {perm.service}
              <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded font-bold">{perm.role}</span>
            </Link>
          ))}
        </nav>
      )}

      {isSysAdmin && (
        <nav className="flex flex-col gap-1">
          <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Admin</p>
          <Link href="/admin/users" className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition">
            アカウント管理
          </Link>
          <Link href="/admin/approvals" className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition">
            承認管理
          </Link>
        </nav>
      )}
    </aside>
  )
}
