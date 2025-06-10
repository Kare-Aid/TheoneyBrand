"use client"
import React, { useState } from "react"
import Link from "next/link"
import { useForm, SubmitHandler } from "react-hook-form"
import { loginSchema } from "@/lib/schemas"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { IoEye, IoEyeOff } from "react-icons/io5"
import { LuLoaderCircle } from "react-icons/lu"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import { useWishlistStore } from "@/lib/store/wishlist"
import { useCartStore } from "@/lib/store/cart"
import { useQueryClient } from "@tanstack/react-query"
import { getCookie, deleteCookie } from "cookies-next"

type LoginSchema = z.infer<typeof loginSchema>

function Login() {
  const savedLikes = useWishlistStore((state) => state.likes)
  const deleteAllLikes = useWishlistStore((state) => state.deleteAllLikes)
  const { cartId, setCartId } = useCartStore()
  const searchParams = useSearchParams()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [showPassword, setShowPassword] = useState(false)
  function toggleShowPassword() {
    setShowPassword((prev) => !prev)
  }
  const _email = searchParams.get("email")
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    defaultValues: { email: _email || "" },
    resolver: zodResolver(loginSchema),
  })
  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      const response = await signIn("credentials", { ...data, redirect: false })
      if (response && !response.error) {
        toast.success("Login successful")
        // Send all likes in localStorage to be appended with userId
        if (savedLikes.length > 0) {
          //! Todo Error handling
          axios.patch("/api/wishlist", { likes: savedLikes })
          //Todo Invalidate wishlist query if refetch is disabled
          deleteAllLikes()
        }
        if (cartId) {
          //! Todo Error handling
          axios.patch("/api/cart_", { cartId })
          setCartId("")
        }
        queryClient.invalidateQueries({ queryKey: ["cart"] })
        const redirectedFrom = getCookie("redirectedFrom") as string
        if (!redirectedFrom) {
          router.replace("/profile")
          return 
        }
        router.replace(redirectedFrom)
        deleteCookie("redirectedFrom")
        return
      }
      toast.error("Invalid Email or password")
    } catch (error) {
      toast.error("Error occured while signing in")
    }
  }
  return (
    <section className="border w-full sm:w-10/12 lg:w-2/3 max-w-[700px] dark:bg-[#011A1608] border-[#FFFFFF0A] p-5 -mt-28 sm:mt-0">
      <h2 className="font-serifDisplay text-3xl mb-5">Login</h2>
      <p className="text-lg sm:text-xl mb-8">Welcome back to the coolest club.</p>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-7">
          <div className="">
            <label
              htmlFor="email"
              className="block uppercase mb-3 text-xs text-white dark:text-[#CCCFCE]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-[#FFFFFFCC] p-2 rounded-xl outline-none caret-slate-700 text-black"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm mt-1 text-red-500 dark:text-red-700">{errors.email.message}</p>
            )}
          </div>
          <div className="">
            <label
              htmlFor="password"
              className="block uppercase mb-3 text-xs text-white dark:text-[#CCCFCE]"
            >
              Password
            </label>
            <div className="bg-[#FFFFFFCC] p-2 flex items-center rounded-xl">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full bg-transparent outline-none caret-slate-700 text-black"
                {...register("password")}
              />
              {!showPassword ? (
                <IoEye
                  size={20}
                  className="text-black cursor-pointer"
                  onClick={toggleShowPassword}
                />
              ) : (
                <IoEyeOff
                  size={20}
                  className="text-black cursor-pointer"
                  onClick={toggleShowPassword}
                />
              )}
            </div>
            {errors.password && (
              <p className="text-sm mt-1 text-red-500 dark:text-red-700">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <Link className="text-right font-medium block mt-1 mb-3" href="/auth/forgot-password">
          Forgot password
        </Link>
        <p className="text-[#FFFFFFA6] text-base sm:text-lg">
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-up" className="font-semibold text-white">
            Sign up
          </Link>
        </p>
        <button
          disabled={isSubmitting}
          className="w-full text-primary dark:text-white bg-[#F3FFFD] dark:bg-primary py-3 mt-2 rounded-full font-semibold disabled:opacity-60"
        >
          {isSubmitting ? <LuLoaderCircle size={22} className="animate-spin mx-auto" /> : "Login"}
        </button>
      </form>
    </section>
  )
}

export default Login
