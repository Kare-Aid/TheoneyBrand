"use client"
import React, { useRef } from "react"
import { useScroll, useTransform, motion } from "framer-motion"
import Image from "next/image"

function BackgroundTwo() {
  const bgImageContainerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: bgImageScrollProgres } = useScroll({
    target: bgImageContainerRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(bgImageScrollProgres, [0, 1], [1, 2])
  return (
    <div ref={bgImageContainerRef} className="-mx-4 sm:-mx-12 mb-16 h-80 overflow-hidden">
      {/* For backgrounds with text  */}
      {/* <motion.div
            className='w-full h-full bg-no-repeat bg-center'
            style={{
              scale: y,
              backgroundImage: 'url("/images/home/glass-on-table.png")'
            }}
          /> */}
      <motion.div className="h-full w-full" style={{ scale: y }}>
        <Image
          src="/images/home/glass-on-table.png"
          alt="Glass on table"
          className="w-full h-full object-cover"
          width={2000}
          height={1333}
        />
      </motion.div>
    </div>
  )
}

export default BackgroundTwo
