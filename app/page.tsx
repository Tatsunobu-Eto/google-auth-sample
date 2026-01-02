import { auth } from "@/auth"
import { SignIn, SignOut } from "@/components/auth-components"
import Image from "next/image"

export default async function Home() {
  const session = await auth()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Google Auth Sample
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Built with Next.js, NextAuth.js & Tailwind CSS
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl ring-1 ring-gray-900/5 sm:rounded-2xl sm:px-10">
          <div className="flex flex-col items-center space-y-6">

            {session?.user ? (
              // Logged In Design
              <div className="w-full flex flex-col items-center animate-in fade-in duration-500">
                <div className="relative h-24 w-24 mb-4">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt="User Profile"
                      fill
                      className="rounded-full object-cover ring-4 ring-blue-50"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-2xl text-gray-500">?</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-medium text-gray-900">
                  Welcome back!
                </h3>
                <p className="text-gray-500 mb-6">
                  {session.user.name}
                </p>

                <div className="w-full border-t border-gray-100 pt-6 flex justify-center">
                  <SignOut />
                </div>
              </div>
            ) : (
              // Logged Out Design
              <div className="w-full flex flex-col items-center animate-in fade-in duration-500">
                <div className="rounded-full bg-blue-50 p-3 mb-4">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="text-gray-500 mb-8 text-center">
                  Please sign in to access your profile and managing your settings.
                </p>
                <SignIn />
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
