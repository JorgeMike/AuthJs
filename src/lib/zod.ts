import { object, string } from "zod";
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const emailSchema = string({
  required_error: "Email is required",
}).email();

export const updateProfileSchema = object({
  name: string({ required_error: "Name is required" }).min(
    3,
    "Name is required"
  ),
  birthdate: string().optional(),
  phone: string().regex(phoneRegex, "Invalid phone number").optional(),
});
