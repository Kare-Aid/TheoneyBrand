"use client"
import React from "react"
import { glasses } from "@/lib/data/productpage"
import { GoHeart, GoHeartFill } from "react-icons/go"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { truncateText } from "@/lib/util"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import axios from "axios"
import { useWishlistStore } from "@/lib/store/wishlist"

type Props = {
  id?: string
  name?: string
  imageUrl?: string
  fitsWith?: string
  price?: number
  likeId?: string
  refetchLikes?: any
}

type LikeResult = { message: string; data: { id: string; product: { id: string }; user?: {} } }

//Todo Use ID with toast to show loading indicator for liking and uniking product
// ID will be tracked with state and updated when it's successful or failed
function ProductCard({ id, name, imageUrl, fitsWith, price, likeId, refetchLikes }: Props) {
  const router = useRouter()
  const glass = glasses[0]

  const addNewLike = useWishlistStore((state) => state.addNewLike)
  const removeLike = useWishlistStore((state) => state.removeLike)

  // Like a product
  const { isPending: isLiking, mutateAsync } = useMutation({
    mutationFn: (productId: string) => axios.post<LikeResult>("/api/wishlist", { productId }),
    onSuccess: (response) => {
      toast.success(`${truncateText(name!, 12)} added to wishlist`)
      // Add likes to local storage if user is not authenticated
      if (!response.data.data.user) {
        const like = { likeId: response.data.data.id, productId: response.data.data.product.id }
        addNewLike(like)
      } else {
        refetchLikes()
      }
    },
    onError: () => {
      toast.error("Could not add product to wishlist")
    },
  })

  // Unlike a product
  const { isPending: isUnliking, mutate } = useMutation({
    mutationFn: (likeId: string) => axios.delete<LikeResult>("/api/wishlist/" + likeId),
    onSuccess: (response) => {
      toast.success(`${truncateText(name!, 12)} removed from wishlist`)
      // Remove like from local storage if user is not authenticated
      if (!response.data.data.user) {
        removeLike(response.data.data.id)
      } else {
        refetchLikes()
      }
    },
    onError: () => {
      toast.error("Could not remove product from wishlist")
    },
  })
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
            <h3 className="font-serifDisplay text-sm">
              {name ? truncateText(name, 10) : truncateText(glass.name, 10)}
            </h3>
            <p className="text-xs font-light">{fitsWith ?? glass.fitsWith}</p>
          </div>
          <p className="flex gap-1 md:gap-2 font-semibold">
            <span>₦</span>{" "}
            <span>{price ? price.toLocaleString() : glass.price?.toLocaleString()}</span>
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
