import React from "react"
import { useQuery } from "@tanstack/react-query"
import SkeletonLoaders from "@/components/global/SkeletonLoaders"
import ProductCard from "@/components/global/ProductCard"
import axios from "axios"
import { PaginatedDocs } from "payload"
import { Like, Media, Product } from "@/payload-types"
import { useWishlistStore } from "@/lib/store/wishlist"
import { useSession } from "next-auth/react"

type Products = {
  id: string
  name: string
  price: number
  fitsWith?: (string | null) | undefined
  images: {
    image: string | Media
    label: string
    id?: string | null
  }[]
}

type Products_ = { message: string; data: PaginatedDocs<Products> }

type Likes_ = { message: string; data: PaginatedDocs<Like> }

/**Component that displays products according to category */
function Products({ categoryName, categoryId }: { categoryName: string; categoryId: string }) {
  const { data } = useSession()

  const { data: result, isLoading } = useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => axios.get<Products_>("/api/products_?categoryId=" + categoryId),
    throwOnError: true,
  })

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
  return (
    <section className="mt-10 sm:mt-14">
      <header className="mb-5">
        <h3 className="font-manrope font-semibold">{categoryName}</h3>
      </header>
      {result && result?.data.data.docs.length < 1 && (
        <div className="h-[40vh] flex items-center justify-center">
          <p className="font-serifDisplay text-center text-2xl sm:text-3xl md:text-4xl">
            No products found for this category
          </p>
        </div>
      )}
      {isLoading && (
        <div className="grid gap-4 md:gap-10 grid-cols-2 md:grid-cols-3 justify-between mb-10">
          <SkeletonLoaders number={6} />
        </div>
      )}
      {result && (
        <main>
          <ul className="grid gap-3 md:gap-10 grid-cols-2 md:grid-cols-3 justify-between">
            {result?.data.data.docs.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                fitsWith={product.fitsWith!}
                price={product.price}
                imageUrl={(product.images[0].image as Media).url as string}
                likeId={getLikeId(product.id)}
                refetchLikes={refetch}
              />
            ))}
          </ul>
        </main>
      )}
    </section>
  )
}

export default Products
