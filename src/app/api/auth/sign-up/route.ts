import { NextRequest, NextResponse } from "next/server"

export const POST = (request: NextRequest) => {
  return Response.json(
    { message: "Sign up successful" },
    {
      status: 201,
    },
  )
}
