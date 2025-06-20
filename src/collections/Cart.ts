import type { CollectionConfig } from "payload"

export const Cart: CollectionConfig = {
  slug: "carts",
  admin: { useAsTitle: "user" },
  fields: [
    { name: "user", type: "relationship", relationTo: "customers", required: false },
    { name: "purchased", type: "checkbox", defaultValue: false, admin: { readOnly: true } },
    { name: "reference", type: "text" },
  ],
}
