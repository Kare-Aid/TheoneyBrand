import { NextRequest } from "next/server"
import { getPayload } from "payload"
import configPromise from "@payload-config"
import { auth } from "@/auth"
import { z } from "zod"

// Send Likes for a user
export const GET = async (request: NextRequest) => {
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
    const likes = await payload.find({
      collection: "likes",
      where: { user: { equals: session.user?.id } },
    })
    // Todo Check the result of the query above
    return Response.json({ message: "Success", data: likes.docs }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json(
      { message: "Error while fetching wishlist", error: "Internal server error" },
      { status: 500 },
    )
  }
}

const payloadSchema = z.object({
  userId: z.string().min(20).max(26).optional(),
  productId: z.string().min(20).max(26),
})

// Create a new like
export const POST = async (request: NextRequest) => {
  const data = await request.json()
  const result = payloadSchema.safeParse(data)
  if (!result.success) {
    return Response.json(
      { message: "Validation failed", error: result.error.flatten() },
      { status: 400 },
    )
  }
  const { userId, productId } = result.data
  const _data = userId ? { user: userId, product: productId } : { product: productId }
  try {
    const payload = await getPayload({ config: configPromise })
    const doc = await payload.create({ collection: "likes", data: _data })
    return Response.json({ message: "Product added to wishlist", data: doc }, { status: 201 })
  } catch (error) {
    console.error(error)
    return Response.json(
      { message: "Error while adding item to wishlist", error: "Internal server error" },
      { status: 500 },
    )
  }
}
