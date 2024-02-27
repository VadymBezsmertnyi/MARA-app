import { z } from "zod";
import { userLocationMapSchema } from "./MapProvider.schemas";

export type UserLocationMapType = z.infer<typeof userLocationMapSchema>;
