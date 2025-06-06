import { NextRequest } from "next/server"
import { getPayload } from "payload"
import configPromise from "@payload-config"
import { auth } from "@/auth"
import { z } from "zod"
import { Product } from "@/payload-types"

// Send Likes for a user
export const GET = async (request: NextRequest) => {
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
    const likes = await payload.find({
      collection: "likes",
      limit: 0,
      where: { user: { equals: session.user?.id } },
    })
    return Response.json({ message: "Success", data: likes }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json(
      { message: "Error while fetching wishlist", error: "Internal server error" },
      { status: 500 },
    )
  }
}

const payloadSchema = z.object({
  //userId: z.string().min(20).max(26).optional(),
  productId: z.string().min(20).max(26),
})

// Create a new like
//! Sends password back in user object
// Todo User already liked the product, handle the edgecase
export const POST = async (request: NextRequest) => {
  const data = await request.json()
  const result = payloadSchema.safeParse(data)
  if (!result.success) {
    return Response.json(
      { message: "Validation failed", error: result.error.flatten() },
      { status: 400 },
    )
  }
  const { productId } = result.data
  const session = await auth()
  const _data = session ? { user: session.user.id, product: productId } : { product: productId }
  try {
    const payload = await getPayload({ config: configPromise })
    const doc = await payload.create({
      collection: "likes",
      data: _data,
    })
    return Response.json({ message: "Product added to wishlist", data: doc }, { status: 201 })
  } catch (error) {
    console.error(error)
    return Response.json(
      { message: "Error while adding item to wishlist", error: "Internal server error" },
      { status: 500 },
    )
  }
}

const schema = z.object({
  likes: z.array(
    z.object({
      likeId: z.string().min(20).max(26),
      productId: z.string().min(20).max(26),
    }),
  ),
})

/**Update likes in database with user id using the likes id from browser storage */
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
  const { id } = session.user
  try {
    const payload = await getPayload({ config: configPromise })
    const userLikes = await payload.find({
      collection: "likes",
      where: { "user.id": { equals: id } },
    })
    const userLikeMap = new Map<string, string>()
    for (const like of userLikes.docs) {
      userLikeMap.set((like.product as Product).id, like.id)
    }
    for (const like of result.data.likes) {
      if (userLikeMap.has(like.productId)) {
        await payload.delete({ collection: "likes", id: like.likeId })
        continue
      }
      await payload.update({ collection: "likes", id: like.likeId, data: { user: id } })
    }
    return Response.json({ message: "Success", data: {} }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json(
      { message: "Error while updating likes on database", error: "Internal server error" },
      { status: 500 },
    )
  }
}
