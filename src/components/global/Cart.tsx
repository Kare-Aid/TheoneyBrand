import { IoCloseCircleOutline } from "react-icons/io5"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

type Props = { showCart: boolean; closeCart: () => void }

function Cart({ showCart, closeCart }: Props) {
  return (
    <AnimatePresence>
      {showCart && (
        <motion.div
          initial={{ top: "-100%" }}
          animate={{ top: 0 }}
          exit={{ top: "-100%" }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
          className="bg-background fixed z-[60] top-0 left-1/2 -translate-x-1/2 w-full h-screen max-h-[2000px] border-red-700 max-w-screen-2xl px-4 sm:px-7 md:px-12 overflow-y-auto pb-24 md:pb-10"
        >
          <hr className="border-t-2 border-[#14131333] dark:border-[#FFFFFF33] mt-14 mb-4" />
          <header className="flex gap-4 items-center mb-5">
            <h2 className="font-serifDisplay uppercase text-4xl">Bag</h2>
            <div className="border border-border p-1 text-xs">
              <p className="uppercase">5 items</p>
            </div>
            <button className="ml-auto" onClick={closeCart}>
              <IoCloseCircleOutline size={30} />
            </button>
          </header>
          <ul aria-label="List of cart items" className="mb-20 space-y-4">
            <li className="" aria-label="Cart Item">
              <div className="flex items-start gap-2 sm:gap-5">
                {/* Picture  */}
                <Image
                  src="/images/cart/pink_fancy_pouch.jpg"
                  alt="Product picture"
                  className=" min-w-[100px] h-36 sm:h-48 sm:min-w-[200px] w-2/12 object-cover"
                  width={100}
                  height={192}
                />

                {/* All other text  */}
                <div className="flex-grow">
                  <h4 className="text-xl md:text-2xl font-serifDisplay mb-3">
                    Patterned phone cases
                  </h4>
                  <div className="flex gap-2 w-full items-center mb-12 sm:mb-20">
                    <div className="size-5 rounded-full bg-black dark:border border-border" />
                    <p className="flex gap-1 sm:gap-2 text-sm md:text-base">
                      <span>Black</span>
                      <span>/</span>
                      <span>Iphone 13 pro max</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div className="border border-border flex gap-2 sm:gap-4 items-center justify-around px-2 sm:px-3 py-1">
                      <button className="text-xl">-</button>
                      <p className="px-5 text-center">1</p>
                      <button className="text-xl">+</button>
                    </div>
                    <p
                      className="flex gap-1 sm:gap-2 items-center text-lg sm:text-xl"
                      aria-label="Product price"
                    >
                      <span>₦</span> <span>7,000</span>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <hr className="border-t-2 border-[#14131333] dark:border-[#FFFFFF33] mt-10 mb-4" />
          <div className="flex items-center justify-between mb-10">
            <p className="uppercase font-medium">Subtotal</p>
            <p className="font-semibold text-xl">$240.00</p>
          </div>

          {/* Close cart when this clicked  */}
          <Link
            href="#"
            className="block mx-2 w-full md:w-10/12 bg-primary text-center text-white md:mx-auto py-3 rounded-full uppercase font-medium"
          >
            Continue to checkout
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Cart
