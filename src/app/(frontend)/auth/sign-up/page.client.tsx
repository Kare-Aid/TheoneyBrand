"use client"
import React, { FormEvent } from "react"

function Signup() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }
  return (
    <section className="border w-full sm:w-10/12 lg:w-2/3 dark:bg-[#011A1608] border-[#FFFFFF0A] p-5 -mt-28 sm:mt-0">
      <h2 className="font-serifDisplay text-3xl mb-5">Create account</h2>
      <p className="text-lg sm:text-xl mb-8">Sign up to join the coolest club #TOBclub</p>
      <form className="grid gap-3 gap-y-5 grid-cols-2" autoComplete="off" onSubmit={handleSubmit}>
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
          />
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
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
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
        <div className="col-span-2 sm:col-span-1">
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
        <button className="col-span-2 text-primary dark:text-white bg-[#F3FFFD] dark:bg-primary py-3 mt-5 rounded-full font-semibold">
          Create account
        </button>
      </form>
    </section>
  )
}

export default Signup
