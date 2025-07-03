import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, { message: "minimum 2 characters is needed" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const basicInfoSchema = z.object({
  heroName: z.string().min(2, { message: "minimum 2 characters is needed" }),
  location: z.string().min(2, { message: "minimum 2 characters is needed" }),
  impactArea: z.string().min(1, { message: "select an impact area" }),
});
