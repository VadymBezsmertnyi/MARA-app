import { z } from 'zod';

export const sessionRolesSchema = z.enum(['user', 'admin', 'moderation']).nullable();

export const sessionSchema = z.object({
  id: z.number().nullable(),
  role: sessionRolesSchema.nullable(),
  token: z.string().nullable(),
});

export const responseSchema = z.object({
  code: z.number(),
  status: z.string(),
});
