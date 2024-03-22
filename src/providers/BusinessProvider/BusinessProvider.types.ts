import { z } from "zod";
import { businessMarketSchema } from "./BusinessProvider.schemas";

export type BusinessMarketType = z.infer<typeof businessMarketSchema>;
