import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    firstName: string
    lastName: string
  }
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}
