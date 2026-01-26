import { z } from "zod";

export const smsVerificationResponseSchema = z.object({
  status: z.enum(["success", "error"]),
  reason: z.string().optional(),
  type: z.string().optional(),
});

export const sendSmsVerificationRequestSchema = z.object({
  workshopId: z.string(),
  phoneNumber: z.string(),
});

export const verifySmsCodeRequestSchema = z.object({
  workshopId: z.string(),
  code: z.string().length(6),
});
