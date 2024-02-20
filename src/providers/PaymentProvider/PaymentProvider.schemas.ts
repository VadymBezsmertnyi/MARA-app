import { z } from "zod";

export const codeCurrenciesSchema = z.enum(["UAH", "USD", "EUR"]);

export const currencySchema = z.object({
  name: z.string(),
  symbol_native: z.string(),
  symbol: z.string(),
  code: codeCurrenciesSchema,
  name_plural: z.string(),
  rounding: z.number(),
  decimal_digits: z.number(),
});
