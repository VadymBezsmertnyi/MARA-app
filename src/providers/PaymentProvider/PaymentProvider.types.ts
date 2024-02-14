import { z } from "zod";
import {
  codeCurrenciesSchema,
  currencySchema,
} from "./PaymentProvider.schemas";

export type CurrencyType = z.infer<typeof currencySchema>;

export type CodeCurrenciesType = z.infer<typeof codeCurrenciesSchema>;
