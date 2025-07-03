import { z } from "zod";
export const basicInfoSchema = z.object({
  heroName: z.string().min(2, { message: "minimum 2 characters is needed" }),
  location: z.string().min(2, { message: "minimum 2 characters is needed" }),
  impactArea: z.string().min(1, { message: "select an impact area" }),
});

export const impactStorySchema = z.object({
  shortDescription: z
    .string()
    .min(2, { message: "minimum 2 characters is needed" })
    .max(120, "the maximum is 120"),
  fullStory: z
    .string()
    .min(100, { message: "minimum 100 characters is needed" }),
  tags: z.string().min(1, { message: "at least 1 tag required" }),
});
