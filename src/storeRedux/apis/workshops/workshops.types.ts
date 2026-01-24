import { z } from "zod";
import { ImagePickerAsset } from "expo-image-picker";
import {
  typeWorkSchema,
  typeWorksSchema,
  commentWorkshopSchema,
  workshopSchema,
  workshopsSchema,
  resultWorkshopsSchema,
  workshopResponseSchema,
  deleteWorkshopResponseSchema,
  addWorkshopRequestSchema,
  changeWorkshopRequestSchema,
  deleteWorkshopRequestSchema,
  addCommentRequestSchema,
  changeCommentRequestSchema,
  workshopsStateSchema,
  paginationSchema,
} from "./workshops.schemas";

export type TTypeWork = z.infer<typeof typeWorkSchema>;
export type TTypeWorks = z.infer<typeof typeWorksSchema>;
export type TWorkshop = z.infer<typeof workshopSchema>;
export type TWorkshops = z.infer<typeof workshopsSchema>;
export type TPagination = z.infer<typeof paginationSchema>;
export type TResultWorkshops = z.infer<typeof resultWorkshopsSchema>;
export type TWorkshopResponse = z.infer<typeof workshopResponseSchema>;
export type TDeleteWorkshopResponse = z.infer<
  typeof deleteWorkshopResponseSchema
>;
export type TAddWorkshopRequest = z.infer<typeof addWorkshopRequestSchema>;
export type TChangeWorkshopRequest = z.infer<
  typeof changeWorkshopRequestSchema
>;
export type TDeleteWorkshopRequest = z.infer<
  typeof deleteWorkshopRequestSchema
>;
export type TAddCommentRequest = z.infer<typeof addCommentRequestSchema>;
export type TChangeCommentRequest = z.infer<typeof changeCommentRequestSchema>;
export type TWorkshopsState = z.infer<typeof workshopsStateSchema>;

type ImageFileType =
  | ImagePickerAsset
  | {
      _id?: string;
      url?: string;
      uri?: string;
    };

export interface IAddWorkshopRequest {
  body: TAddWorkshopRequest & {
    imageFiles?: Array<ImageFileType>;
  };
}

export interface IChangeWorkshopRequest {
  body: TChangeWorkshopRequest & {
    imageFiles?: Array<ImageFileType>;
  };
}

export interface IDeleteWorkshopRequest {
  body: TDeleteWorkshopRequest;
}

export interface IAddCommentRequest {
  body: TAddCommentRequest;
}

export interface IChangeCommentRequest {
  body: TChangeCommentRequest;
}

export interface IGetWorkshopsRequest {
  page?: number;
  limit?: number;
  sort?: "comments" | "distance" | "rating" | null;
  moto?: number[] | null;
  auto?: number[] | null;
  maxDistance?: number;
  minRating?: number | null;
  workshopName?: string;
  latitude?: number;
  longitude?: number;
}

export interface IGetWorkshopsUserRequest {
  userId: string;
  page?: number;
  limit?: number;
  sort?: "comments" | "distance" | "rating" | null;
  moto?: number[] | null;
  auto?: number[] | null;
  maxDistance?: number;
  minRating?: number | null;
  workshopName?: string;
  latitude?: number;
  longitude?: number;
}

export type TCommentWorkshop = z.infer<typeof commentWorkshopSchema>;
