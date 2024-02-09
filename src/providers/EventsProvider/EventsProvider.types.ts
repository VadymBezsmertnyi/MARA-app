import { z } from "zod";
import {
  eventSchema,
  eventsSchema,
  upcomingEventSchema,
  upcomingEventsSchema,
} from "./EventsProvider.schemas";

export type EventType = z.infer<typeof eventSchema>;
export type EventsType = z.infer<typeof eventsSchema>;
export type UpcomingEvent = z.infer<typeof upcomingEventSchema>;
export type UpcomingEvents = z.infer<typeof upcomingEventsSchema>;
