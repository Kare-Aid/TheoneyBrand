import { CollectionConfig } from "payload"

export const CartItem: CollectionConfig = {
  slug: "cart-items",
  fields: [
    { type: "relationship", relationTo: "carts", name: "cart", required: true },
    { type: "relationship", relationTo: "stock", name: "stock", required: true },
    { type: "number", name: "quantity", defaultValue: 1, required: true },
  ],
  indexes: [{ fields: ["cart", "stock"], unique: true }],
}
