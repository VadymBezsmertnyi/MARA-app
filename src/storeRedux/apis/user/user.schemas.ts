import { z } from "zod";
import { languagesKeys } from "../../../../localization/localization.const";
import {
  countryDbSchema,
  placeDbSchema,
  regionDbSchema,
} from "../../../providers/PlacesProvider/PlacesProvider.schemas";
import { workshopSchema } from "../../../providers/WorkshopsProvider/WorkshopsProvider.schemas";
import { eventSchema } from "../../../providers/EventsProvider/EventsProvider.schemas";
import {
  subscriptionAdvertSchema,
  subscriptionAdvertUpdateSchema,
  subscriptionWorkshopSchema,
} from "../../../providers/SubscriptionProvider/SubscriptionProvider.schemas";
import { fileSchema } from "../../schemas";

export const googleBDSchema = z.object({
  iss: z.string(),
  at_hash: z.string().optional(),
  email_verified: z.string().or(z.boolean()).optional(),
  sub: z.string(),
  azp: z.string().optional(),
  email: z.string().optional(),
  profile: z.string().optional(),
  picture: z.string().optional(),
  name: z.string().optional(),
  given_name: z.string().optional(),
  family_name: z.string().optional(),
  aud: z.string(),
  iat: z.number(),
  exp: z.number(),
  nonce: z.string().optional(),
  hd: z.string().optional(),
  locale: z.string().optional(),
});

export const facebookBDSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  name: z.string(),
  email: z.string(),
});

export const userDataSchema = z.object({
  _id: z.string(),
  isGeoLocation: z.boolean(),
  isGeoLocationBackground: z.boolean(),
  avatarFile: fileSchema.nullable().default(null),
  email: z.string().nullable(),
  eventsIds: z.array(eventSchema),
  workshopsIds: z.array(workshopSchema),
  isCheckBiometric: z.boolean().nullable(),
  languageLocal: z.enum(languagesKeys),
  isNewUser: z.boolean(),
  isDeleteUser: z.boolean(),
  googleDate: googleBDSchema.nullable(),
  facebookDate: facebookBDSchema.nullable(),
  place_id: placeDbSchema.nullable(),
  region_place_id: regionDbSchema.nullable(),
  country_place_id: countryDbSchema.nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  subscriptionAdvertIds: z.array(subscriptionAdvertSchema),
  subscriptionEventIds: z.array(subscriptionAdvertUpdateSchema),
  subscriptionWorkshopIds: z.array(subscriptionWorkshopSchema),
  defaultAmount: z.object({
    advertAmount: z.number(),
    advertBusinessAmount: z.number(),
    eventSmallAmount: z.number(),
    eventBigAmount: z.number(),
    workshopAmount: z.number(),
  }),
});

export const userTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const loginResponseSchema = z.object({
  userData: userDataSchema,
  tokens: userTokensSchema,
});

export const meResponseSchema = z.object({
  userData: userDataSchema,
});

export const editUserRequestSchema = userDataSchema.partial();

export const deleteUserRequestSchema = z.object({
  _id: z.string(),
});

export const deleteUserResponseSchema = z.object({
  result: z.boolean(),
});

export const userStateSchema = z.object({
  userData: userDataSchema.nullable(),
  isChangeAvatar: z.boolean(),
  loading: z.boolean(),
  error: z.string().nullable(),
});
