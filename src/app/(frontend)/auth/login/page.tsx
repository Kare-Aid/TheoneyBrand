import { Metadata } from "next"
import Login from "./page.client"

export const metadata: Metadata = {
  title: "Login",
}

async function Page() {
  return <Login />
}

export default Page
