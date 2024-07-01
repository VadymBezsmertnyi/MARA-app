import { z } from "zod";
import { coordinatesSchema } from "../PlacesProvider/PlacesProvider.schemas";
import { imageSchema } from "../../components/ImageModal/ImageModal.schemas";

export const phoneSchema = z.object({
  phoneNumber: z.string(),
  selectCountryIso: z.string(),
  isTelegram: z.boolean(),
  isWhatsApp: z.boolean(),
  isViber: z.boolean(),
});

export const businessMarketSchema = z.object({
  _id: z.string(),
  userId: z
    .object({
      _id: z.string(),
      avatar: z
        .object({
          _id: z.any(),
          url: z.string(),
          image: imageSchema.optional(),
        })
        .nullable(),
      firstName: z.string(),
      lastName: z.string(),
      phoneNumber: z.string(),
    })
    .nullable(),
  logo: z
    .object({
      _id: z.string(),
      url: z.string(),
      width: z.number(),
      height: z.number(),
    })
    .nullable(),
  name: z.string(),
  place: z
    .object({
      place_id: z.string(),
      region_place_id: z.string(),
      country_place_id: z.string(),
      place_address: z.string(),
      coordinates: coordinatesSchema,
    })
    .nullable(),
  mainPhoneNumber: phoneSchema,
  otherPhoneNumbers: z.array(phoneSchema).nullable(),
});
