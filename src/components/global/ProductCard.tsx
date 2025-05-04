"use client"
import React from "react"
import { useState } from "react"
import { glasses } from "@/lib/data/productpage"
import { GoHeart, GoHeartFill } from "react-icons/go"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"

type Props = {
  name?: string
  imageUrl?: string
  fitsWith?: string
  price?: number
}

function ProductCard({ name, imageUrl, fitsWith, price }: Props) {
  const [like, setLike] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const router = useRouter()
  const glass = glasses[0]
  return (
    <li
      className="relative w-full sm:max-w-[450px]"
      onMouseOver={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <button
        className="absolute z-10 right-2 top-2"
        onClick={(e) => {
          e.stopPropagation()
          setLike((prev) => !prev)
        }}
      >
        {like ? <GoHeartFill color="red" size={23} /> : <GoHeart color="#21242A" size={23} />}
      </button>

      <figure
        className="cursor-pointer w-full h-full"
        onClick={(e) => {
          e.preventDefault()
          router.push("/products/12345")
        }}
      >
        <div className="relative w-full h-full max-h-[170px] sm:max-h-[300px]">
          {/* Display on hover  */}
          <AnimatePresence>
            {showOverlay && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute p-1 z-10 bg-[#000000A6] inset-0"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="bg-primary relative z-20 text-white text-xs py-2 px-4 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  Add to cart
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <img
            src={imageUrl ?? glass.imageUrl}
            alt={name ?? glass.name}
            className="mb-2 object-cover w-full h-full"
          />
        </div>
        <figcaption className="flex items-start justify-between">
          <div>
            <h3 className="font-serifDisplay text-sm">{name ?? glass.name}</h3>
            <p className="text-xs font-light">{fitsWith ?? glass.fitsWith}</p>
          </div>
          <p className="flex gap-1 md:gap-2 font-semibold">
            <span>₦</span>{" "}
            <span>{price ? price?.toLocaleString() : glass.price.toLocaleString()}</span>
          </p>
        </figcaption>
      </figure>
    </li>
  )
}

export default ProductCard
