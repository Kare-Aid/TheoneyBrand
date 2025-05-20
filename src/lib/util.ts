import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**For generating unique ID's */
export function genID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
}

export const truncateText = (text: string, length: number) => {
  if (!text) return ""
  if (text.length <= length) return text
  return text.slice(0, length) + "..."
}
