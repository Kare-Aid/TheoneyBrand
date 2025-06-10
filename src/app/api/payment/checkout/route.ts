import { auth } from "@/auth"
import { NextRequest } from "next/server"
import configPromise from "@payload-config"
import { getPayload } from "payload"
import { checkoutSchema } from "@/lib/schemas"

export const POST = async (request: NextRequest) => {
  const body = await request.json()
  const result = checkoutSchema.safeParse(body)
  if (!result.success) {
    return Response.json(
      { message: "Validation failed", error: result.error.flatten() },
      { status: 400 },
    )
  }
  const session = await auth()
  if (!session) {
    // Request shouldn't hit if session is not available
    return Response.json(
      { error: "Unauthorized", message: "You cannot access this resource" },
      { status: 401 },
    )
  }
  try {
    const payload = await getPayload({ config: configPromise })
    const carts = await payload.find({
      collection: "carts",
      where: { "user.id": { equals: session.user.id } },
    })

    if (carts.totalDocs < 1) {
      return Response.json({ error: "Bad Request", message: "Could not get cart" }, { status: 400 })
    }
    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PT_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...result.data, metadata: { cartId: carts.docs[0].id } }),
    })
    const data = await res.json()
    if (!res.ok) {
      console.error(data)
      return Response.json(
        { message: "Error while generating payment url", error: "PAYSTACK_REQUEST_ERROR" },
        { status: 500 },
      )
    }
    return Response.json(data, { status: 201 })
  } catch (error) {
    console.error(error)
    return Response.json(
      { message: "Error while generating payment url", error: "Internal server error" },
      { status: 500 },
    )
  }
}
