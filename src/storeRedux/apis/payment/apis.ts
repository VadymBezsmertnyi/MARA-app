import { Builder } from "../../api";
import { TCurrencies } from "./payment.types";
import { currenciesSchema } from "./payment.schemas";

const CURRENCIES_PATH = "/beauty-sync/currencies/";

export const getCurrencies = (builder: Builder) =>
  builder.query<TCurrencies | null, void>({
    query: () => ({
      url: CURRENCIES_PATH,
      method: "GET",
    }),
    transformResponse: (response: unknown) => {
      const result = currenciesSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod getCurrencies:", {
          url: CURRENCIES_PATH,
          data: response,
          error: result.error,
        });
      return null;
    },
  });
