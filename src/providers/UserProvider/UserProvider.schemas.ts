import { z } from "zod";
import { languagesKeys } from "../../../localization/localization.const";

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

export const userDataS = z.object({
  // new
  id: z.number(),
  isGeoLocation: z.boolean(),
  avatar: z
    .object({
      id: z.string(),
      url: z.string(),
    })
    .nullable(),
  email: z.string().nullable(),
  eventsIds: z.array(z.number()),
  workshopsIds: z.array(z.number()),
  productsIds: z.array(z.number()),
  isCheckBiometric: z.boolean().nullable(),
  verifyToken: z.string().nullable(),
  timeToken: z.number(),
  languageLocal: z.enum(languagesKeys),
  isNewUser: z.boolean(),
  isDeleteUser: z.boolean(),
  googleDate: googleBDSchema.nullable(),
  facebookDate: facebookBDSchema.nullable(),
  place_id: z.string().nullable(),
  region_place_id: z.string().nullable(),
  country_place_id: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  subscriptionId: z.string().nullable(),
  settingsSos: z.object({
    isEnable: z.boolean(),
    radiusKm: z.number(),
  }),
});

export const resultUserDataS = z.object({
  result: z.boolean(),
  userData: userDataS,
  code: z.number(),
});
