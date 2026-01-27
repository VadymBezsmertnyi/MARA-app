import z from "zod";
import { ipApiGetCountryResponseSchema } from "./MapProvider.schemas";

export type TIpApiGetCountryResponse = z.infer<
  typeof ipApiGetCountryResponseSchema
>;
