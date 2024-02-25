import { z } from "zod";

export const typeInitialUrlSchema = z.object({
  path: z.enum(["workshops"]),
  queryParams: z.object({ workshopId: z.string() }),
});
