import { z } from "zod";
import {
  currencySchema,
  codeCurrenciesSchema,
  currenciesSchema,
  paymentStateSchema,
} from "./payment.schemas";

export type TCurrency = z.infer<typeof currencySchema>;
export type TCodeCurrencies = z.infer<typeof codeCurrenciesSchema>;
export type TCurrencies = z.infer<typeof currenciesSchema>;
export type TPaymentState = z.infer<typeof paymentStateSchema>;
