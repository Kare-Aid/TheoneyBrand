import type { CollectionConfig } from "payload"

export const Products: CollectionConfig = {
  slug: "products",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "price", type: "number", required: true, admin: { position: "sidebar" } },
    { name: "description", required: true, type: "textarea" },
    { name: "shippingDetails", type: "textarea", required: true },
    { name: "category", type: "relationship", relationTo: "category" },
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
      required: true,
      fields: [{ name: "color", type: "relationship", relationTo: "colors", required: false }],
    },
    {
      name: "variations",
      type: "array",
      required: false,
      fields: [{ name: "variation", type: "relationship", relationTo: 'variations', required: false }],
    },
  ],
}
