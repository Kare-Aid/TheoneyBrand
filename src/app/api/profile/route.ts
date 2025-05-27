import { NextRequest } from "next/server"
import { auth } from "@/auth"
import { profileSchema } from "@/lib/schemas"
import { getPayload } from "payload"
import configPromise from "@payload-config"

export const GET = async (request: NextRequest) => {
  const session = await auth()
  if (!session) {
    // Request shouldn't hit if session is not available
    return Response.json(
      { error: "Unauthorized", message: "You cannot access this resource" },
      { status: 401 },
    )
  }
  try {
    // const payload = await getPayload({ config: configPromise })
    // const updatedDoc = await payload.find({
    //   collection: "customers",
    //   where: { id: { equals: session.user.id } },
    // })
    // console.log(updatedDoc)
    // return Response.json(
    //   { message: "Profile update successful", data: updatedDoc },
    //   { status: 200 },
    // )
  } catch (error) {
    console.error(error)
    return Response.json(
      { message: "Error while updating profile", error: "Internal server error" },
      { status: 500 },
    )
  }
}

export const PATCH = async (request: NextRequest) => {
  const body = await request.json()
  const result = profileSchema.safeParse(body)
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
    const updatedDoc = await payload.update({
      collection: "customers",
      where: { id: { equals: session.user.id } },
      data: result.data,
    })
    return Response.json(
      { message: "Profile update successful", data: updatedDoc },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)
    return Response.json(
      { message: "Error while updating profile", error: "Internal server error" },
      { status: 500 },
    )
  }
}
