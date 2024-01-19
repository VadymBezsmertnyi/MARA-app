import { z } from "zod";
import {
  eventSchema,
  eventsSchema,
  locationSchema,
} from "./EventsProvider.schemas";

export type EventType = z.infer<typeof eventSchema>;
export type EventsType = z.infer<typeof eventsSchema>;

export type LocationType = z.infer<typeof locationSchema>;
