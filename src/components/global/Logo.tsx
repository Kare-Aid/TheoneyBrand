"use client"
import Image from "next/image"
import useDarkModeObserver from "@/hooks/useDarkModeObserver"

function Logo() {
  const isDark = useDarkModeObserver()
  return (
    <Image
      src={isDark ? "/images/Logo.png" : "/images/Logo-black.png"}
      alt="Website's logo"
      width={40}
      height={40}
      className="size-10"
    />
  )
}

export default Logo
