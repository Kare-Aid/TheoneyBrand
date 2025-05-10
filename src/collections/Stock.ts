import type { CollectionConfig } from "payload"

export const Stock: CollectionConfig = {
  slug: "stock",
  fields: [
    { name: "product", type: "relationship", relationTo: "products", required: true },
    { name: "color", relationTo: "colors", type: "relationship", required: true },
    { name: "variation", relationTo: "variations", type: "relationship" },
    //! Subtract from product and stock on every purchase
    { name: "quantity", type: "number", required: true, admin: { position: "sidebar" } },
  ],
}
