import type { CollectionConfig } from "payload"

export const Variations: CollectionConfig = {
  slug: "variations",
  admin: { useAsTitle: "" },
  fields: [
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Eyewear", value: "eyewear" },
        { label: "Phone accesories", value: "phone_accessories" },
      ],
    },
    { name: "name", type: "text" },
  ],
}
