import { NextRequest } from "next/server"
import { getPayload } from "payload"
import configPromise from "@payload-config"
import { z } from "zod"

const schema = z.object({
  categoryId: z.string().min(20).max(26),
})

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  const query = Object.fromEntries(searchParams.entries())
  const result = schema.safeParse(query)
  if (!result.success) {
    return Response.json(
      { error: result.error.flatten(), message: "Invalid parameter" },
      { status: 400 },
    )
  }
  const { categoryId } = result.data
  try {
    const payload = await getPayload({ config: configPromise })
    const products = await payload.find({
      collection: "products",
      where: { "category.id": { equals: categoryId } },
      select: { name: true, fitsWith: true, price: true, images: true },
    })
    return Response.json({ message: "Success", data: products }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json(
      { message: "Error while fetching products", error: "Internal server error" },
      { status: 500 },
    )
  }
}
