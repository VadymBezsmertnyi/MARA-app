import { z } from 'zod';
import { NUMBER_TWO } from './user.constants';
import { languagesKeys } from '../../../localization/localization.const';

export const userDataS = z.object({
  // new
  id: z.number(),
  isGeoLocation: z.boolean(),
  // old
  phone_number: z.string(),
  is_password: z.boolean(),
  time_token: z.number(),
  is_verified: z.boolean(),
  verify_code: z.string(),
  verify_token: z.string(),
  nick: z.string(),
  first_name: z.string(),
  family_name: z.string(),
  photo_url: z.string(),
  locale: z.enum(languagesKeys),
  motoIds: z.array(z.number().or(z.string())),
  autoIds: z.array(z.number().or(z.string())),
  location_end: z.array(z.number()).max(NUMBER_TWO).nullable(),
  location_sos: z.array(z.number()).max(NUMBER_TWO).nullable(),
  accessLocations: z.boolean(),
  city_user_id: z.string().nullable(),
});

export const resultUserDataS = z.object({
  result: z.boolean(),
  userData: userDataS,
  code: z.number(),
});
