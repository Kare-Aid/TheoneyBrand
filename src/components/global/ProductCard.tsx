"use client"
import React from "react"
import { glasses } from "@/lib/data/productpage"
import { GoHeart, GoHeartFill } from "react-icons/go"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { truncateText } from "@/lib/util"
import { useLikeMutation, useUnlikeMutation } from "@/lib/queries"

type Props = {
  id: string
  name: string
  imageUrl: string
  fitsWith: string
  price: number
  likeId?: string
}

//Todo Use ID with toast to show loading indicator for liking and uniking product
// ID will be tracked with state and updated when it's successful or failed
function ProductCard({ id, name, imageUrl, fitsWith, price, likeId }: Props) {
  const router = useRouter()
  const glass = glasses[0]

  const { isPending: isLiking, mutateAsync } = useLikeMutation(name as string)

  const { isPending: isUnliking, mutate } = useUnlikeMutation(name as string)
  return (
    <li className="relative w-full min-h-[350px] sm:max-w-[450px]">
      {Boolean(likeId) ? (
        <button
          className="absolute z-10 right-0 top-0 p-2"
          disabled={isLiking || isUnliking}
          onClick={(e) => {
            e.stopPropagation()
            if (likeId) {
              mutate(likeId)
            }
          }}
        >
          <GoHeartFill color="red" size={23} />
        </button>
      ) : (
        <button
          className="absolute z-10 right-0 top-0 p-2"
          disabled={isLiking || isUnliking}
          onClick={(e) => {
            e.stopPropagation()
            mutateAsync(id!)
          }}
        >
          <GoHeart color="#21242A" size={23} />
        </button>
      )}

      <figure
        className="cursor-pointer w-full h-full"
        onClick={(e) => {
          e.preventDefault()
          router.push("/products/" + id)
        }}
      >
        <div className="relative w-full h-full overflow-hidden max-h-[230px] sm:h-[300px] mb-2">
          <Image
            src={imageUrl}
            alt={name}
            className="mb-2 object-cover object-center w-full h-full"
            width={100}
            height={100}
          />
        </div>
        <figcaption className="flex flex-wrap items-start justify-between space-y-3">
          <div>
            <h3 className="font-serifDisplay text-sm">
              { truncateText(name, 10) }
            </h3>
            <p className="text-xs font-light">{fitsWith ?? glass.fitsWith}</p>
          </div>
          <p className="flex gap-1 md:gap-2 font-semibold">
            <span>₦</span>{" "}
            <span>{ price.toLocaleString() }</span>
          </p>
          <button
            className="bg-primary dark:bg-[#FFFFFF3B] border-0 dark:border border-border w-full relative z-20 text-white py-2 font-semibold rounded-full mb-2"
            onClick={(e) => e.stopPropagation()}
          >
            Add to cart
          </button>
        </figcaption>
      </figure>
    </li>
  )
}

export default ProductCard
