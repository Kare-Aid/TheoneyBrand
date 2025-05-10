import type { CollectionConfig } from "payload"

export const Cart: CollectionConfig = {
  slug: "carts",
  admin: { useAsTitle: "" },
  fields: [
    { name: "user", type: "relationship", relationTo: "customers", required: false },
    { name: "purchased", type: "checkbox", defaultValue: false },
    {
      name: "items",
      type: "array",
      fields: [
        { name: "quantity", type: "number", required: true },
        { name: "stock", type: "relationship", relationTo: "stock" },
      ],
    },
  ],
}
