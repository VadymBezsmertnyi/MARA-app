import { z } from "zod";

export const imageSchema = z.object({
  width: z.number(),
  height: z.number(),
  base64: z.string(),
});

export const imagesSchema = z.array(imageSchema);
