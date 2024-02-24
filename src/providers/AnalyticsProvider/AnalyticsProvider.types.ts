import { z } from "zod";
import { methodAuthSchema } from "./AnalyticsProvider.schemas";

export type MethodAuthType = z.infer<typeof methodAuthSchema>;
