import { IoCloseCircleOutline } from "react-icons/io5"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useCartItems } from "@/lib/queries"
import { CartItem, Product, Stock } from "@/payload-types"
import CartItemComponent from "./CartItem"

type Props = { showCart: boolean; closeCart: () => void }

// Todo Checkout with paystack
function Cart({ showCart, closeCart }: Props) {
  const { data: cartItems, isLoading } = useCartItems()

  function getProduct(cartItem: CartItem) {
    return (cartItem.stock as Stock).product as Product
  }
  const total = cartItems
    ? cartItems.data.data.reduce((acc, curr) => {
        return acc + getProduct(curr).price
      }, 0)
    : 0
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
              <p className="uppercase">{cartItems ? cartItems.data.data.length : 0} items</p>
            </div>
            <button className="ml-auto" onClick={closeCart}>
              <IoCloseCircleOutline size={30} />
            </button>
          </header>
          {isLoading && (
            <div className="space-y-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <div className="flex gap-2" key={index}>
                  <div className="bg-slate-400 min-w-[100px] sm:min-w-[200px] w-2/12 h-32 sm:h-48 animate-pulse" />
                  <div className="flex-grow p-2">
                    <div className="bg-slate-400 min-w-[150px] w-4/12 h-4 sm:h-6 rounded-md mb-2 animate-pulse" />
                    <div className="flex items-center gap-2">
                      <div className="size-4 sm:size-6 bg-slate-400 rounded-full animate-pulse" />
                      <div className="bg-slate-400 w-3/12 h-4 rounded-md animate-pulse" />
                    </div>
                    <div className="bg-slate-400 min-w-[100px] w-2/12 h-7 sm:h-10 rounded-md mb-2 animate-pulse mt-[45px] sm:mt-[71px]" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {cartItems && cartItems.data.data.length < 1 && (
            <div className="h-[40vh] flex gap-10 flex-col items-center justify-center">
              <p className="font-serifDisplay text-center text-2xl sm:text-3xl md:text-4xl">
                No items in cart
              </p>
              <Link
                onClick={closeCart}
                href="/products"
                className="bg-primary text-[#FBFBFB] px-10 py-2 rounded-full"
              >
                Shop now
              </Link>
            </div>
          )}
          {cartItems && cartItems.data.data.length > 0 && (
            <>
              <ul aria-label="List of cart items" className="mb-20 space-y-4">
                {cartItems.data.data.map((cartItem) => {
                  return <CartItemComponent {...cartItem} key={cartItem.id} />
                })}
              </ul>
              <hr className="border-t-2 border-[#14131333] dark:border-[#FFFFFF33] mt-10 mb-4" />
              <div className="flex items-center justify-between mb-10">
                <p className="uppercase font-medium">Subtotal</p>
                <p className="font-semibold text-xl">₦{total.toLocaleString()}</p>
              </div>
              <Link
                href="#"
                className="block mx-2 w-full md:w-10/12 bg-primary text-center text-white md:mx-auto py-3 rounded-full uppercase font-medium"
              >
                Continue to checkout
              </Link>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Cart
