import { z } from "zod";
import { imageSchema } from "./ImageModal.schemas";

export type ImageType = z.infer<typeof imageSchema>;
export type ImageModalType = {
  index: number;
  image: ImageType;
};
