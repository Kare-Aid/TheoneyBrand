import HeroSection from "@/components/home/HeroSection"
import Link from "next/link"
import { FiArrowUpLeft, FiArrowUpRight } from "react-icons/fi"
import { products, reasonsForChoosingUs, reviews } from "@/lib/data/homepage"
import Image from "next/image"
import FeaturedClients from "@/components/home/FeaturedClients"
import AnimatedTestimonials from "@/components/home/AnimatedTestimonials"
import BackgroundTwo from "@/components/home/BackgroundTwo"

export default async function HomePage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-7 md:px-12">
      {/* Add text information for hero section to be rendered server side */}
      <HeroSection />

      <hr className="-mx-3 sm:-mx-12 border-t-2 border-[#14131333] dark:border-[#FFFFFF33]" />

      <section className="my-14">
        <header className="mb-8">
          <h3 className="text-[#131212A6] dark:text-[#FFFFFFA6] text-lg font-semibold mb-3">
            Trending now: styles that last
          </h3>
          <p className="font-serifDisplay text-2xl sm:text-3xl md:text-4xl text-border dark:text-white">
            Discover our top picks, crafted for trendsetters who demand both elegance and
            protection. Shop bestsellers or explore the latest arrivals!
          </p>
        </header>
        <div>
          <nav className="flex justify-end md:pr-16 lg:pr-24 mb-5">
            <Link href="/products" className="font-semibold text-primary dark:text-white">
              View all products
            </Link>
          </nav>
          <div className="overflow-x-auto scrollbar-hide">
            <ul className="grid gap-3 grid-cols-3 md:px-16 lg:px-24 relative min-w-[700px]">
              <button className="absolute top-1/2 -translate-y-1/2 left-6 p-1 rounded-full bg-border text-white dark:bg-white dark:text-black hidden md:inline">
                <FiArrowUpLeft size={25} />
              </button>
              {products.map((product) => (
                <li key={product.id}>
                  <Link href="/products/12345" className="block">
                    <figure className="cursor-pointer">
                      <div className="h-80 min-w-[200px] overflow-hidden rounded-lg">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover mb-2 hover:scale-110 transition-transform duration-500"
                          width={555}
                          height={370}
                        />
                      </div>
                      <figcaption>
                        <p className="text-lg">{product.name}</p>
                        <p className="flex gap-1 font-semibold">
                          <span>₦</span> <span>{product.price.toLocaleString()}</span>
                        </p>
                      </figcaption>
                    </figure>
                  </Link>
                </li>
              ))}
              <button className="absolute top-1/2 -translate-y-1/2 right-6 p-1 rounded-full bg-border text-white dark:bg-white dark:text-black hidden md:inline">
                <FiArrowUpRight size={25} />
              </button>
            </ul>
          </div>
        </div>
      </section>

      <hr className="-mx-3 sm:-mx-12 border-t-2 border-[#14131333] dark:border-[#FFFFFF33]" />

      <section className="my-14">
        <header className="mb-20 sm:mb-32">
          <h3 className="text-[#131212A6] dark:text-[#FFFFFFA6] text-lg font-semibold mb-3">
            Why choose us?
          </h3>
          <p className="font-serifDisplay text-4xl text-border dark:text-white">
            Designed for life, <br className="sm:hidden" /> Styled for you
          </p>
        </header>

        <div className="overflow-x-auto scrollbar-hide mb-10 sm:mb-32">
          <ul
            aria-describedby="Reasons for choosing us"
            className="grid grid-cols-4 gap-3  min-w-[900px]"
          >
            {reasonsForChoosingUs.map((reason) => (
              <li
                className="border border-border rounded-2xl p-5 min-w-[212px]"
                key={Math.random() * 230987}
              >
                <div className="bg-border text-white dark:bg-white dark:text-black w-max p-2 rounded-full mb-6">
                  <reason.Icon />
                </div>
                <h5 className="font-serifDisplay mb-2 text-sm">{reason.title}</h5>
                <p className="font-light text-sm max-w-[200px]">{reason.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center">
          <Link
            href="#"
            className="border border-border text-border font-semibold px-9 py-2 rounded-full bg-[#1615153B] dark:text-white dark:bg-[#FFFFFF3B] block w-full md:w-max text-center wavy-button"
          >
            Experience the difference
          </Link>
        </div>
      </section>

      <hr className="-mx-3 sm:-mx-12 border-t-2 border-[#14131333] dark:border-[#FFFFFF33]" />

      <section className="mt-14 mb-32">
        <header className="mb-20 sm:mb-24">
          <h3 className="text-[#131212A6] dark:text-[#FFFFFFA6] text-lg font-semibold mb-3">
            Styled by you,
          </h3>
          <p className="font-serifDisplay text-3xl sm:text-4xl text-border dark:text-white">
            Real people, real style. <br className="sm:hidden" /> see how our customers rock our
            products.
          </p>
        </header>
        <FeaturedClients />
        <Link
          href="#"
          className="border border-border text-border font-semibold px-9 py-2 rounded-full bg-[#1615153B] dark:text-white dark:bg-[#FFFFFF3B] block w-full md:w-max text-center wavy-button"
        >
          Get featured!
        </Link>
      </section>

      <section className="my-20 overflow-hidden">
        <header className="mb-20">
          <h3 className="text-[#131212A6] dark:text-[#FFFFFFA6] text-lg font-semibold mb-3">
            What people say about us:
          </h3>
          <p className="font-serifDisplay text-3xl sm:text-4xl text-border dark:text-white">
            Dont just take our word for it, hear from our customers
          </p>
        </header>
        <AnimatedTestimonials testimonials={reviews} autoplay />
        {/* <OneyAnimatedTestimonials testimonials={reviews} autoplay /> */}
      </section>

      <section className="mt-36 mb-20">
        <header className="mb-16">
          <h3 className="text-[#131212A6] dark:text-[#FFFFFFA6] text-lg font-semibold mb-7 sm:mb-3 text-left md:text-center">
            Upgrade Your Style. Protect What Matters.
          </h3>
          <p className="font-serifDisplay text-3xl sm:text-4xl text-border dark:text-white text-left md:text-center">
            Shop premium eyewear and accessories built for style,
            <br className="hidden md:block" /> strength, and everyday confidence.
          </p>
        </header>

        <BackgroundTwo />

        <div className="flex flex-col md:flex-row gap-2">
          <Link
            href="#"
            className="border border-border text-border font-semibold px-9 py-2 rounded-full bg-[#1615153B] dark:text-white dark:bg-[#FFFFFF3B] block w-full md:w-max text-center wavy-button"
          >
            Shop now
          </Link>
          <Link
            href="#"
            className="bg-primary text-[#FBFBFB] dark:bg-[#FBFBFB] dark:text-primary border border-border dark:border-0 px-14 py-2 rounded-full w-full md:w-max font-semibold text-center"
          >
            Try AR
          </Link>
        </div>
      </section>
    </div>
  )
}
