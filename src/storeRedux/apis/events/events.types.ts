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
  paginationSchema,
  closestEventsSchema,
  contactSchema,
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
export type TPagination = z.infer<typeof paginationSchema>;
export type TClosestEvents = z.infer<typeof closestEventsSchema>;
export type TContact = z.infer<typeof contactSchema>;

type ImageFileType =
  | ImagePickerAsset
  | {
      _id?: string;
      url?: string;
      uri?: string;
    };

export interface IAddEventRequest {
  body: TAddEventRequest & {
    imageFiles?: Array<ImageFileType>;
  };
}

export interface IChangeEventRequest {
  body: TChangeEventRequest & {
    imageFiles?: Array<ImageFileType>;
  };
}

export interface IDeleteEventRequest {
  body: TDeleteEventRequest;
}

export interface IGetEventsRequest {
  page?: number;
  limit?: number;
  sort?: "distance" | "date" | null;
  maxDistance?: number;
  minPrice?: number;
  maxPrice?: number;
  eventName?: string;
  eventStatus?: "past" | "upcoming";
  latitude?: number;
  longitude?: number;
  countryId?: string;
  placeId?: string;
}

export interface IGetEventByIdRequest {
  eventId: string;
}

export interface IGetEventsUserRequest {
  userId: string;
  page?: number;
  limit?: number;
  sort?: "distance" | "date" | null;
  maxDistance?: number;
  minPrice?: number;
  maxPrice?: number;
  eventName?: string;
  eventStatus?: "past" | "upcoming";
  latitude?: number;
  longitude?: number;
  countryId?: string;
  placeId?: string;
}

export interface IGetClosestEventsRequest {
  latitude?: number;
  longitude?: number;
}

export interface IGetEventsLocationsRequest {
  eventStatus?: "past" | "upcoming";
}

import { eventLocationsSchema } from "./events.schemas";
export type TEventLocations = z.infer<typeof eventLocationsSchema>;
