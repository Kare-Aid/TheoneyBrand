import { useQuery } from "@tanstack/react-query"
import { PaginatedDocs } from "payload"
import { Like, Product } from "@/payload-types"
import axios from "axios"
import { useWishlistStore } from "@/lib/store/wishlist"
import { useSession } from "next-auth/react"

type Likes_ = { message: string; data: PaginatedDocs<Like> }

function useWishList() {
  const { data } = useSession()
  const { data: likes, refetch } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => axios.get<Likes_>("/api/wishlist"),
    enabled: !!data,
  })

  const savedLikes = useWishlistStore((state) => state.likes)

  function getLikeId(productId: string): string | undefined {
    const isSavedLike = savedLikes.find((like) => like.productId === productId)?.likeId
    let isDbLiked
    if (likes) {
      isDbLiked = likes?.data.data.docs.find(
        (like) => (like.product as Product).id == productId,
      )?.id
    }
    return isSavedLike || isDbLiked
  }

  return { refetchLikes: refetch, getLikeId }
}

export default useWishList
