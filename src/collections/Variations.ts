import type { CollectionConfig } from "payload"

export const Variations: CollectionConfig = {
  slug: "variations",
  admin: { useAsTitle: "name" },
  fields: [{ name: "name", type: "text" }],
}
