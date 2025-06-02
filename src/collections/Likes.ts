import type { CollectionConfig } from "payload"

export const Likes: CollectionConfig = {
  slug: "likes",
  fields: [
    { name: "user", type: "relationship", relationTo: "customers", required: false },
    { name: "product", relationTo: "products", type: "relationship" },
  ],
  indexes: [{ fields: ["user", "product"], unique: true }],
}
