import React, { FunctionComponent, useContext, useMemo } from "react";
import CurrencyList from "currency-list";

// types
import { CurrencyType } from "./PaymentProvider.types";

// providers
import { localesContext } from "../../../localization/localization.provider";

// constants
import { LIST_CURRENCIES } from "./PaymentProvider.constants";

type PaymentContext = {
  listCurrency: CurrencyType[];
};

type PaymentProviderProps = {
  children: React.ReactNode;
};

export const paymentContext = React.createContext({} as PaymentContext);

export const PaymentProvider: FunctionComponent<PaymentProviderProps> = ({
  children,
}) => {
  const { language } = useContext(localesContext);
  const listCurrency = useMemo(
    () =>
      LIST_CURRENCIES.map(
        (currency: string) =>
          CurrencyList.get(currency, language) as CurrencyType
      ),
    [language]
  );

  const valueContext: PaymentContext = useMemo(
    () => ({ listCurrency }),
    [listCurrency]
  );

  return (
    <paymentContext.Provider value={valueContext}>
      {children}
    </paymentContext.Provider>
  );
};
