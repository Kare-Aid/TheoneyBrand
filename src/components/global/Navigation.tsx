"use client"
import React, { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import Logo from "./Logo"
import Link from "next/link"
import { motion } from "framer-motion"
import { LuSunMedium } from "react-icons/lu"
import { FiMoon } from "react-icons/fi"
import { PiShoppingCartBold } from "react-icons/pi"
import { animate, stagger, spring } from "framer-motion"
import Image from "next/image"
import { useTheme } from "next-themes"
import useDarkModeObserver from "@/hooks/useDarkModeObserver"
import { usePathname } from "next/navigation"
import { excludedLinks } from "@/lib/constants"
import Cart from "./Cart"

const links: { text: string; url: string }[] = [
  { text: "Home", url: "/" },
  { text: "Shop", url: "/products" },
  { text: "About", url: "#" },
  { text: "Cart", url: "#" },
  { text: "Profile", url: "/profile" },
]

function Navigation() {
  const [openNav, setOpenNav] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const { setTheme } = useTheme()
  const isDarkMode = useDarkModeObserver()
  const pathname = usePathname()

  async function closeNavigation() {
    //Animate links out before navigation closes
    await animate(
      "li.font-serifDisplay",
      { x: [0, -40], opacity: [1, 0] },
      { duration: 0.2, delay: stagger(0.1) },
    )
    setOpenNav(false)
  }

  useEffect(() => {
    //Animate links in when openNav is set to true
    if (openNav) {
      animate(
        "li.font-serifDisplay",
        { x: [-30, 0], opacity: [0, 1] },
        { duration: 1, delay: stagger(0.1), type: spring, stiffness: 300 },
      )
    }

    // Lock scroll when menu or cart is opened
    if (showCart || openNav) document.body.classList.add("overflow-hidden")
    else document.body.classList.remove("overflow-hidden")

    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [openNav, showCart])

  if (excludedLinks.includes(pathname)) return null
  return (
    <>
      <Cart showCart={showCart} closeCart={() => setShowCart(false)} />
      <header className="flex items-center justify-between bg-transparent px-4 sm:px-7 md:px-12 py-2 relative z-10">
        <Link href="/">
          <Logo />
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <motion.button
            className="bg-[#010D0B] text-white dark:bg-white dark:text-[#010D0B] p-2 rounded-full text-lg"
            onClick={() => setTheme(isDarkMode ? "light" : "dark")}
            animate={{ rotate: isDarkMode ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {isDarkMode ? <LuSunMedium /> : <FiMoon />}
          </motion.button>

          <button
            onClick={() => setShowCart(true)}
            className="bg-[#010D0B] text-white dark:bg-white dark:text-[#010D0B] p-2 rounded-full text-base sm:text-lg hidden md:inline"
          >
            <PiShoppingCartBold />
          </button>

          <button
            onClick={() => setOpenNav(true)}
            className="text-primary text-sm sm:text-base border border-primary bg-primary-foreground uppercase px-8 sm:px-10 py-2 rounded-full font-semibold"
          >
            Menu
          </button>
        </div>
      </header>
      {/* Open and close menu  */}
      <AnimatePresence>
        {openNav && (
          <>
            {/* Dark overlay */}
            <motion.div
              className="absolute left-0 top-0 w-full h-screen bg-black/50 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeNavigation}
            />
            <motion.nav
              initial={{ clipPath: "circle(0.3% at 100% 0)" }}
              animate={{ clipPath: "circle(140% at 4% 4%)" }}
              exit={{ clipPath: "circle(0.3% at 100% 0)" }}
              transition={{ duration: 0.5 }}
              className="bg-[#0a5c55] dark:bg-primary w-full md:w-1/2 max-w-[800px] min-h-[500px] h-screen absolute top-0 right-0 z-50 p-5"
            >
              <button
                onClick={closeNavigation}
                className="ml-auto block mb-3 md:hover:bg-[#FFFFFF66] md:hover:rotate-[405deg] transition-all duration-[700ms] rounded-full bg-[#FFFFFF66] rotate-45 md:bg-transparent md:rotate-0"
              >
                <Image
                  src="/svgs/plus-icon.png"
                  alt="Plus icon"
                  className="size-14"
                  width={200}
                  height={200}
                />
              </button>
              <hr className="border-t-2 border-[#14131333] dark:border-[#FFFFFF66] mb-5" />
              <ul className="space-y-8">
                {links.map((link) => (
                  <li
                    className="font-serifDisplay text-4xl md:text-6xl text-white"
                    key={Math.random() * 29345}
                    onClick={() => {
                      if (link.text == "Cart") setShowCart(true)
                      closeNavigation()
                    }}
                  >
                    <Link href={link.url}>{link.text}</Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
