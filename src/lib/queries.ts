import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { PaginatedDocs } from "payload"
import { Like } from "@/payload-types"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { useWishlistStore } from "./store/wishlist"
import { truncateText } from "@/lib/util"

type Likes_ = { message: string; data: PaginatedDocs<Like> }

/**Query hook to fetch all likes for a user */
export const useProfileWishList = () => {
  const { data } = useSession()
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: () => axios.get<Likes_>("/api/wishlist"),
    enabled: !!data
  })
}

type LikeResult = { message: string; data: { id: string; product: { id: string }; user?: {} } }

/**Mutation hook to like a product */
export const useLikeMutation = (productName: string) => {
  const addNewLike = useWishlistStore((state) => state.addNewLike)
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (productId: string) => axios.post<LikeResult>("/api/wishlist", { productId }),
    onSuccess: (response) => {
      toast.success(`${truncateText(productName, 12)} added to wishlist`)
      if (!response.data.data.user) {
        // Add like to local storage if user is not authenticated
        const like = { likeId: response.data.data.id, productId: response.data.data.product.id }
        addNewLike(like)
      } else {
        // Invalidate wishlist query when logged in
        queryClient.invalidateQueries({ queryKey: ["wishlist"] })
      }
    },
    onError: () => {
      toast.error("Could not add product to wishlist")
    },
  })
}

/**Mutation hook to unlike a product */
export const useUnlikeMutation = (productName: string) => {
  const removeLike = useWishlistStore((state) => state.removeLike)
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (likeId: string) => axios.delete<LikeResult>("/api/wishlist/" + likeId),
    onSuccess: (response) => {
      toast.success(`${truncateText(productName, 12)} removed from wishlist`)
      if (!response.data.data.user) {
        // Remove like from local storage if user is not authenticated
        removeLike(response.data.data.id)
      } else {
        // Invalidate wishlist query when logged in
        queryClient.invalidateQueries({ queryKey: ["wishlist"] })
      }
    },
    onError: () => {
      toast.error("Could not remove product from wishlist")
    },
  })
}
