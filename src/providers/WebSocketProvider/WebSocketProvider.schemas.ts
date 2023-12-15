import { z } from 'zod';
import { locationObjectCoordsSchema } from '../MapProvider/MapProvider.scheams';

export const dataLocationUserSchema = z.object({
  type: z.enum(['geoLocation']),
  userId: z.number(),
  geoLocation: locationObjectCoordsSchema,
  date: z.number(),
});

export const geolocationUsersSchema = z.record(dataLocationUserSchema);

export const stateSchema = z.object({
  currentTime: z.string(),
  connection: z.boolean(),
  userIdDB: z.number().nullable(),
  geolocationUsers: geolocationUsersSchema.nullable(),
});
