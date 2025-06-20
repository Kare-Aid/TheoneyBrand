import { z } from "zod"

// Todo Add min and max to the schema
export const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email address is required").email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character",
    })
    .regex(/^\S*$/, { message: "No spaces allowed" }),
})

export const loginSchema = z.object({
  email: z.string().min(1, "Email address is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required").max(32, "Maximun of 32 chracters"),
})

// Todo Add min and max to the schema
export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email address is required").email("Please enter a valid email address"),
  phoneNumber: z
    .string()
    .min(1, "Please enter your phone number")
    .min(11, "Please enter a valid phone number"),
  address: z.string().min(1, "Please enter your shipping address"),
})

export const addCartSchema = z.object({
  productId: z.string().min(20).max(36).optional(),
  stockId: z.string().min(20).max(36).optional(),
  quantity: z.coerce.number().optional(),
  cartId: z.string().optional(),
})

export type AddToCartPayload = z.infer<typeof addCartSchema>

export const checkoutSchema = z.object({
  email: z.string().min(1, "Email address is required").email("Please enter a valid email address"),
  amount: z.coerce.number(),
})
