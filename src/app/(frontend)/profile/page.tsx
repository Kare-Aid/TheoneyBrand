import { Metadata } from "next"
import React from "react"
import Profile from "./page.client"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Profile",
}

async function Page() {
  const session = await auth()
  if (!session) redirect("/auth/login")
  return <Profile />
}

export default Page
