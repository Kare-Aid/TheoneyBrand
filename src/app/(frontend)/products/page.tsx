import ProductsPage from "./page.client"
import { Metadata } from "next"
import configPromise from "@payload-config"
import { getPayload } from "payload"

export const metadata: Metadata = {
  title: "Products",
  description:
    "Shop premium protective phone cases and tempered glasses designed to keep your device safe and stylish. Explore our latest collection today!",
}

export const dynamic = "force-static"
export const revalidate = 600

async function Page() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: "category",
    select: { name: true, slug: true, headerImage: true },
  })
  const categories = result.docs
  console.log(categories)
  //Fetch products, render server side with links to single product page and pass data to client components
  return <ProductsPage category={categories} />
}

export default Page
