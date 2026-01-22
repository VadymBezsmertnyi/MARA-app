import z from "zod";
import { tempFileSchema } from "./schemas";

export type TempFileType = z.infer<typeof tempFileSchema>;
