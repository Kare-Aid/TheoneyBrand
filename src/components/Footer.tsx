"use client"
import React from "react"
import Link from "next/link"
import Logo from "./global/Logo"
import { usePathname } from "next/navigation"
import { excludedLinks } from "@/lib/constants"

const footerLinks = ["Privacy policy", "Terms and conditions", "Shipping policy", "Refund policy"]

function Footer() {
  const pathname = usePathname()
  if (excludedLinks.includes(pathname)) return null
  return (
    <footer className="pb-10 px-4 sm:px-7 md:px-12">
      <hr className="-mx-3 sm:-mx-12 border-t-2 border-[#14131333] dark:border-[#FFFFFF33] mb-6" />
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-start sm:items-center mb-10">
        <Link href="/">
          <Logo />
        </Link>
        <p className="mt-4 text-2xl">Theoneybrand</p>
      </div>
      <hr className="border-t-2 border-[#14131333] dark:border-[#FFFFFF33] mb-6 -mx-3 sm:-mx-12" />
      <div className="flex gap-10 flex-col md:flex-row justify-between text-border">
        <div className="space-y-3 flex flex-col">
          <a href="tel:+2347086686597">070-86 68 6597</a>
          <a href="mailto:Info@theoneybrand.com" className="font-manrope font-medium">
            Info@theoneybrand.com
          </a>
        </div>
        <div>
          <address className="not-italic">Benin city, Edo, Nigeria</address>
        </div>
        <nav>
          <ul className="space-y-3">
            {footerLinks.map((link) => (
              <li className="font-manrope font-semibold" key={Math.random() * 98485}>
                <Link href="#">{link}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
