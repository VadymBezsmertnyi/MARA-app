import z from "zod";
import { fileSchema, tempFileSchema } from "./schemas";

export type ImageFileType = z.infer<typeof fileSchema>;
export type TempFileType = z.infer<typeof tempFileSchema>;
