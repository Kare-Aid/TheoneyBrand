import React from "react"
import "./styles.css"
import { Metadata } from "next"
import { Manrope, DM_Serif_Display } from "next/font/google"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import Footer from "@/components/global/Footer"
import Navigation from "@/components/Navigation"
import { Toaster } from "sonner"
import QueryProvider from "@/components/providers/QueryProvider"
import { SessionProvider } from "next-auth/react"

const manrope = Manrope({ subsets: ["latin"] })
const serifDisplay = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: { template: "%s | The Oney Brand", default: "Theoney Brand" },
  description:
    "Elevate your device with our handcrafted premium phone cases and ultra-clear tempered glass protectors. Where cutting-edge protection meets timeless elegance.",
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${serifDisplay.className} ${manrope.className}`}
    >
      <body>
        <SessionProvider>
          <QueryProvider>
            <ThemeProvider attribute="class">
              <Toaster richColors position="top-right" />
              <div className="relative max-w-screen-2xl mx-auto">
                <Navigation />
                <main className="font-manrope">{children}</main>
                <Footer />
              </div>
            </ThemeProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
