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

export const dateToNMY = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDay = day < 10 ? `0${day}` : day.toString();
  const formattedMonth = month < 10 ? `0${month}` : month.toString();
  const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;
  return formattedDate;
};
