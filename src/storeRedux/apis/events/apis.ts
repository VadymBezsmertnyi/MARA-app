import { Builder } from "../../api";
import {
  TResultEvents,
  TEventResponse,
  TDeleteEventResponse,
  IAddEventRequest,
  IChangeEventRequest,
  IDeleteEventRequest,
  IGetEventsUserRequest,
} from "./events.types";
import {
  resultEventsSchema,
  eventResponseSchema,
  deleteEventResponseSchema,
} from "./events.schemas";
import { PATHS } from "../../../providers/paths.constants";

export const getEvents = (builder: Builder) =>
  builder.query<TResultEvents | null, void>({
    query: () => ({
      url: PATHS.eventsGet,
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
    query: ({ userId }) => ({
      url: `${PATHS.eventsGetUserId}?userId=${userId}`,
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

      const { imageFiles: _, ...bodyWithoutImages } = body;
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

      const { imageFiles: _, ...bodyWithoutImages } = body;
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
