import { signIn, signOut } from "@/auth"

export function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google")
            }}
        >
            <button
                className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
                type="submit"
            >
                Sign in with Google
            </button>
        </form>
    )
}

export function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <button
                className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-200 transition-colors duration-200"
                type="submit"
            >
                Sign Out
            </button>
        </form>
    )
}
