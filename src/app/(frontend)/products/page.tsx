import ProductsPage from "./page.client"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products",
  description:
    "Shop premium protective phone cases and tempered glasses designed to keep your device safe and stylish. Explore our latest collection today!",
}

export const dynamic = "force-static"
export const revalidate = 600

async function Page() {
  //Fetch products, render server side with links to single product page and pass data to client components
  return <ProductsPage />
}

export default Page
