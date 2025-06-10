import { NextRequest } from "next/server"
import { BinaryLike, createHmac } from "node:crypto"
import { PaystackWebhookPayload } from "@/types/paystack"
import configPromise from "@payload-config"
import { getPayload } from "payload"

export const POST = async (request: NextRequest) => {
  try {
    const body: PaystackWebhookPayload = await request.json()
    const hash = createHmac("sha512", process.env.PT_SECRET_KEY as BinaryLike)
      .update(JSON.stringify(body))
      .digest("hex")

    if (hash !== request.headers.get("x-paystack-signature")) {
      return Response.json({ message: "Unauthorized" }, { status: 401 })
    }
    if (body.event !== "charge.success") {
      return Response.json({ message: "Bad request" }, { status: 400 })
    }
    const payload = await getPayload({ config: configPromise })
    await payload.update({
      collection: "carts",
      id: body.data.metadata.cartId,
      data: { purchased: true, reference: body.data.reference },
    })
    // console.dir({ "Cart ID": body.data.metadata.cartId }, { depth: null })
    return Response.json({ message: "Success" }, { status: 201 })
  } catch (error) {
    console.error(error)
    return Response.json(
      { message: "Error in webhook endpoint", error: "INTERNAL_SERVER_ERROR" },
      { status: 500 },
    )
  }
}
