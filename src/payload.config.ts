// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import path from "path"
import { buildConfig } from "payload"
import { fileURLToPath } from "url"
import { payloadCloudinaryPlugin } from "@jhb.software/payload-cloudinary-plugin"

// Collections/Schemas
import { Users } from "./collections/Users"
import { Media } from "./collections/Media"
import { Customers } from "./collections/Customers"
import { Products } from "./collections/Products"
import { Colors } from "./collections/Colors"
import { Variations } from "./collections/Variations"
import { Stock } from "./collections/Stock"
import { Cart } from "./collections/Cart"
import { Category } from "./collections/Category"
import { Likes } from "./collections/Likes"
import { Reviews } from "./collections/Reviews"
import { CartItem } from "./collections/CartItem"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Customers,
    Media,
    Colors,
    Variations,
    Category,
    Products,
    Stock,
    Cart,
    CartItem,
    Likes,
    Reviews,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  plugins: [
    payloadCloudinaryPlugin({
      enabled: process.env.NODE_ENV === "production",
      uploadCollections: ["media"],
      credentials: {
        apiKey: process.env.CLOUDINARY_API_KEY!,
        apiSecret: process.env.CLOUDINARY_API_SECRET!,
      },
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
        folder: "theoney-brand",
      },
    }),
  ],
})
