import { z } from "zod";
import { typeInitialUrlSchema } from "./PushNotificationProvider.schemas";

export type InitialUrlType = z.infer<typeof typeInitialUrlSchema>;
