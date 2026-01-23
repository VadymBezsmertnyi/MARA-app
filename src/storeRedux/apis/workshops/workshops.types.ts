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
} from "./workshops.schemas";

export type TTypeWork = z.infer<typeof typeWorkSchema>;
export type TTypeWorks = z.infer<typeof typeWorksSchema>;
export type TWorkshop = z.infer<typeof workshopSchema>;
export type TWorkshops = z.infer<typeof workshopsSchema>;
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

export interface IAddWorkshopRequest {
  body: TAddWorkshopRequest & {
    imageFiles?: Array<ImagePickerAsset | { _id?: string; url: string }>;
  };
}

export interface IChangeWorkshopRequest {
  body: TChangeWorkshopRequest & {
    imageFiles?: Array<ImagePickerAsset | { _id?: string; url: string }>;
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

export interface IGetWorkshopsUserRequest {
  userId: string;
}

export type TCommentWorkshop = z.infer<typeof commentWorkshopSchema>;
