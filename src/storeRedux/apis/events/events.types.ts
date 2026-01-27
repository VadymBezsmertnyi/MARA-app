import { z } from "zod";
import { ImagePickerAsset } from "expo-image-picker";
import {
  eventSchema,
  eventsSchema,
  resultEventsSchema,
  eventResponseSchema,
  deleteEventResponseSchema,
  addEventRequestSchema,
  changeEventRequestSchema,
  deleteEventRequestSchema,
  eventsStateSchema,
  upcomingEventSchema,
} from "./events.schemas";

export type TEvent = z.infer<typeof eventSchema>;
export type TEvents = z.infer<typeof eventsSchema>;
export type TResultEvents = z.infer<typeof resultEventsSchema>;
export type TEventResponse = z.infer<typeof eventResponseSchema>;
export type TDeleteEventResponse = z.infer<typeof deleteEventResponseSchema>;
export type TAddEventRequest = z.infer<typeof addEventRequestSchema>;
export type TChangeEventRequest = z.infer<typeof changeEventRequestSchema>;
export type TDeleteEventRequest = z.infer<typeof deleteEventRequestSchema>;
export type TEventsState = z.infer<typeof eventsStateSchema>;
export type TUpcomingEvent = z.infer<typeof upcomingEventSchema>;

export interface IAddEventRequest {
  body: TAddEventRequest & {
    imageFiles?: Array<ImagePickerAsset | { _id?: string; url: string }>;
  };
}

export interface IChangeEventRequest {
  body: TChangeEventRequest & {
    imageFiles?: Array<ImagePickerAsset | { _id?: string; url: string }>;
  };
}

export interface IDeleteEventRequest {
  body: TDeleteEventRequest;
}

export interface IGetEventsUserRequest {
  userId: string;
}
