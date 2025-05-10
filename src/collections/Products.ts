import type { CollectionConfig } from "payload"

export const Products: CollectionConfig = {
  slug: "products",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "price", type: "number", required: true, admin: { position: "sidebar" } },
    //! Subtract from product and stock on every purchase
    { name: "quantity", type: "number", required: true, admin: { position: "sidebar" } },
    { name: "description", required: true, type: "textarea" },
    { name: "Shipping details", type: "textarea", required: true },
    {
      name: "images",
      type: "array",
      required: true,
      fields: [
        { name: "image", type: "relationship", relationTo: "media", required: true },
        {
          name: "label",
          type: "text",
          required: true,
          admin: { placeholder: "e.g. Front, Side, Back" },
        },
      ],
    },
    {
      name: "details",
      type: "array",
      fields: [{ name: "detail", type: "text", required: true }],
    },
    {
      name: "care",
      type: "array",
      fields: [{ name: "care", type: "text", required: true }],
    },

    {
      name: "colors",
      type: "array",
      required: false,
      fields: [{ name: "color", type: "relationship", relationTo: "colors", required: false }],
    },
  ],
}
