import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import CurrencyList from "currency-list";

// types
import { CurrenciesType, CurrencyType } from "./PaymentProvider.types";

// providers
import { localesContext } from "../../../localization/localization.provider";

// constants
import { LIST_CURRENCIES } from "./PaymentProvider.constants";

type PaymentContext = {
  listCurrency: CurrencyType[];
  currencies: CurrenciesType | null;
  setCurrencies: React.Dispatch<React.SetStateAction<CurrenciesType | null>>;
};

type PaymentProviderProps = {
  children: React.ReactNode;
};

export const paymentContext = React.createContext({} as PaymentContext);

export const PaymentProvider: FunctionComponent<PaymentProviderProps> = ({
  children,
}) => {
  const { language } = useContext(localesContext);
  const [currencies, setCurrencies] = useState<CurrenciesType | null>(null);
  const listCurrency = useMemo(
    () =>
      LIST_CURRENCIES.map(
        (currency: string) =>
          CurrencyList.get(currency, language) as CurrencyType
      ),
    [language]
  );

  const valueContext: PaymentContext = useMemo(
    () => ({ listCurrency, currencies, setCurrencies }),
    [listCurrency, currencies]
  );

  return (
    <paymentContext.Provider value={valueContext}>
      {children}
    </paymentContext.Provider>
  );
};
