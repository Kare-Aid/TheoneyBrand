"use client"
import React from "react"
import { BsArrowLeft } from "react-icons/bs"
import { FiChevronRight } from "react-icons/fi"
import ProductCard from "@/components/global/ProductCard"
import { useRouter } from "next/navigation"
import Link from "next/link"

function Profile() {
  const router = useRouter()
  return (
    <div className="px-4 sm:px-7 md:px-12 pb-20">
      <header className="mt-8 mb-10">
        <button
          className="bg-[#ADC5C2] dark:bg-[#EBEBEB] p-3 rounded-full text-[#242320] mb-3"
          onClick={router.back}
        >
          <BsArrowLeft size={23} />
        </button>
        <nav className="flex gap-1 items-center text-lg">
          <Link href="#" className="font-manrope font-medium text-black dark:text-white">
            Profile
          </Link>

          <FiChevronRight size={18} className="mt-1 dark:text-[#4C545E]" />
        </nav>
      </header>
      <section aria-label="Profile information" className="mb-10">
        <h2 className="text-4xl font-serifDisplay mb-5">Profile</h2>
        <div className="border p-2 sm:p-5 border-border rounded-lg">
          <form autoComplete="off" className="grid gap-3 gap-y-5 grid-cols-2">
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="firstName"
                className="block uppercase mb-3 text-xs text-black dark:text-[#CCCFCE]"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full bg-[#FFFFFFCC] border dark:border-0 p-2 rounded-xl outline-none caret-slate-700 text-black"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="lastName"
                className="block uppercase mb-3 text-xs text-black dark:text-[#CCCFCE]"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full bg-[#FFFFFFCC] border dark:border-0 p-2 rounded-xl outline-none caret-slate-700 text-black"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="email"
                className="block uppercase mb-3 text-xs text-black dark:text-[#CCCFCE]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-[#FFFFFFCC] border dark:border-0 p-2 rounded-xl outline-none caret-slate-700 text-black"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="phone-number"
                className="block uppercase mb-3 text-xs text-black dark:text-[#CCCFCE]"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="phone-number"
                className="w-full bg-[#FFFFFFCC] border dark:border-0 p-2 rounded-xl outline-none caret-slate-700 text-black"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="address"
                className="block uppercase mb-3 text-xs text-black dark:text-[#CCCFCE]"
              >
                Address
              </label>
              <input
                type="tel"
                id="address"
                className="w-full bg-[#FFFFFFCC] border dark:border-0 p-2 rounded-xl outline-none caret-slate-700 text-black"
              />
            </div>
            <button className="block mx-2 col-span-2 w-full bg-primary text-center text-white md:mx-auto py-3 rounded-full uppercase font-medium">
              Submit
            </button>
          </form>
        </div>
      </section>
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

export default Profile
