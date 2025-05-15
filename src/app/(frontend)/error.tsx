"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"

function Error({ reset, error }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.log(error)
  }, [])
  return (
    <div className="max-w-screen-2xl mx-auto flex items-center justify-center min-h-[80vh]">
      <div>
        <Image
          src="/images/error.png"
          alt="Error Image"
          className="my-10 w-11/12 sm:w-2/3 mx-auto"
          width={1777}
          height={984}
        />
        <div className="flex gap-3 items-center justify-center">
          <button
            onClick={reset}
            className="border border-border font-semibold px-9 py-2 rounded-full bg-[#1615153B] dark:bg-[#FFFFFF3B] text-center wavy-button"
          >
            Retry
          </button>
          <Link href="/" className="bg-primary text-[#FBFBFB] px-10 py-2 rounded-full">
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Error
