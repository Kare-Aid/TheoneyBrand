"use client"
import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import useIsMobile from "@/hooks/useIsMobile"
import { featured } from "@/lib/data/homepage"
import Image from "next/image"

function FeaturedClients() {
  const isMobile = useIsMobile()
  // Horizontal scroll animation
  const featuredContainerRef = useRef<HTMLUListElement>(null)
  const { scrollYProgress: featuredScrollYProgress } = useScroll({
    target: featuredContainerRef,
    offset: ["start start", "end end"],
  })

  // -25% for desktop (-60% to put mobile in perspective)
  const x = useTransform(
    featuredScrollYProgress,
    [0, 1],
    isMobile ? ["-65%", "0%"] : ["-25%", "0%"],
  )
  // Horizontal scroll animation
  return (
    <div className="overflow-x-hidden scrollbar-hide mb-10 sm:mb-28">
      <motion.ul
        className="grid grid-cols-10 gap-3 min-w-[3200px]"
        ref={featuredContainerRef}
        style={{ x }}
      >
        {[...featured, ...featured].map((image) => (
          <li className="" key={Math.random() * 342102}>
            <div className="overflow-hidden h-60 rounded-lg">
              <Image
                src={image}
                alt="Featured client"
                className="h-full w-full object-cover hover:scale-110 transition-transform duration-500"
                width={2000}
                height={1444}
              />
            </div>
          </li>
        ))}
      </motion.ul>
    </div>
  )
}

export default FeaturedClients
