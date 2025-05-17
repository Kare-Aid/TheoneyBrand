"use client"
import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { FiArrowUpLeft, FiArrowUpRight } from "react-icons/fi"
import { IoStar } from "react-icons/io5"
import { useState, useEffect } from "react"

type Testimonial = {
  quote: string
  name: string
}

function AnimatedTestimonials({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[]
  autoplay?: boolean
}) {
  const [active, setActive] = useState(0)

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const isActive = (index: number) => {
    return index === active
  }

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000)
      return () => clearInterval(interval)
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [autoplay])

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10
  }
  return (
    <div className="relative w-full sm:w-9/12 lg:w-2/3 mx-auto px-4">
      <button
        onClick={handlePrev}
        className="absolute top-1/2 -translate-y-1/2 -left-10 lg:left-2 p-2 rounded-full bg-[#09343B] text-white dark:bg-white dark:text-black hidden md:inline disabled:bg-[black] disabled:text-[#6F6E6E]"
      >
        <FiArrowUpLeft size={25} />
      </button>
      <ul className="w-full lg:w-10/12 mx-auto">
        {/* Other testimonials  */}
        <AnimatePresence>
          {testimonials.slice(1, -1).map((testimonial, index) => (
            <motion.li
              key={testimonial.name}
              initial={{
                opacity: 0,
                scale: 0.9,
                z: -100,
                //Todo I'll change the alignment of the back reviews here
                rotate: randomRotateY(),
              }}
              animate={{
                opacity: isActive(index) ? 1 : 0.7,
                scale: isActive(index) ? 1 : 0.95,
                z: isActive(index) ? 0 : -100,
                rotate: isActive(index) ? 0 : randomRotateY(),
                y: isActive(index) ? [0, -80, 0] : 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                z: 100,
                rotate: randomRotateY(),
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-[#03241D73] dark:bg-[#FFFFFF4F] w-full lg:w-10/12 py-10 flex flex-col items-center rounded-2xl absolute top-0"
            >
              <div className="opacity-0">
                <h3 className="font-serifDisplay text-lg sm:text-4xl mb-6">{testimonial.name}</h3>
                <div className="flex gap-2 mb-10">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <IoStar key={index} />
                  ))}
                </div>
                <p className="text-sm sm:text-lg text-center max-w-[390px] px-4">
                  {testimonial.quote}
                </p>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>

        {/* Active testimonial */}
        <motion.li
          key={active}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="bg-[#09343B] dark:bg-[#001B17] flex flex-col items-center text-white py-10 rounded-2xl relative z-20"
        >
          <h3 className="font-serifDisplay text-lg sm:text-4xl mb-6">
            {testimonials[active].name}
          </h3>
          <div className="flex gap-2 mb-10">
            {Array.from({ length: 5 }).map((_, index) => (
              <IoStar key={index} />
            ))}
          </div>
          <p className="text-sm text-center sm:text-lg max-w-[390px] px-4">
            {testimonials[active].quote.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                  delay: 0.02 * index,
                }}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </p>
        </motion.li>
      </ul>

      <button
        onClick={handleNext}
        className="absolute top-1/2 -translate-y-1/2 -right-10 lg:right-2 p-2 rounded-full bg-[#09343B] text-white dark:bg-white dark:text-black hidden md:inline"
      >
        <FiArrowUpRight size={25} />
      </button>
    </div>
  )
}

export default AnimatedTestimonials
