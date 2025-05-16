import type { CollectionConfig } from "payload"

export const Reviews: CollectionConfig = {
  slug: "reviews",
  fields: [
    { type: "number", name: "rating", required: true },
    { type: "relationship", relationTo: "customers", name: "user", required: true },
    { type: "relationship", relationTo: "products", required: true, name: "product" },
  ],
}
