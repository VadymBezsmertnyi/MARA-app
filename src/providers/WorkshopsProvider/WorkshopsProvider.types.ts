import { z } from "zod";
import {
  typeWorkSchema,
  typeWorksSchema,
  workshopS,
  workshopsS,
} from "./WorkshopsProvider.schemas";

export type TypeWorkType = z.infer<typeof typeWorkSchema>;
export type TypeWorksType = z.infer<typeof typeWorksSchema>;

export type WorkshopT = z.infer<typeof workshopS>;
export type WorkshopsT = z.infer<typeof workshopsS>;
