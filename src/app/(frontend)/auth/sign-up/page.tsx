import React from "react"
import { Metadata } from "next"
import Signup from "./page.client"

export const metadata: Metadata = {
  title: "Sign up",
}

function Page() {
  return <Signup />
}

export default Page
