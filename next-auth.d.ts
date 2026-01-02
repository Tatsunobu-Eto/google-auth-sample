import { DefaultSession } from "next-auth"

import { UserPermissionInfo } from "./serverside/types"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      permissions: UserPermissionInfo[]
    } & DefaultSession["user"]
  }
}
