import { Metadata } from "next"
import React from "react"
import Profile from "./page.client"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Profile",
}

function Page() {
  return <Profile />
}

export default Page
