import z from "zod";

export const fileSchema = z.object({
  _id: z.string(),
  url: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
  fileType: z.string().optional(),
  folder: z.string().optional(),
});

export const tempFileSchema = z.object({
  uri: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});
export const tempFilesSchema = z.array(tempFileSchema);

export const filesSchema = z.array(fileSchema);
