import { z } from "zod";
import { imageSchema } from "./ModalsProvider.schemas";

export type ImageType = z.infer<typeof imageSchema>;
export type ModalTypes = "image" | "gallery";
export type ImageModalType = {
  index: number;
  image: ImageType;
};
