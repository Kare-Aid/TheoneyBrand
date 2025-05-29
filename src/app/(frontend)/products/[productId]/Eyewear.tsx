"use client"
import { BsArrowLeft } from "react-icons/bs"
import { FiChevronRight } from "react-icons/fi"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { GoHeart, GoHeartFill } from "react-icons/go"
import { useState } from "react"
import AccordionItem from "@/components/ui/AccordionItem"
import { IoIosStar } from "react-icons/io"
import { genID } from "@/lib/util"
import { phoneCaseVariations } from "@/lib/data/singleProduct"
import ProductCard from "@/components/global/ProductCard"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { Category, Media, Product } from "@/payload-types"
import { useProfileWishList } from "@/lib/queries"
import { useWishlistStore } from "@/lib/store/wishlist"
import { useLikeMutation, useUnlikeMutation } from "@/lib/queries"
import { FaCamera } from "react-icons/fa"

const colors = ["#DF2020", "#0009B4", "#ffffff", "#020A1B", "#B08E8B"]

type ImagePosition = "Front" | "Back" | "Side"

function Eyewear({ product }: { product: Product }) {
  const router = useRouter()

  const { data: likes } = useProfileWishList()

  const { isPending: isLiking, mutateAsync } = useLikeMutation(product.name)

  const { isPending: isUnliking, mutate } = useUnlikeMutation(product.name)

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
  const category = (product.category as Category)?.name as string
  const [currentVariation, setCurrentVariation] = useState("")
  const [currentAngle, setCurrentAngle] = useState<ImagePosition>("Front")
  return (
    <div className="px-4 sm:px-7 md:px-12 pb-20">
      <nav className="my-4 sm:my-6">
        <button
          className="bg-[#ADC5C2] dark:bg-[#EBEBEB] p-3 rounded-full text-[#242320] mb-6"
          onClick={router.back}
        >
          <BsArrowLeft size={23} />
        </button>
        <div className="flex text-sm sm:text-base gap-1 sm:gap-2">
          {/* Breadcrumbs  */}
          <div className="flex gap-1 items-center">
            <Link href="/products" className="font-manrope font-medium text-black dark:text-white">
              Shop
            </Link>
            <FiChevronRight size={18} className="mt-1 dark:text-[#4C545E]" />
          </div>
          <div className="flex gap-1 items-center">
            <Link
              href={"/products?category=" + category}
              className="font-manrope font-medium text-black dark:text-white"
            >
              {category}
            </Link>
            <FiChevronRight size={18} className="mt-1 dark:text-[#4C545E]" />
          </div>
          <div className="flex items-center">
            <Link href="#" className="font-manrope font-medium text-black dark:text-white">
              {product.name}
            </Link>
          </div>
        </div>
      </nav>
      <article className="flex flex-col md:flex-row gap-4 mb-10">
        {/* Container for displayed image and other images  */}
        <div className="w-full md:w-1/2 max-w-[700px]">
          {/* Container for image and like button  */}
          <AnimatePresence>
            {product.images.map((image) => (
              <motion.div
                className="relative mb-3"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: image.label === currentAngle ? 1 : 0,
                }}
                exit={{ opacity: 0 }}
                key={image.id}
                style={{
                  display: image.label === currentAngle ? "block" : "none",
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                {Boolean(getLikeId(product.id)) ? (
                  <button
                    className="absolute z-10 right-0 top-0 p-2"
                    disabled={isLiking || isUnliking}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (getLikeId(product.id)) {
                        mutate(getLikeId(product.id) as string)
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
                      mutateAsync(product.id)
                    }}
                  >
                    <GoHeart color="#21242A" size={23} />
                  </button>
                )}
                <Image
                  src={(image.image as Media).url as string}
                  alt="Product image"
                  className="w-full h-[300px] sm:h-[500px] md:h-[666px] object-cover"
                  width={100}
                  height={300}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Other images */}
          <div className="grid gap-2 grid-cols-3">
            {product.images?.[0] ? (
              <div onClick={() => setCurrentAngle("Front")}>
                <Image
                  src={(product.images[0].image as Media).url as string}
                  alt="Front picture"
                  className="mb-1 sm:mb-3 h-28 sm:h-48 w-full object-cover"
                  width={500}
                  height={300}
                />
                <p className="text-sm">Front</p>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <FaCamera className="mx-auto" size={40} />
              </div>
            )}

            {product.images?.[1] ? (
              <div onClick={() => setCurrentAngle("Back")}>
                <Image
                  src={(product.images[1].image as Media).url as string}
                  alt="Front picture"
                  className="mb-1 sm:mb-3 h-28 sm:h-48 w-full object-cover"
                  width={500}
                  height={300}
                />
                <p className="text-sm">Back</p>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <FaCamera className="mx-auto" size={40} />
              </div>
            )}

            {product.images?.[2] ? (
              <div onClick={() => setCurrentAngle("Side")}>
                <Image
                  src={(product.images[2].image as Media).url as string}
                  alt="Front picture"
                  className="mb-1 sm:mb-3 h-28 sm:h-48 w-full object-cover"
                  width={500}
                  height={300}
                />
                <p className="text-sm">Side</p>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <FaCamera className="mx-auto" size={40} />
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="font-serifDisplay text-4xl mb-5" aria-label="Product name">
            {product.name}
          </h2>
          <p className="flex gap-2 items-center text-xl mb-7" aria-label="Product price">
            <span>₦</span> <span>{product.price.toLocaleString()}</span>
          </p>
          <section aria-label="Product description" className="mb-7">
            <h3 className="font-serifDisplay italic text-3xl mb-4">Description</h3>
            <p className="text-sm">{product.description}</p>
          </section>
          <div className="">
            <p className="mb-3 font-medium">Colors</p>
            <ul className="flex items-center gap-1 mb-5">
              {colors.map((color) => (
                <li key={color}>
                  <button
                    style={{ backgroundColor: color }}
                    className={
                      "size-6 rounded-full " +
                      (color === "#020A1B" && "dark:border border-border ") +
                      (color === "#ffffff" && "border-black border")
                    }
                  />
                </li>
              ))}
            </ul>

            <ul className="flex gap-2 flex-wrap mb-10" aria-label="List of case variations">
              {phoneCaseVariations.map((variation) => (
                <li key={genID()}>
                  <button
                    onClick={() => setCurrentVariation(variation)}
                    className={
                      "border border-border px-3 py-1 rounded-full " +
                      (currentVariation == variation ? "bg-primary text-white" : "")
                    }
                  >
                    {variation}
                  </button>
                </li>
              ))}
            </ul>

            <section className="flex flex-col lg:flex-row gap-2 mb-10">
              <div className="flex justify-around items-center gap-4 rounded-full border border-border px-3 py-1">
                <button className="text-2xl">-</button>
                <p className="px-5 text-center">1</p>
                <button className="text-2xl">+</button>
              </div>
              <button className="bg-primary text-[#FBFBFB] px-10 py-2 rounded-full w-full lg:w-max">
                Add to cart
              </button>
              <button className="text-primary bg-[#E2EFED]  border border-primary px-10 py-2 rounded-full w-full lg:w-max font-medium">
                Try it on
              </button>
            </section>

            {product.details && product.details.length > 0 && (
              <AccordionItem
                header="Details"
                list={product.details.map((detail) => detail.detail as string)}
              />
            )}

            {product.care && product.care.length > 0 && (
              <AccordionItem header="Care" list={product.care.map((care) => care.care as string)} />
            )}

            {product.shippingDetails && (
              <AccordionItem header="Shipping" list={[product.shippingDetails]} />
            )}

            <section>
              <h2 className="font-serifDisplay text-3xl mb-7">Customer Reviews</h2>
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <p className="font-serifDisplay text-3xl mb-3">4.5</p>
                  <div className="mb-5 flex">
                    {Array.from({ length: 5 }).map((_) => (
                      <IoIosStar key={genID()} size={24} />
                    ))}
                  </div>
                  <p className="font-light">23 reviews</p>
                </div>

                <div className="flex-grow px-2">
                  <div className="flex gap-2 items-center">
                    <span className="text-[#00000017]">5</span>
                    <div className="bg-[#D7D7D78F] h-4 w-full rounded-full overflow-hidden">
                      <div className="w-full h-full bg-black dark:bg-white" />
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-[#00000017]">4</span>
                    <div className="bg-[#D7D7D78F] h-4 w-full rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-black dark:bg-white" />
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-[#00000017]">3</span>
                    <div className="bg-[#D7D7D78F] h-4 w-full rounded-full overflow-hidden">
                      <div className="w-0 h-full bg-black dark:bg-white" />
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-[#00000017]">2</span>
                    <div className="bg-[#D7D7D78F] h-4 w-full rounded-full overflow-hidden">
                      <div className="w-0 h-full bg-black dark:bg-white" />
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-[#00000017]">1</span>
                    <div className="bg-[#D7D7D78F] h-4 w-full rounded-full overflow-hidden">
                      <div className="w-0 h-full bg-black dark:bg-white" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </article>
      <aside className="mt-20">
        <section>
          <header className="mb-4">
            <h3 className="font-serifDisplay text-3xl">Related Products</h3>
          </header>

          {product.relatedProducts && product.relatedProducts?.length > 0 ? (
            <>
              <ul className="grid sm:hidden gap-2 md:gap-10 grid-cols-2 md:grid-cols-3 justify-between">
                {(product.relatedProducts as Product[]).map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    fitsWith={product.fitsWith!}
                    price={product.price}
                    imageUrl={(product.images[0].image as Media).url as string}
                    likeId={getLikeId(product.id)}
                  />
                ))}
              </ul>
              <div className="overflow-x-auto scrollbar-hide hidden sm:block">
                <ul
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:min-w-[1500px]"
                  aria-label="List of related products"
                >
                  {(product.relatedProducts as Product[]).map((product) => (
                    <div className="sm:w-[200px] h-[400px] lg:w-[300px]" key={product.id}>
                      <ProductCard
                        id={product.id}
                        name={product.name}
                        fitsWith={product.fitsWith!}
                        price={product.price}
                        imageUrl={(product.images[0].image as Media).url as string}
                        likeId={getLikeId(product.id)}
                      />
                    </div>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="h-[40vh] flex items-center justify-center">
              <p className="font-serifDisplay text-center text-2xl sm:text-3xl md:text-4xl">
                No related products
              </p>
            </div>
          )}
        </section>
      </aside>
    </div>
  )
}

export default Eyewear
