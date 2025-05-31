import React from "react"
import { getPayload } from "payload"
import configPromise from "@payload-config"
import { Metadata } from "next"
import { Category } from "@/payload-types"
import Eyewear from "./Eyewear"
import PhoneAccessory from "./PhoneAccessory"

export const dynamic = "force-dynamic"

//Todo metadata
export const metadata: Metadata = {}

//Todo Prefetch products using getStaticParams

// Revalidate when anything is changed in payload

// Cache the document fetching function

async function Page({ params }: { params: Promise<{ productId: string }> }) {
  const productId = (await params).productId
  const payload = await getPayload({ config: configPromise })
  const doc = await payload.findByID({ collection: "products", id: productId })
  if ((doc.category as Category).name === "Eyewear") {
    return <Eyewear product={doc} />
  }
  return <PhoneAccessory product={doc} />
}

export default Page
