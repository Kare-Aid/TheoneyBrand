import ProductsPage from "./page.client"
import { Metadata } from "next"
import configPromise from "@payload-config"
import { getPayload } from "payload"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Products",
  description:
    "Shop premium protective phone cases and tempered glasses designed to keep your device safe and stylish. Explore our latest collection today!",
}

export const dynamic = "force-static"
export const revalidate = 60

async function Page() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: "category",
    select: { name: true, slug: true, headerImage: true },
    sort: "createdAt",
  })
  if (result.docs.length < 1) notFound()
  return <ProductsPage categories={result.docs} />
}

export default Page
