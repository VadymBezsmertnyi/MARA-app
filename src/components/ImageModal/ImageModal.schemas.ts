import { z } from "zod";

export const imageSchema = z.object({
  _id: z.string().optional(),
  width: z.number(),
  height: z.number(),
  base64: z.string(),
  url: z.string().optional(),
});

export const imagesSchema = z.array(imageSchema);
