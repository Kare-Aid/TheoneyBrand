import { NextRequest } from "next/server"
import { getPayload } from "payload"
import configPromise from "@payload-config"
import { auth } from "@/auth"
import { addCartSchema } from "@/lib/schemas"
import { z } from "zod"

/** GET ALL PRODUCTS IN YOUR CART */
export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url)
    const query = Object.fromEntries(searchParams.entries())
    const payload = await getPayload({ config: configPromise })
    if (query.cartId) {
      const cartItems = await payload.find({ collection: "cart-items", sort: "createdAt" })
      return Response.json({ message: "Success", data: cartItems.docs }, { status: 200 })
    }
    const session = await auth()
    if (!session) {
      return Response.json({ message: "Success", data: [] }, { status: 200 })
    }
    const cart = await payload.find({
      collection: "carts",
      where: { purchased: { equals: false }, user: { equals: session.user.id } },
    })
    if (cart.totalDocs < 1) {
      return Response.json({ message: "Success", data: [] }, { status: 200 })
    }
    const cartItems = await payload.find({
      collection: "cart-items",
      sort: "createdAt",
      where: { cart: { equals: cart.docs[0].id } },
    })
    return Response.json({ message: "Success", data: cartItems.docs }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json(
      { message: "Error occured while fetching cart items", error: "Internal server error" },
      { status: 500 },
    )
  }
}

/**Find non-purchased cart for users or non-users */
async function findOrCreateCart(userId: string): Promise<string> {
  const payload = await getPayload({ config: configPromise })
  if (userId) {
    const result = await payload.find({
      collection: "carts",
      where: { user: { equals: userId }, purchased: { equals: false } },
    })
    if (result.docs.length > 0) return result.docs[0].id
  }
  const newCart = await payload.create({
    collection: "carts",
    data: userId ? { user: userId } : { purchased: false },
  })
  return newCart.id
}

/**ADD A PRODUCT TO YOUR CART FROM PRODUCT COMPONENT OR SINGLE PRODUCT PAGE */
export const POST = async (request: NextRequest) => {
  const data = await request.json()
  const result = addCartSchema.safeParse(data)
  if (!result.success) {
    return Response.json(
      { message: "Validation failed", error: result.error.flatten() },
      { status: 400 },
    )
  }
  const session = await auth()
  const userId = session ? session.user.id : ""
  const { productId, cartId: _cartId, quantity, stockId } = result.data
  try {
    const payload = await getPayload({ config: configPromise })
    const cartId = _cartId || (await findOrCreateCart(userId))
    if (productId) {
      //? Request from Add to Cart button on single product component
      const stocks = await payload.find({
        collection: "stock",
        where: { "product.id": { equals: productId } },
      })
      if (stocks.totalDocs < 1) {
        return Response.json(
          { message: "Cannot add this product to cart at this time", error: "No stock available" },
          { status: 403 },
        )
      }
      // Select random stock from available stock
      const randomStockId = stocks.docs[Math.floor(Math.random() * stocks.docs.length)].id
      const newCartItem = await payload.create({
        collection: "cart-items",
        data: { cart: cartId, quantity: 1, stock: randomStockId },
      })

      return Response.json(
        { message: "Product added to cart", data: { ...newCartItem, user: userId ? {} : null } },
        { status: 201 },
      )
    }
    if (quantity && stockId) {
      const cartItems = await payload.find({
        collection: "cart-items",
        where: { "cart.id": { equals: cartId } },
      })
      if (cartItems.totalDocs > 0) {
        const existingCartItems = await payload.find({
          collection: "cart-items",
          where: { "stock.id": { equals: stockId } },
        })
        if (existingCartItems.totalDocs > 0) {
          return Response.json(
            { message: "Item already in cart", error: "ITEM_IN_CART" },
            { status: 403 },
          )
        }
      }
      const newCartItem = await payload.create({
        collection: "cart-items",
        data: { cart: cartId, quantity: Number(quantity), stock: stockId },
      })
      return Response.json(
        { message: "Product added to cart", data: { ...newCartItem, user: userId ? {} : null } },
        { status: 201 },
      )
    }
  } catch (error) {
    console.error(error)
    return Response.json(
      { message: "Error occured while adding item to cart", error: "Internal server error" },
      { status: 500 },
    )
  }
}

const schema = z.object({ cartId: z.string().min(20).max(26) })

/**UPDATE CART WITH USER ID AFTER LOGGING IN */
export const PATCH = async (request: NextRequest) => {
  const data = await request.json()
  const result = schema.safeParse(data)
  if (!result.success) {
    return Response.json(
      { message: "Validation failed", error: result.error.flatten() },
      { status: 400 },
    )
  }
  const session = await auth()
  if (!session) {
    // Request should not hit if session is not available
    return Response.json(
      { error: "Unauthorized", message: "You cannot access this resource" },
      { status: 401 },
    )
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const nonPurchasedCarts = await payload.find({
      collection: "carts",
      where: { purchased: { equals: false }, "user.id": { equals: session.user.id } },
    })
    if (nonPurchasedCarts.totalDocs < 1) {
      await payload.update({
        collection: "carts",
        id: result.data.cartId,
        data: { user: session.user.id },
      })
      return Response.json({ message: "Success", data: {} }, { status: 200 })
    }
    // Find all cartItems with the current cart (result.data.cartId)
    const cartItems = await payload.find({
      collection: "cart-items",
      where: { "cart.id": { equals: result.data.cartId } },
    })
    // Update their cartId to be the cartId of the exising user's cart
    for (const item of cartItems.docs) {
      await payload.update({
        collection: "cart-items",
        id: item.id,
        data: { cart: nonPurchasedCarts.docs[0].id },
      })
    }
    // Delete the cart with the id (result.data.cartId) from the database
    await payload.delete({ collection: "carts", id: result.data.cartId })
    return Response.json({ message: "Success", data: {} }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json(
      { message: "Error occured while updating cart", error: "Internal server error" },
      { status: 500 },
    )
  }
}
