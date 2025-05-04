"use client"
import React, { useRef } from "react"
import { motion, useTransform, useScroll } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

function HeroSection() {
  const heroContainerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroContainerRef,
    offset: ["start end", "end start"],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2.2])
  return (
    <section className="flex mb-20" ref={heroContainerRef}>
      <div className="md:max-w-xl w-full md:w-1/2">
        <h2 className="text-5xl md:text-6xl lg:text-7xl/[5.3rem] font-serifDisplay mt-10 mb-10 tracking-wider">
          Stay <em>protected</em> while looking good.
        </h2>
        <p className="font-light text-xl mb-5">
          Whether its from the sun, blue light or slips and cracks.
        </p>
        <div className="max-h-[590px] lg:max-h-[650px] inline-block md:hidden mb-3 overflow-hidden">
          <motion.img
            src="/images/home/girl-on-glasses.png"
            alt="Girl on glasses"
            style={{ scale }}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="mb-5 text-2xl lg:text-3xl">
          Fashion meets function, not just looks. built to last.
        </p>
        <p className="font-light mb-10">Explore premium eyewear and phonecases</p>
        <Link
          href="/products"
          className="border border-border text-border font-semibold px-9 py-2 rounded-full bg-[#1615153B] dark:text-white dark:bg-[#FFFFFF3B] block w-full md:w-max text-center wavy-button"
        >
          Shop now
        </Link>
      </div>

      {/* Image animated on scroll  */}
      <div className="w-[45%] lg:w-1/2 h-full max-h-[590px] lg:max-h-[650px] absolute right-0 top-0 hidden md:inline-block overflow-hidden">
        <motion.div style={{ scale }} className="h-full">
          <Image
            src="/images/home/girl-on-glasses.png"
            alt="Girl on glasses"
            className="object-cover w-full h-full"
            width={1334}
            height={2000}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
