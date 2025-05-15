"use client"
import React, { FormEvent } from "react"
import Link from "next/link"

function Login() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }
  return (
    <section className="border w-full sm:w-10/12 lg:w-2/3 dark:bg-[#011A1608] border-[#FFFFFF0A] p-5 -mt-28 sm:mt-0">
      <h2 className="font-serifDisplay text-3xl mb-5">Login</h2>
      <p className="text-lg sm:text-xl mb-8">Welcome back to the coolest club.</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
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
            />
          </div>
          <div className="">
            <label
              htmlFor="password"
              className="block uppercase mb-3 text-xs text-white dark:text-[#CCCFCE]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full bg-[#FFFFFFCC] p-2 rounded-xl outline-none caret-slate-700 text-black"
            />
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
        <button className="w-full text-primary dark:text-white bg-[#F3FFFD] dark:bg-primary py-3 mt-2 rounded-full font-semibold">
          Login
        </button>
      </form>
    </section>
  )
}

export default Login
