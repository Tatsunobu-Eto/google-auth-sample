import { auth } from "@/auth"
import { SignOut } from "@/components/auth-components"

export async function Header() {
  const session = await auth()

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">P</span>
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">Service Portal</span>
      </div>

      {session?.user && (
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
            <p className="text-xs text-gray-500">{session.user.email}</p>
          </div>
          {session.user.image && (
            <img src={session.user.image} alt="" className="w-8 h-8 rounded-full ring-2 ring-gray-100" />
          )}
          <SignOut />
        </div>
      )}
    </header>
  )
}
