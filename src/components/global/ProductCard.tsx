"use client"
import React from "react"
import { GoHeart, GoHeartFill } from "react-icons/go"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { truncateText } from "@/lib/util"
import { useLikeMutation, useUnlikeMutation } from "@/lib/queries"
import { useAddToCart } from "@/lib/queries"
import { useCartStore } from "@/lib/store/cart"
import { FaCheck } from "react-icons/fa"

type Props = {
  id: string
  name: string
  imageUrl: string
  price: number
  fitsWith?: string
  likeId?: string
  addedToCart?: boolean
}

//Todo Use ID with toast to show loading indicator for liking and uniking product
//ID will be tracked with state and updated when it's successful or failed
function ProductCard({ id, name, imageUrl, fitsWith, price, likeId, addedToCart }: Props) {
  const router = useRouter()
  const { isPending: isLiking, mutateAsync } = useLikeMutation(name as string)
  const { isPending: isUnliking, mutate } = useUnlikeMutation(name as string)
  const { mutate: addProductToCart, isPending: isAddingToCart } = useAddToCart()
  const cartId = useCartStore((state) => state.cartId)
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
            <h3 className="font-serifDisplay text-sm">{truncateText(name, 10)}</h3>
            {fitsWith && <p className="text-xs font-light">{fitsWith}</p>}
          </div>
          <p className="flex gap-1 md:gap-2 font-semibold">
            <span>₦</span> <span>{price.toLocaleString()}</span>
          </p>
          <button
            className="bg-primary dark:bg-[#FFFFFF3B] border-0 dark:border border-border w-full relative z-20 text-white py-2 font-semibold rounded-full mb-2 disabled:opacity-60"
            disabled={addedToCart || isAddingToCart}
            onClick={(e) => {
              e.stopPropagation()
              if (!fitsWith) {
                router.push("/products/" + id)
                return
              }
              addProductToCart({ cartId, productId: id })
            }}
          >
            {addedToCart ? (
              <div className="flex gap-2 items-center justify-center">
                <span className="text-sm">Added to cart</span>
                <FaCheck size={13} />
              </div>
            ) : (
              "Add to cart"
            )}
          </button>
        </figcaption>
      </figure>
    </li>
  )
}

export default ProductCard
