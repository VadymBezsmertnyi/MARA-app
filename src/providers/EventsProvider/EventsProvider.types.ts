import { z } from "zod";
import { eventSchema, eventsSchema } from "./EventsProvider.schemas";

export type EventType = z.infer<typeof eventSchema>;
export type EventsType = z.infer<typeof eventsSchema>;
