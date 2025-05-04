"use client"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { IoMdArrowDropdown } from "react-icons/io"
import { genID } from "@/lib/util"

type Props = { header: string; list: string[] }

function AccordionItem({ header, list }: Props) {
  const [showDropdown, setShowDropdown] = useState(false)
  return (
    <div className="mb-2">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <h3 className="font-serifDisplay italic text-3xl mb-4">{header}</h3>
        <IoMdArrowDropdown />
      </div>
      <AnimatePresence>
        {showDropdown && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="pt-1 pb-5 list-disc px-4 border-b-2 border-border space-y-1"
          >
            {list.map((item) => (
              <li className="dark:text-[#FFFFFFD1] text-sm md:text-base" key={genID()}>
                {item}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AccordionItem
