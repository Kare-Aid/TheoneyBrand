import { revalidatePath } from "next/cache"
import type { CollectionConfig } from "payload"

export const Category: CollectionConfig = {
  slug: "category",
  admin: { useAsTitle: "name" },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation == "create" || operation == "update") {
          revalidatePath("/products")
        }
      },
    ],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true },
    { name: "headerImage", type: "relationship", relationTo: "media" },
  ],
}
