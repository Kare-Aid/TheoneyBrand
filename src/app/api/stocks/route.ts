import { NextRequest } from "next/server"
import { getPayload } from "payload"
import configPromise from "@payload-config"

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  const query = Object.fromEntries(searchParams.entries())

  if (!query.productId) {
    return Response.json({ message: "Bad request", error: "Bad Request" }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config: configPromise })

    const stockResult = await payload.find({
      collection: "stock",
      where: { product: { equals: query.productId } },
    })

    return Response.json({ message: "Success", data: stockResult.docs }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json(
      { message: "Error while fetching stock", error: "Internal server error" },
      { status: 500 },
    )
  }
}
