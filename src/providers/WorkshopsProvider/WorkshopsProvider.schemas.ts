import { z } from "zod";

export const typeWorkSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

export const typeWorksSchema = z.array(typeWorkSchema);

export const workshopS = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  address: z.string(),
  rating: z.number(),
  longitude: z.number(),
  latitude: z.number(),
});

export const workshopsS = z.array(workshopS);
