import { NextRequest } from "next/server"
import { getPayload } from "payload"
import configPromise from "@payload-config"
import { Stock } from "@/payload-types"

// CHANGE QUANTITY OF ITEM IN CART
export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ cartItemId: string }> },
) => {
  const { cartItemId } = await params
  const { searchParams } = new URL(request.url)
  const action = searchParams.get("action") as "increment" | "decrement"
  try {
    const payload = await getPayload({ config: configPromise })

    const cartItem = await payload.findByID({ id: cartItemId, collection: "cart-items" })

    const { quantity } = cartItem

    const stockQuantity = (cartItem.stock as Stock).quantity

    if (action == "increment" && quantity + 1 > stockQuantity) {
      return Response.json(
        { message: "Quantity above available stock", error: "NOT_ALLOWED" },
        { status: 403 },
      )
    }

    if (action === "decrement" && quantity - 1 < 1) {
      await payload.delete({ collection: "cart-items", id: cartItem.id })
      return Response.json({ message: "Item removed from cart", data: {} }, { status: 200 })
    }

    await payload.update({
      collection: "cart-items",
      id: cartItemId,
      data: { quantity: action === "increment" ? quantity + 1 : quantity - 1 },
    })

    return Response.json({ message: "Cart item updated", data: {} }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json(
      { message: "Error while updating cart quantity", error: "Internal server error" },
      { status: 500 },
    )
  }
}

// DELETE ITEM FROM CART
export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ cartItemId: string }> },
) => {
  const { cartItemId } = await params
}
