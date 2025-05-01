"use client"
import { useState, useEffect } from "react"

function useDarkModeObserver() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const target = document.documentElement
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const classList = (mutation.target as HTMLElement).classList
          setIsDarkMode(classList.contains("dark"))
        }
      })
    })

    //Listen for change in className in html tag
    observer.observe(target, { attributes: true, attributeFilter: ["class"] })

    return () => {
      observer.disconnect()
    }
  }, [])

  return isDarkMode
}

export default useDarkModeObserver
