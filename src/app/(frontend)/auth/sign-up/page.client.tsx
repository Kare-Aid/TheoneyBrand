"use client"
import React, { useState } from "react"
import { toast } from "sonner"
import axios, { AxiosError } from "axios"
import { useMutation } from "@tanstack/react-query"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { signupSchema } from "@/types/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { IoEye, IoEyeOff } from "react-icons/io5"
import { LuLoaderCircle } from "react-icons/lu"
import { useRouter } from "next/navigation"

type SignupSchema = z.infer<typeof signupSchema>

function Signup() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({ resolver: zodResolver(signupSchema) })

  const [showPassword, setShowPassword] = useState(false)

  function toggleShowPassword() {
    setShowPassword((prev) => !prev)
  }

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: SignupSchema) => axios.post("/api/auth/sign-up", data),
  })

  const router = useRouter()
  const onSubmit: SubmitHandler<SignupSchema> = async (data) => {
    try {
      const response = await mutateAsync(data)
      reset()
      toast.success("Sign up successful")
      router.replace("/auth/login?email=" + response.data.email)
    } catch (error) {
      console.error(error)
      if (error instanceof AxiosError) {
        //console.log("Axios error")
      }
      toast.error("Error occured while signing up")
    }
  }
  return (
    <section className="border w-full sm:w-10/12 lg:w-2/3 dark:bg-[#011A1608] border-[#FFFFFF0A] p-5 -mt-28 sm:mt-0">
      <h2 className="font-serifDisplay text-3xl mb-5">Create account</h2>
      <p className="text-lg sm:text-xl mb-8">Sign up to join the coolest club #TOBclub</p>
      <form
        className="grid gap-3 gap-y-5 grid-cols-2"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="firstName"
            className="block uppercase mb-3 text-xs text-white dark:text-[#CCCFCE]"
          >
            First name
          </label>
          <input
            type="text"
            id="firstName"
            className="w-full bg-[#FFFFFFCC] p-2 rounded-xl outline-none caret-slate-700 text-black"
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
            className="block uppercase mb-3 text-xs text-white dark:text-[#CCCFCE]"
          >
            Last name
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full bg-[#FFFFFFCC] p-2 rounded-xl outline-none caret-slate-700 text-black"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-sm mt-1 text-red-500 dark:text-red-700">{errors.lastName.message}</p>
          )}
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="email"
            className="block uppercase mb-3 text-xs text-white dark:text-[#CCCFCE]"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-full bg-[#FFFFFFCC] p-2 rounded-xl outline-none caret-slate-700 text-black"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm mt-1 text-red-500 dark:text-red-700">{errors.email.message}</p>
          )}
        </div>
        <div className="col-span-2 sm:col-span-1">
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
              className="w-full h-full rounded-xl bg-transparent outline-none caret-slate-700 text-black"
              {...register("password")}
            />
            {!showPassword ? (
              <IoEye size={20} className="text-black cursor-pointer" onClick={toggleShowPassword} />
            ) : (
              <IoEyeOff
                size={20}
                className="text-black cursor-pointer"
                onClick={toggleShowPassword}
              />
            )}
          </div>
          {errors.password && (
            <p className="text-sm mt-1 text-red-500 dark:text-red-700">{errors.password.message}</p>
          )}
        </div>
        <button
          disabled={isPending}
          className="col-span-2 text-primary dark:text-white bg-[#F3FFFD] dark:bg-primary py-3 mt-5 rounded-full font-semibold disabled:opacity-70"
        >
          {isPending ? (
            <LuLoaderCircle size={22} className="animate-spin mx-auto" />
          ) : (
            "Create account"
          )}
        </button>
      </form>
    </section>
  )
}

export default Signup
