import React, { useEffect, useState } from "react"
import { CartItem as CartItemType, Product, Stock, Variation } from "@/payload-types"
import { Media, Color } from "@/payload-types"
import Image from "next/image"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

//! Image url not in products that comes from stocks that comes cartItem
function CartItem(cartItem: CartItemType) {
  const stock = cartItem.stock as Stock
  const product = stock.product as Product
  const color = stock.color as Color
  const queryClient = useQueryClient()
  const [toastId, setToastId] = useState("")
  const { isPending: isUpdating, mutateAsync } = useMutation({
    mutationFn: (action: "increment" | "decrement") => {
      return axios.patch(`/api/cart_/${cartItem.id}?action=${action}`)
    },
    onSuccess: (response) => {
      toast.success(response.data.message, { id: toastId })
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message, { id: toastId })
    },
  })

  useEffect(() => {
    if (isUpdating) {
      const id = toast.loading("Updating") as string
      setToastId(id)
    }
  }, [isUpdating])
  return (
    <li className="" aria-label="Cart Item" key={cartItem.id}>
      <div className="flex items-start gap-2 sm:gap-5">
        {/* Picture  */}
        <Image
          //src={(product.images[0].image as Media).url as string}
          src="/images/cart/pink_fancy_pouch.jpg"
          alt="Product picture"
          className="min-w-[100px] h-36 sm:h-48 sm:min-w-[200px] w-2/12 object-cover"
          width={100}
          height={192}
        />
        {/* All other text  */}
        <div className="flex-grow">
          <h4 className="text-xl md:text-2xl font-serifDisplay mb-3">{product.name}</h4>
          <div className="flex gap-2 w-full items-center mb-12 sm:mb-20">
            <div
              className="size-5 rounded-full bg-black dark:border border-border"
              style={{ background: color.hexCode }}
            />
            <p className="flex gap-1 sm:gap-2 text-sm md:text-base">
              <span>{color.name}</span>
              {!product.fitsWith && (
                <>
                  <span>/</span>
                  <span>{(stock.variation as Variation)?.name}</span>
                </>
              )}
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="border border-border flex gap-2 sm:gap-4 items-center justify-around px-2 sm:px-3 py-1">
              <button
                className="text-xl"
                disabled={isUpdating}
                onClick={() => mutateAsync("decrement")}
              >
                -
              </button>
              <p className="px-5 text-center">{cartItem.quantity}</p>
              <button
                className="text-xl"
                disabled={isUpdating}
                onClick={() => mutateAsync("increment")}
              >
                +
              </button>
            </div>
            <p
              className="flex gap-1 sm:gap-2 items-center text-lg sm:text-xl"
              aria-label="Product price"
            >
              <span>₦</span> <span>{product.price.toLocaleString()}</span>
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CartItem
