import { z } from "zod";
import {
  smsVerificationResponseSchema,
  sendSmsVerificationRequestSchema,
  verifySmsCodeRequestSchema,
} from "./sms-verification.schemas";

export type TSmsVerificationResponse = z.infer<
  typeof smsVerificationResponseSchema
>;

export type TSendSmsVerificationRequest = z.infer<
  typeof sendSmsVerificationRequestSchema
>;

export type TVerifySmsCodeRequest = z.infer<typeof verifySmsCodeRequestSchema>;

export interface ISendSmsVerificationRequest {
  body: TSendSmsVerificationRequest;
}

export interface IVerifySmsCodeRequest {
  body: TVerifySmsCodeRequest;
}

export interface TSmsVerificationState {
  loading: boolean;
  error: string | null;
}
