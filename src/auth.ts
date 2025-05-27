import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getPayload } from "payload"
import configPromise from "@payload-config"
import bcrypt from "bcrypt"
import { loginSchema } from "./lib/schemas"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // Credentials also include csrfToken and callbackUrl
      async authorize(credentials) {
        const { email, password } = credentials
        if (!email || !password) return null
        try {
          const result = loginSchema.safeParse({ email, password })
          if (!result.success) return null

          const payload = await getPayload({ config: configPromise })

          const query = await payload.find({
            limit: 1,
            where: { email: { equals: email } },
            collection: "customers",
            overrideAccess: true,
            select: { firstName: true, lastName: true, email: true, password: true },
          })
          if (query.docs.length < 1) return null

          const user = query.docs[0]

          const valid = await bcrypt.compare(result.data.password, user.password)

          if (!valid) return null

          const { password: _, ...rest } = user

          return rest
        } catch (error: unknown) {
          return null
        }
      },
    }),
  ],
  callbacks: {
    //Only needed to save google users to database
    // async signIn({user, account}) {
    //   if (account?.provider === 'credentials') return true;
    //   return false;
    // },
    async jwt({ token, user }) {
      if (user) {
        token.name = `${user.firstName} ${user.lastName}`
      }
      return token
    },
    session({ session, token }) {
      session.user.name = token.name
      session.user.id = token.sub as string
      return session
    },
  },
  session: {
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  },
  pages: {
    signIn: "/auth/login",
  },
  trustHost: true,
})
