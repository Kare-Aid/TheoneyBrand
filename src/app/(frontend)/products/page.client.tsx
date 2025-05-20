"use client"
import React from "react"
import { useEffect, useState } from "react"
import { BsArrowLeft } from "react-icons/bs"
import Link from "next/link"
import { FiChevronRight, FiChevronDown } from "react-icons/fi"
import { useRouter } from "next/navigation"
import { useTransform, useScroll, motion } from "framer-motion"
import { useRef } from "react"
import { Media } from "@/payload-types"
import Products from "./Products"

type Category = {
  id: string
  name: string
  slug: string
  headerImage?: ((string | null) | Media) | undefined
}

function ProductsPage({ categories }: { categories: Category[] }) {
  const [activeTab, setActiveTab] = useState<number | undefined>(undefined)
  const _index = activeTab ? activeTab : 0
  const imageURl = (categories[_index].headerImage as Media).url as string
  const router = useRouter()
  const headerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 2])
  useEffect(() => {
    setTimeout(() => setActiveTab(0), 500)
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
            style={{ backgroundImage: `url("${imageURl}")`, scale: y }}
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
          {categories.map((category, index) => (
            <div className="relative" key={category.id}>
              <button
                className={
                  "border-black font-semibold underline-base mb-1 " +
                  (activeTab === index
                    ? "text-foreground underline-active"
                    : "border-0 text-[#6D7372] dark:text-[#FFFFFFBD] underline-base")
                }
                onClick={() => setActiveTab(index)}
              >
                {category.name}
              </button>
            </div>
          ))}
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

      {categories.map((category, index) => (
        <div key={category.id}>
          {index == _index && <Products categoryName={category.name} categoryId={category.id} />}
        </div>
      ))}
    </div>
  )
}

export default ProductsPage
