import { Builder } from "../../api";
import {
  TSmsVerificationResponse,
  ISendSmsVerificationRequest,
  IVerifySmsCodeRequest,
} from "./sms-verification.types";
import { smsVerificationResponseSchema } from "./sms-verification.schemas";
import { PATHS } from "../../../providers/paths.constants";

export const sendSmsVerification = (builder: Builder) =>
  builder.mutation<
    TSmsVerificationResponse | null,
    ISendSmsVerificationRequest
  >({
    query: ({ body }) => ({
      url: PATHS.smsVerificationSend,
      method: "POST",
      body,
    }),
    transformResponse: (response: unknown) => {
      const result = smsVerificationResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod sendSmsVerification:", {
          url: PATHS.smsVerificationSend,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const verifySmsCode = (builder: Builder) =>
  builder.mutation<TSmsVerificationResponse | null, IVerifySmsCodeRequest>({
    query: ({ body }) => ({
      url: PATHS.smsVerificationVerify,
      method: "POST",
      body,
    }),
    transformResponse: (response: unknown) => {
      const result = smsVerificationResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod verifySmsCode:", {
          url: PATHS.smsVerificationVerify,
          data: response,
          error: result.error,
        });
      return null;
    },
  });
