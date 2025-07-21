import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";

export const petIdSchema = z.string().cuid();

export const petFormSchema = z.object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(100, "Name must be less than 100 characters"),
    ownerName: z
      .string()
      .min(1, "Owner name is required")
      .max(100, "Owner name must be less than 100 characters"),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url("Invalid URL format"),
    ]),
    age: z.coerce
      .number()
      .int()
      .positive()
      .max(100, "Age must be a positive integer less than or equal to 100"),
    notes: z.union([
      z.literal(""),
      z.string().trim().max(1000, "Notes must be less than 1000 characters"),
    ]),
  }).transform(data => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE
  }))
  
  export type TPetForm = z.infer<typeof petFormSchema>;

  export const authSchema = z.object({
    email: z.string().email("Invalid email format").max(100, "Email must be less than 100 characters"),
    password: z.string().max(100, "Password must be less than 100 characters"),
  })
  
  export type TAuth = z.infer<typeof authSchema>;