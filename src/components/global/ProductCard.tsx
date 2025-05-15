"use client"
import React from "react"
import { useState } from "react"
import { glasses } from "@/lib/data/productpage"
import { GoHeart, GoHeartFill } from "react-icons/go"
// import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"

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
      className="relative w-full min-h-[350px] sm:max-w-[450px]"
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
        <div className="relative w-full h-full overflow-hidden max-h-[230px] sm:max-h-[300px] mb-2">
          <Image
            src={imageUrl ?? glass.imageUrl}
            alt={name ?? glass.name}
            className="mb-2 object-cover w-full h-full"
            width={100}
            height={100}
          />
        </div>
        <figcaption className="flex flex-wrap items-start justify-between space-y-3">
          <div>
            <h3 className="font-serifDisplay text-sm">{name ?? glass.name}</h3>
            <p className="text-xs font-light">{fitsWith ?? glass.fitsWith}</p>
          </div>
          <p className="flex gap-1 md:gap-2 font-semibold">
            <span>₦</span>{" "}
            <span>{price ? price?.toLocaleString() : glass.price.toLocaleString()}</span>
          </p>
          <button
            className="bg-primary dark:bg-[#FFFFFF3B] border-0 dark:border border-border w-full relative z-20 text-white py-2 font-semibold rounded-full mb-2"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            Add to cart
          </button>
        </figcaption>
      </figure>
    </li>
  )
}

export default ProductCard
