import { Builder } from "../../api";
import {
  TResultWorkshops,
  TWorkshopResponse,
  TDeleteWorkshopResponse,
  IAddWorkshopRequest,
  IChangeWorkshopRequest,
  IDeleteWorkshopRequest,
  IGetWorkshopsUserRequest,
  IAddCommentRequest,
  IChangeCommentRequest,
} from "./workshops.types";
import {
  resultWorkshopsSchema,
  workshopResponseSchema,
  deleteWorkshopResponseSchema,
} from "./workshops.schemas";
import { PATHS } from "../../../providers/paths.constants";

export const getWorkshops = (builder: Builder) =>
  builder.query<TResultWorkshops | null, void>({
    query: () => ({
      url: PATHS.workshopsGet,
      method: "GET",
    }),
    transformResponse: (response: unknown) => {
      const result = resultWorkshopsSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod getWorkshops:", {
          url: PATHS.workshopsGet,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const getWorkshopsUser = (builder: Builder) =>
  builder.query<TResultWorkshops | null, IGetWorkshopsUserRequest>({
    query: ({ userId }) => ({
      url: `${PATHS.workshopsGetUserId}?userId=${userId}`,
      method: "GET",
    }),
    transformResponse: (response: unknown) => {
      const result = resultWorkshopsSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod getWorkshopsUser:", {
          url: PATHS.workshopsGetUserId,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const addWorkshop = (builder: Builder) =>
  builder.mutation<TWorkshopResponse | null, IAddWorkshopRequest>({
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
        url: PATHS.workshopsAdd,
        method: "POST",
        body: formData,
      };
    },
    transformResponse: (response: unknown) => {
      const result = workshopResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod addWorkshop:", {
          url: PATHS.workshopsAdd,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const changeWorkshop = (builder: Builder) =>
  builder.mutation<TWorkshopResponse | null, IChangeWorkshopRequest>({
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
        url: PATHS.workshopsChange,
        method: "PUT",
        body: formData,
      };
    },
    transformResponse: (response: unknown) => {
      const result = workshopResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod changeWorkshop:", {
          url: PATHS.workshopsChange,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const deleteWorkshop = (builder: Builder) =>
  builder.mutation<TDeleteWorkshopResponse | null, IDeleteWorkshopRequest>({
    query: ({ body }) => ({
      url: PATHS.workshopsDelete,
      method: "DELETE",
      body,
    }),
    transformResponse: (response: unknown) => {
      const result = deleteWorkshopResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod deleteWorkshop:", {
          url: PATHS.workshopsDelete,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const addComment = (builder: Builder) =>
  builder.mutation<TWorkshopResponse | null, IAddCommentRequest>({
    query: ({ body }) => ({
      url: PATHS.workshopsCommentsAdd,
      method: "POST",
      body,
    }),
    transformResponse: (response: unknown) => {
      const result = workshopResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod addComment:", {
          url: PATHS.workshopsCommentsAdd,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const changeComment = (builder: Builder) =>
  builder.mutation<TWorkshopResponse | null, IChangeCommentRequest>({
    query: ({ body }) => ({
      url: PATHS.workshopsCommentsChange,
      method: "PUT",
      body,
    }),
    transformResponse: (response: unknown) => {
      const result = workshopResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod changeComment:", {
          url: PATHS.workshopsCommentsChange,
          data: response,
          error: result.error,
        });
      return null;
    },
  });
