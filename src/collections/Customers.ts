import type { CollectionConfig } from "payload"

export const Customers: CollectionConfig = {
  slug: "customers",
  admin: { useAsTitle: "email", defaultColumns: ["email", "id", "firstName", "lastName"] },
  fields: [
    { name: "email", type: "email", required: true, unique: true },
    { name: "firstName", type: "text", required: true },
    { name: "lastName", type: "text", required: true },
    { name: "password", type: "text", required: true, access: { read: () => false } },
    { name: "address", type: "text" },
    { name: "phoneNumber", type: "text" },
  ],
}
