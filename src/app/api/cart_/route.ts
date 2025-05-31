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
      const cartItems = await payload.find({ collection: "cart-items" })
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
          { message: "Cannot add this product to stock at this time", error: "No stock available" },
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
      const newCartItem = await payload.create({
        collection: "cart-items",
        data: { cart: cartId, quantity: Number(quantity), stock: stockId },
      })
      return Response.json(
        { message: "Product added to cart", data: { ...newCartItem, user: userId ? {} : null } },
        { status: 201 },
      )
    }
    // Todo Do it for add to cart from single product page
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
    // Request is not supposed to hit if session is not available
    return Response.json(
      { error: "Unauthorized", message: "You cannot access this resource" },
      { status: 401 },
    )
  }

  try {
    const payload = await getPayload({ config: configPromise })
    await payload.update({
      collection: "carts",
      id: result.data.cartId,
      data: { user: session.user.id },
    })
    return Response.json({ message: "Success", data: {} }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json(
      { message: "Error occured while updating cart", error: "Internal server error" },
      { status: 500 },
    )
  }
}

/*
 ADD TO CART BUTTON ON SINGLE PRODUCT COMPONENT & ADD TO CART BUTTON ON SINGLE PRODUCT PAGE LOGIC
 * Would receive {productId?, stockId?, quantity?, cartId?}
 * If request comes from single component button {productId, cartId?}
 * If request comes from single product page {stockId, quantity, cartId?}
 ? Add to cart button would be disabled if the product is of any stock in any of the cart items
 Add to cart button send post request to cart endpoint with product id and cartId if it exists in local storage if user is not logged in
 If cartId exists(the one sent from local storage), create a cart item using the cart id
 If cartId(the one from local storage) is not sent(means user is logged in), check if there's a cart having the userId and a purchased value of false 
 If there's a cart available from the previous check, get the cartId and if there isn't, create for the user
 Use the product id(sent from the frontend) to find a random stock create the cart item with the cartId and the random stock found 
 Send cart information back 

 DELETE CART ITEM 

 CHANGE QUANTITY (increment and decrement)

 Add to cart button on product component would be disabled for phone cases, it would lead to product details page so users can choose which casing variation they want to use 

*/
