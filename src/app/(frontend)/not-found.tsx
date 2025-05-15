import React from "react"
import Image from "next/image"
import Link from "next/link"

function NotFound() {
  return (
    <div className="max-w-screen-2xl mx-auto flex items-center justify-center min-h-[80vh]">
      <div>
        <Image
          src="/images/not-found.png"
          alt="Error Image"
          className="my-10 w-11/12 sm:w-1/2 mx-auto"
          width={1777}
          height={984}
        />
        <div className="flex gap-3 items-center justify-center">
          <button className="border border-border font-semibold px-9 py-2 rounded-full bg-[#1615153B] dark:bg-[#FFFFFF3B] text-center wavy-button">
            Back
          </button>
          <Link href="/" className="bg-primary text-[#FBFBFB] px-10 py-2 rounded-full">
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
