import { NextRequest } from "next/server"
import { getPayload } from "payload"
import configPromise from "@payload-config"
import bcrypt from "bcrypt"
import { signupSchema } from "@/lib/schemas"

export const POST = async (request: NextRequest) => {
  try {
    const _data = await request.json()
    const result = signupSchema.safeParse(_data)
    if (!result.success) {
      return Response.json(
        { message: "Validation failed", error: result.error.flatten() },
        { status: 400 },
      )
    }
    const hashedPassword = await bcrypt.hash(result.data.password, 10)
    const payload = await getPayload({ config: configPromise })

    //Todo Handle edgecase where user with the email already exist
    const _res = await payload.create({
      collection: "customers",
      data: { ...result.data, password: hashedPassword },
    })
    return Response.json({ message: "Sign up successful", email: _res.email }, { status: 201 })
  } catch (error: any) {
    //? Reference to error thrown from payload
    // console.error({ errrors: error.data.errors })
    console.error(error)
    return Response.json(
      { message: "Could not sign up, try again later", error: "Internal server error" },
      { status: 500 },
    )
  }
}
