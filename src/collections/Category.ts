import type { CollectionConfig } from "payload"

export const Category: CollectionConfig = {
  slug: "category",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true },
    { name: "headerImage", type: "relationship", relationTo: "media" },
  ],
}
