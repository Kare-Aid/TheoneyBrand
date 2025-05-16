"use client"
import { BsArrowLeft } from "react-icons/bs"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FiChevronRight } from "react-icons/fi"
import ProductCard from "@/components/global/ProductCard"

function Page() {
  const router = useRouter()
  function throwError() {
    throw Error()
  }
  return (
    <div className="px-4 sm:px-7 md:px-12 pb-20">
      <header className="mt-8 mb-14">
        <button
          className="bg-[#ADC5C2] dark:bg-[#EBEBEB] p-3 rounded-full text-[#242320] mb-3"
          onClick={router.back}
        >
          <BsArrowLeft size={23} />
        </button>
        <button onClick={throwError}>Throw error </button>
        <nav className="flex gap-1 items-center text-lg">
          <Link href="#" className="font-manrope font-medium text-black dark:text-white">
            Wishlist
          </Link>

          <FiChevronRight size={18} className="mt-1 dark:text-[#4C545E]" />
        </nav>
      </header>
      <section>
        <header>
          <h2 className="font-serifDisplay text-3xl mb-4">Wishlist</h2>
        </header>
        <ul aria-label="Wishlist" className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ul>
      </section>
    </div>
  )
}

export default Page
