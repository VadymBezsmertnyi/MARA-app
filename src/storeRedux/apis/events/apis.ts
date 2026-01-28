import { Builder } from "../../api";
import {
  TResultEvents,
  TEventResponse,
  TDeleteEventResponse,
  IAddEventRequest,
  IChangeEventRequest,
  IDeleteEventRequest,
  IGetEventsRequest,
  IGetEventsUserRequest,
  IGetEventByIdRequest,
  IGetClosestEventsRequest,
  IGetEventsLocationsRequest,
  TClosestEvents,
  TEventLocations,
  IAddCommentRequest,
  IChangeCommentRequest,
} from "./events.types";
import {
  resultEventsSchema,
  eventResponseSchema,
  deleteEventResponseSchema,
  closestEventsSchema,
  eventLocationsSchema,
} from "./events.schemas";
import { PATHS } from "../../../providers/paths.constants";

const buildQueryString = (
  params: IGetEventsRequest | IGetEventsUserRequest
): string => {
  const queryParams: string[] = [];
  if ("userId" in params && params.userId)
    queryParams.push(`userId=${encodeURIComponent(params.userId)}`);
  if (params.page !== undefined) queryParams.push(`page=${params.page}`);
  if (params.limit !== undefined) queryParams.push(`limit=${params.limit}`);
  if (params.sort) queryParams.push(`sort=${params.sort}`);
  if (params.maxDistance !== undefined)
    queryParams.push(`maxDistance=${params.maxDistance}`);
  if (params.minPrice !== undefined)
    queryParams.push(`minPrice=${params.minPrice}`);
  if (params.maxPrice !== undefined)
    queryParams.push(`maxPrice=${params.maxPrice}`);
  if (params.eventName)
    queryParams.push(`eventName=${encodeURIComponent(params.eventName)}`);
  if (params.eventStatus) queryParams.push(`eventStatus=${params.eventStatus}`);
  if (params.latitude !== undefined)
    queryParams.push(`latitude=${params.latitude}`);
  if (params.longitude !== undefined)
    queryParams.push(`longitude=${params.longitude}`);
  if ("countryId" in params && params.countryId)
    queryParams.push(`countryId=${encodeURIComponent(params.countryId)}`);
  if ("placeId" in params && params.placeId)
    queryParams.push(`placeId=${encodeURIComponent(params.placeId)}`);

  return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
};

export const getEvents = (builder: Builder) =>
  builder.query<TResultEvents | null, IGetEventsRequest>({
    query: (params = {}) => ({
      url: `${PATHS.eventsGet}${buildQueryString(params)}`,
      method: "GET",
    }),
    transformResponse: (response: unknown) => {
      const result = resultEventsSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod getEvents:", {
          url: PATHS.eventsGet,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const getEventsUser = (builder: Builder) =>
  builder.query<TResultEvents | null, IGetEventsUserRequest>({
    query: (params) => ({
      url: `${PATHS.eventsGetUserId}${buildQueryString(params)}`,
      method: "GET",
    }),
    transformResponse: (response: unknown) => {
      const result = resultEventsSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod getEventsUser:", {
          url: PATHS.eventsGetUserId,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const getEventById = (builder: Builder) =>
  builder.query<TEventResponse | null, IGetEventByIdRequest>({
    query: ({ eventId }) => ({
      url: `${PATHS.eventsGetById}${eventId}`,
      method: "GET",
    }),
    transformResponse: (response: unknown) => {
      const result = eventResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod getEventById:", {
          url: PATHS.eventsGetById,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const getClosestEvents = (builder: Builder) =>
  builder.query<TClosestEvents | null, IGetClosestEventsRequest>({
    query: (params = {}) => {
      const queryParams: string[] = [];
      if (params.latitude !== undefined)
        queryParams.push(`latitude=${params.latitude}`);
      if (params.longitude !== undefined)
        queryParams.push(`longitude=${params.longitude}`);
      const queryString =
        queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
      return {
        url: `${PATHS.eventsGetClosest}${queryString}`,
        method: "GET",
      };
    },
    transformResponse: (response: unknown) => {
      const result = closestEventsSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod getClosestEvents:", {
          url: PATHS.eventsGetClosest,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const addEvent = (builder: Builder) =>
  builder.mutation<TEventResponse | null, IAddEventRequest>({
    query: ({ body }) => {
      const formData = new FormData();
      const newImageFiles =
        body.imageFiles?.filter(
          (img) =>
            img &&
            "uri" in img &&
            img.uri &&
            (img.uri.includes("file://") || img.uri.startsWith("file://"))
        ) || [];
      const existingImageFiles = (body.imageFiles?.filter(
        (img) =>
          img &&
          "_id" in img &&
          "url" in img &&
          img.url &&
          img._id &&
          !img.url.includes("data:image") &&
          !img.url.includes("file://") &&
          !img.url.startsWith("file://")
      ) || []) as { _id: string; url: string }[];

      newImageFiles.forEach((img, index) => {
        if (img && "uri" in img && img.uri) {
          const fileExtension = img.uri.split(".").pop() || "jpg";
          const fileName = `image_${index}.${fileExtension}`;
          formData.append("imageFiles", {
            uri: img.uri,
            type: "image/jpeg",
            name: fileName,
          } as any);
        }
      });

      const { imageFiles: _, userId: __, ...bodyWithoutImages } = body;
      Object.keys(bodyWithoutImages).forEach((key) => {
        const value = (bodyWithoutImages as any)[key];
        if (value !== undefined && value !== null) {
          if (
            typeof value === "object" &&
            !Array.isArray(value) &&
            !(value instanceof Date)
          )
            formData.append(key, JSON.stringify(value));
          else if (Array.isArray(value))
            formData.append(key, JSON.stringify(value));
          else formData.append(key, String(value));
        }
      });
      if (existingImageFiles.length > 0)
        formData.append(
          "existingImages",
          JSON.stringify(
            existingImageFiles.map((img) => ({
              _id: img._id,
              url: (img as { url: string }).url,
            }))
          )
        );
      if (body.userId) formData.set("userId", body.userId);

      return {
        url: PATHS.eventAdd,
        method: "POST",
        body: formData,
      };
    },
    transformResponse: (response: unknown) => {
      const result = eventResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod addEvent:", {
          url: PATHS.eventAdd,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const changeEvent = (builder: Builder) =>
  builder.mutation<TEventResponse | null, IChangeEventRequest>({
    query: ({ body }) => {
      const formData = new FormData();
      const newImageFiles =
        body.imageFiles?.filter(
          (img) =>
            img &&
            "uri" in img &&
            img.uri &&
            (img.uri.includes("file://") || img.uri.startsWith("file://"))
        ) || [];
      const existingImageFiles = (body.imageFiles?.filter(
        (img) =>
          img &&
          "_id" in img &&
          "url" in img &&
          img.url &&
          img._id &&
          !img.url.includes("data:image") &&
          !img.url.includes("file://") &&
          !img.url.startsWith("file://")
      ) || []) as { _id: string; url: string }[];

      newImageFiles.forEach((img, index) => {
        if (img && "uri" in img && img.uri) {
          const fileExtension = img.uri.split(".").pop() || "jpg";
          const fileName = `image_${index}.${fileExtension}`;
          formData.append("imageFiles", {
            uri: img.uri,
            type: "image/jpeg",
            name: fileName,
          } as any);
        }
      });

      const { imageFiles: _, userId: __, ...bodyWithoutImages } = body;
      Object.keys(bodyWithoutImages).forEach((key) => {
        const value = (bodyWithoutImages as any)[key];
        if (value !== undefined && value !== null) {
          if (
            typeof value === "object" &&
            !Array.isArray(value) &&
            !(value instanceof Date)
          )
            formData.append(key, JSON.stringify(value));
          else if (Array.isArray(value))
            formData.append(key, JSON.stringify(value));
          else formData.append(key, String(value));
        }
      });
      formData.append(
        "existingImages",
        JSON.stringify(
          existingImageFiles.map((img) => ({
            _id: img._id,
            url: (img as { url: string }).url,
          }))
        )
      );
      if (body.userId) formData.set("userId", body.userId);

      return {
        url: PATHS.eventChange,
        method: "POST",
        body: formData,
      };
    },
    transformResponse: (response: unknown) => {
      const result = eventResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod changeEvent:", {
          url: PATHS.eventChange,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const deleteEvent = (builder: Builder) =>
  builder.mutation<TDeleteEventResponse | null, IDeleteEventRequest>({
    query: ({ body }) => ({
      url: PATHS.eventDelete,
      method: "DELETE",
      body,
    }),
    transformResponse: (response: unknown) => {
      const result = deleteEventResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod deleteEvent:", {
          url: PATHS.eventDelete,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const getEventsLocations = (builder: Builder) =>
  builder.query<TEventLocations | null, IGetEventsLocationsRequest>({
    query: (params = {}) => {
      const queryParams: string[] = [];
      if (params.eventStatus)
        queryParams.push(`eventStatus=${params.eventStatus}`);
      const queryString =
        queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
      return {
        url: `${PATHS.eventsGetLocations}${queryString}`,
        method: "GET",
      };
    },
    transformResponse: (response: unknown) => {
      const result = eventLocationsSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod getEventsLocations:", {
          url: PATHS.eventsGetLocations,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const addEventComment = (builder: Builder) =>
  builder.mutation<TEventResponse | null, IAddCommentRequest>({
    query: ({ body }) => ({
      url: PATHS.eventsCommentsAdd,
      method: "POST",
      body,
    }),
    transformResponse: (response: unknown) => {
      const result = eventResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod addEventComment:", {
          url: PATHS.eventsCommentsAdd,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const changeEventComment = (builder: Builder) =>
  builder.mutation<TEventResponse | null, IChangeCommentRequest>({
    query: ({ body }) => ({
      url: PATHS.eventsCommentsChange,
      method: "PUT",
      body,
    }),
    transformResponse: (response: unknown) => {
      const result = eventResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod changeEventComment:", {
          url: PATHS.eventsCommentsChange,
          data: response,
          error: result.error,
        });
      return null;
    },
  });
