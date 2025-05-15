"use client"
import React from "react"
import { useRouter } from "next/navigation"

//Todo Re-configure
function BackButton() {
  const router = useRouter()
  return (
    <button
      onClick={router.back}
      className="border border-border font-semibold px-9 py-2 rounded-full bg-[#1615153B] dark:bg-[#FFFFFF3B] text-center wavy-button"
    >
      Back
    </button>
  )
}

export default BackButton
