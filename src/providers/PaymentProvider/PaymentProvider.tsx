import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import CurrencyList from "currency-list";

// types
import { CurrenciesType, CurrencyType } from "./PaymentProvider.types";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

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

const PaymentProvider: FunctionComponent<PaymentProviderProps> = ({
  children,
}) => {
  const { language } = useLocalesProvider();
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

export const usePaymentProvider = () => useContext(paymentContext);

export default PaymentProvider;
