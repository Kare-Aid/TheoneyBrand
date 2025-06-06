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
    { name: "fitsWith", type: "text" },
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
      fields: [{ name: "detail", type: "text" }],
    },
    {
      name: "care",
      type: "array",
      fields: [{ name: "care", type: "text" }],
    },
    {
      name: "relatedProducts",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
    },
  ],
}
