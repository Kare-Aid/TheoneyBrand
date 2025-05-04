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
import { glasses } from "@/lib/data/productpage"

const colors = ["#DF2020", "#0009B4", "#ffffff", "#020A1B", "#B08E8B"]

type ImagePosition = "Front" | "Back" | "Side"

const images: { angle: ImagePosition; imageUrl: string }[] = [
  { angle: "Front", imageUrl: "/images/products/samples/glass-1.jpg" },
  { angle: "Back", imageUrl: "/images/products/samples/glass-2.jpg" },
  { angle: "Side", imageUrl: "/images/products/samples/glass-3.jpg" },
]

function SingleProductPage() {
  const router = useRouter()
  const [like, setLike] = useState(false)
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
        <div className="flex text-sm sm:text-base gap-1 sm:gap-3">
          {/* Breadcrumbs  */}
          <div className="flex items-center">
            <Link href="#" className="font-manrope font-medium text-black dark:text-white">
              Shop
            </Link>
            <FiChevronRight size={18} className="mt-1 dark:text-[#4C545E]" />
          </div>
          <div className="flex items-center">
            <Link href="#" className="font-manrope font-medium text-black dark:text-white">
              Eye wear
            </Link>
            <FiChevronRight size={18} className="mt-1 dark:text-[#4C545E]" />
          </div>
          <div className="flex items-center">
            <Link href="#" className="font-manrope font-medium text-black dark:text-white">
              Anti glare glasses
            </Link>
          </div>
        </div>
      </nav>
      <article className="flex flex-col md:flex-row gap-4 mb-10">
        {/* Container for displayed image and other images  */}
        <div className="w-full md:w-1/2 max-w-[700px]">
          {/* Container for image and like button  */}
          <AnimatePresence>
            {images.map((image) => (
              <motion.div
                className="relative mb-3"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: image.angle === currentAngle ? 1 : 0,
                }}
                exit={{ opacity: 0 }}
                key={image.imageUrl}
                style={{
                  display: image.angle === currentAngle ? "block" : "none",
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <button
                  className="absolute z-10 right-2 top-2"
                  onClick={() => {
                    setLike((prev) => !prev)
                  }}
                >
                  {like ? (
                    <GoHeartFill color="red" size={23} />
                  ) : (
                    <GoHeart color="#21242A" size={23} />
                  )}
                </button>
                <img
                  src={image.imageUrl}
                  alt="Product image"
                  className="w-full h-[300px] sm:h-[500px] md:h-[666px] object-cover"
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Other images */}
          <div className="grid gap-2 grid-cols-3">
            <div className="" onClick={() => setCurrentAngle("Front")}>
              <img
                src="/images/products/samples/glass-1.jpg"
                alt="Front picture"
                className="mb-1 sm:mb-3 h-28 sm:h-48 w-full object-cover"
              />
              <p className="text-sm">Front</p>
            </div>
            <div className="" onClick={() => setCurrentAngle("Back")}>
              <img
                src="/images/products/samples/glass-2.jpg"
                alt="Front picture"
                className="mb-1 sm:mb-3 h-28 sm:h-48 w-full object-cover"
              />
              <p className="text-sm">Back</p>
            </div>
            <div className="" onClick={() => setCurrentAngle("Side")}>
              <img
                src="/images/products/samples/glass-3.jpg"
                alt="Front picture"
                className="mb-1 sm:mb-3 h-28 sm:h-48 w-full object-cover"
              />
              <p className="text-sm">Side</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="font-serifDisplay text-4xl mb-5" aria-label="Product name">
            Simple antiglare eyewear
          </h2>
          <p className="flex gap-2 items-center text-xl mb-7" aria-label="Product price">
            <span>₦</span> <span>7,000</span>
          </p>
          <section aria-label="Product description" className="mb-7">
            <h3 className="font-serifDisplay italic text-3xl mb-4">Description</h3>
            <p className="text-sm">
              Christian Dior dresses epitomise timeless elegance, blending exquisite craftsmanship
              with avant-garde designs. Renowned for revolutionising post-war fashion, Dior's
              creations exude sophistication, often featuring luxurious fabrics, meticulous
              tailoring, and iconic silhouettes
            </p>
          </section>
          <div className="">
            <p className="mb-3 font-medium">Colors</p>
            <ul className="flex items-center gap-1 mb-5">
              {colors.map((color) => (
                <li key={color}>
                  <button
                    style={{ backgroundColor: color }}
                    className={
                      "size-6 rounded-full " + (color === "#020A1B" && "dark:border border-border")
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

            <AccordionItem
              header="Details"
              list={["Sturdy acetate glasses", "Strong plastic handles"]}
            />
            <AccordionItem
              header="Care"
              list={[
                "Clean your glasses daily with a microfiber cloth and lens-safe cleaner.",
                "Store them in a protective case when not in use to prevent scratches and damage",
              ]}
            />
            <AccordionItem
              header="Shipping"
              list={["Store in a cool dry place", "Pour oil on it"]}
            />

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
          <ul className="grid sm:hidden gap-2 md:gap-10 grid-cols-2 md:grid-cols-3 justify-between">
            {glasses.map((product) => (
              <ProductCard key={Math.random() * 1593948} {...product} />
            ))}
          </ul>
          <div className="overflow-x-auto scrollbar-hide hidden sm:block">
            <ul
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:min-w-[1500px]"
              aria-label="List of related products"
            >
              <RelatedProductCard />
              <RelatedProductCard />
              <RelatedProductCard />
              <RelatedProductCard />
              <RelatedProductCard />
            </ul>
          </div>
        </section>
      </aside>
    </div>
  )
}

export default SingleProductPage

const RelatedProductCard = () => {
  return (
    <div className="sm:min-w-[200px] lg:min-w-[300px]">
      <ProductCard />
    </div>
  )
}
