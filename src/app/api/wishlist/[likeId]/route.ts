import { NextRequest } from "next/server"
import { getPayload } from "payload"
import configPromise from "@payload-config"

type Params = { params: { likeId: string } }

//Delete route for a like
export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ likeId: string }> },
) => {
  //Todo Verify params
  const { likeId } = await params
  try {
    const payload = await getPayload({ config: configPromise })
    const doc = await payload.delete({ collection: "likes", id: likeId })
    return Response.json({ message: "Product removed from wishlist", data: doc }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json(
      { message: "Error while removing item from wishlist", error: "Internal server error" },
      { status: 500 },
    )
  }
}
