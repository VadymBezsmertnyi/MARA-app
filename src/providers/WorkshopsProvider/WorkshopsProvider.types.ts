import { z } from "zod";
import { workshopS, workshopsS } from "./WorkshopsProvider.schemas";

export type WorkshopT = z.infer<typeof workshopS>;
export type WorkshopsT = z.infer<typeof workshopsS>;
