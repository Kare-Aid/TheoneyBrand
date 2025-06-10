"use client"
import React, { useEffect } from "react"
import { BsArrowLeft } from "react-icons/bs"
import { FiChevronRight } from "react-icons/fi"
import ProductCard from "@/components/global/ProductCard"
import SkeletonLoaders from "@/components/global/SkeletonLoaders"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { PaginatedDocs } from "payload"
import { Media } from "@/payload-types"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { profileSchema } from "@/lib/schemas"
import { toast } from "sonner"
import { LuLoaderCircle } from "react-icons/lu"
import { useProfileQuery } from "@/lib/queries"

type UpdateProfileResponse = {
  message: string
  data: {
    docs: [
      {
        email: string
        firstName: string
        lastName: string
        address: string
        phoneNumber: string
      },
    ]
    errors: []
  }
}

type Product = {
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

type Like = {
  id: string
  product: Product
}

type Likes_ = { message: string; data: PaginatedDocs<Like> }

type ProfileSchema = z.infer<typeof profileSchema>

/**Update profile client component */
function Profile() {
  const {
    data: response,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => axios.get<Likes_>("/api/wishlist"),
  })

  // Abstract this out
  const { data: profileResponse, refetch: refetchProfile } = useProfileQuery()

  const { data: userSession, update } = useSession()

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
  })

  useEffect(() => {
    if (userSession || profileResponse) {
      reset({
        firstName: userSession?.user.name?.split(" ")[0],
        lastName: userSession?.user.name?.split(" ")[1],
        email: userSession?.user.email || "",
        phoneNumber: profileResponse?.data.data.phoneNumber || "",
        address: profileResponse?.data.data.address || "",
      })
    }
  }, [userSession, profileResponse])

  const onSubmit: SubmitHandler<ProfileSchema> = async (payload) => {
    try {
      const { data } = await axios.patch<UpdateProfileResponse>("/api/profile", payload)
      refetchProfile()
      const { email, firstName, lastName } = data.data.docs[0]
      if (!userSession) return
      const user = userSession?.user
      user.email = email
      user.firstName = firstName
      user.lastName = lastName
      await update({ ...user })
      toast.success("Profile update successful")
    } catch (error) {
      console.error(error)
      toast.error("Could not update profile, please try againa later")
    }
  }

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
          <form
            autoComplete="off"
            className="grid gap-3 gap-y-5 grid-cols-2"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-sm mt-1 text-red-500 dark:text-red-700">
                  {errors.firstName.message}
                </p>
              )}
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
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-sm mt-1 text-red-500 dark:text-red-700">
                  {errors.lastName.message}
                </p>
              )}
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
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm mt-1 text-red-500 dark:text-red-700">
                  {errors.email.message}
                </p>
              )}
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
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <p className="text-sm mt-1 text-red-500 dark:text-red-700">
                  {errors.phoneNumber.message}
                </p>
              )}
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
                {...register("address")}
              />
              {errors.address && (
                <p className="text-sm mt-1 text-red-500 dark:text-red-700">
                  {errors.address.message}
                </p>
              )}
            </div>
            <button
              disabled={isSubmitting}
              className="block mx-auto col-span-2 w-full bg-primary text-center text-white md:mx-auto py-3 rounded-full uppercase font-medium"
            >
              {isSubmitting ? (
                <LuLoaderCircle size={22} className="animate-spin mx-auto" />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </section>
      <section>
        <header>
          <h2 className="font-serifDisplay text-3xl mb-4">Wishlist</h2>
        </header>

        {isLoading && (
          <div className="grid gap-4 md:gap-10 grid-cols-2 md:grid-cols-3 justify-between mb-10">
            <SkeletonLoaders number={6} />
          </div>
        )}

        {response && response.data.data.docs.length < 1 && (
          <div className="h-[40vh] flex items-center justify-center">
            <p className="font-serifDisplay text-center text-2xl sm:text-3xl md:text-4xl">
              You haven&apos;t added any item to your wishlist
            </p>
          </div>
        )}

        {response && (
          <ul
            aria-label="Wishlist"
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {response.data.data.docs.map((like) => (
              <ProductCard
                key={like.id}
                id={like.product.id}
                name={like.product.name}
                fitsWith={like.product.fitsWith!}
                price={like.product.price}
                likeId={like.id}
                imageUrl={(like.product.images[0].image as Media).url as string}
              />
            ))}
          </ul>
        )}

        <div className="mt-10">
          <button
            className="bg-red-600 text-white px-3 py-2 rounded-xl"
            onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
          >
            Sign Out
          </button>
        </div>
      </section>
    </div>
  )
}

export default Profile
