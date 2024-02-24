import { z } from "zod";
import {
  METHOD_NAME_AUTH_APPLE,
  METHOD_NAME_AUTH_AUTO,
  METHOD_NAME_AUTH_FACEBOOK,
  METHOD_NAME_AUTH_GOOGLE,
} from "./AnalyticsProvider.constants";

export const methodAuthSchema = z.enum([
  METHOD_NAME_AUTH_GOOGLE,
  METHOD_NAME_AUTH_FACEBOOK,
  METHOD_NAME_AUTH_APPLE,
  METHOD_NAME_AUTH_AUTO,
]);
