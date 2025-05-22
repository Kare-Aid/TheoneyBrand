import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type Like = { likeId: string; productId: string }

type WishlistStore = {
  likes: Like[]
  addNewLike: (like: Like) => void
  removeLike: (likeId: string) => void
}

export const wishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      likes: [],
      addNewLike: (like) => set((state) => ({ likes: [...state.likes, like] })),
      removeLike: (likeId) => {
        return set((state) => {
          const likes = state.likes.filter((like) => like.likeId !== likeId)
          return { likes }
        })
      },
    }),
    { name: "wishlist", storage: createJSONStorage(() => localStorage) },
  ),
)
