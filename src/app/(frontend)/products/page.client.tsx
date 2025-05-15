"use client"
import React from "react"
import { useEffect, useState } from "react"
import { BsArrowLeft } from "react-icons/bs"
import Link from "next/link"
import { FiChevronRight, FiChevronDown } from "react-icons/fi"
import { useRouter } from "next/navigation"
import ProductCard from "@/components/global/ProductCard"
import { glasses } from "@/lib/data/productpage"
import { useTransform, useScroll, motion } from "framer-motion"
import { useRef } from "react"

type Tab = "Eyewear" | "Phone accessories" | ""

function ProductsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("")
  const imageURl = activeTab == "Phone accessories" ? "white_woman.jpg" : "succubus.jpg"
  const router = useRouter()

  const headerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 2])

  useEffect(() => {
    setTimeout(() => setActiveTab("Eyewear"), 700)
  }, [])
  return (
    <div className="px-4 sm:px-7 md:px-12 pb-20">
      <header>
        <div
          className="h-96 mt-10 mb-5 sm:mb-10 relative flex items-center justify-center overflow-hidden px-10"
          ref={headerRef}
        >
          <motion.div
            className="h-full w-full absolute bg-center bg-[length:100%]"
            style={{
              backgroundImage: `url("/images/products/${imageURl}")`,
              scale: y,
            }}
          ></motion.div>
          <div className="absolute inset-0 bg-black/65" />
          <h2 className="text-6xl relative z-20 md:text-8xl text-white font-serifDisplay mx-auto max-w-[800px]">
            Shop amazing protective pieces
          </h2>
        </div>

        <div
          aria-label="Tabs container"
          className="font-manrope flex justify-center gap-5 mb-7 text-xl sm:text-base"
        >
          <div className="relative">
            <button
              className={
                "border-black font-semibold underline-base mb-1 " +
                (activeTab === "Eyewear"
                  ? "text-foreground underline-active"
                  : "border-0 text-[#6D7372] dark:text-[#FFFFFFBD] underline-base")
              }
              onClick={() => setActiveTab("Eyewear")}
            >
              Eyewear
            </button>
          </div>

          <div className="relative">
            <button
              className={
                "border-black font-semibold underline-base mb-1 " +
                (activeTab === "Phone accessories"
                  ? "text-foreground underline-active"
                  : "border-0 text-[#6D7372] dark:text-[#FFFFFFBD] underline-base")
              }
              onClick={() => setActiveTab("Phone accessories")}
            >
              Phone accessories
            </button>
          </div>
        </div>

        <button
          className="bg-[#ADC5C2] dark:bg-[#EBEBEB] p-3 rounded-full text-[#242320] mb-6"
          onClick={router.back}
        >
          <BsArrowLeft size={23} />
        </button>

        {/* Breadcrumbs and category  */}
        <div className="flex items-center justify-between">
          <nav className="flex gap-1 items-center text-lg">
            <Link href="#" className="font-manrope font-medium text-black dark:text-white">
              Shop
            </Link>

            <FiChevronRight size={18} className="mt-1 dark:text-[#4C545E]" />
          </nav>

          <div className="flex gap-3 font-manrope">
            <button className="flex gap-1 items-center">
              <span className="text-[#052520] dark:text-white">Filter</span>
              <FiChevronDown className="text-primary mt-1" size={20} />
            </button>
            <button className="flex gap-1 items-center">
              <span className="text-[#052520] dark:text-white">Category</span>
              <FiChevronDown className="text-primary mt-1" size={20} />
            </button>
            <button className="flex gap-1 items-center">
              <span className="text-[#052520] dark:text-white">Price</span>
              <FiChevronDown className="text-primary mt-1" size={20} />
            </button>
          </div>
        </div>
      </header>

      <section className="mt-10 sm:mt-14">
        <header className="mb-5">
          <h3 className="font-manrope font-semibold">{activeTab}</h3>
        </header>
        <main>
          <ul className="grid gap-3 md:gap-10 grid-cols-2 md:grid-cols-3 justify-between">
            {glasses.map((product) => (
              <ProductCard key={Math.random() * 1593948} {...product} />
            ))}
          </ul>
        </main>
      </section>
    </div>
  )
}

export default ProductsPage
