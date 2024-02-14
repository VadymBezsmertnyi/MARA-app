import React, { FunctionComponent, useContext, useMemo } from "react";
import { Text, View } from "react-native";

// types
import { CodeCurrenciesType } from "../../providers/PaymentProvider/PaymentProvider.types";

// schemas
import { codeCurrenciesSchema } from "../../providers/PaymentProvider/PaymentProvider.schemas";

// providers
import { localesContext } from "../../../localization/localization.provider";
import { paymentContext } from "../../providers/PaymentProvider/PaymentProvider";

// components
import { Input } from "../Input/Input";
import { SelectPicker } from "../SelectPicker/SelectPicker";

// styles
import { styles } from "./PriceCurrency.styles";

type PriceCurrencyProps = {
  label?: string;
  value: string;
  code: CodeCurrenciesType;
  setCode: React.Dispatch<React.SetStateAction<CodeCurrenciesType>>;
  onChange: (value: string) => void;
};

export const PriceCurrency: FunctionComponent<PriceCurrencyProps> = ({
  label,
  value,
  code,
  setCode,
  onChange,
}) => {
  const { i18n } = useContext(localesContext);
  const { listCurrency } = useContext(paymentContext);
  const data = useMemo(
    () =>
      listCurrency.map((currency) => ({
        title: `${currency.symbol} (${currency.name})`,
        key: currency.code,
      })),
    []
  );
  const showCurrency = useMemo(
    () =>
      listCurrency.find((currency) => currency.code === code) ||
      listCurrency[0],
    [code]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label ? label : i18n._("The price of the item")}:
      </Text>
      <View style={styles.containerInputs}>
        <Input
          keyboardType="numeric"
          placeholder={"100"}
          value={value}
          onChange={onChange}
          containerStyle={styles.containerInput}
        />
        <SelectPicker
          value={code}
          onChange={({ key }) => {
            const resultCurrent = codeCurrenciesSchema.safeParse(key);
            if (resultCurrent.success) setCode(resultCurrent.data);
          }}
          otherTitle={showCurrency.symbol}
          data={data}
          containerStyle={styles.containerInput}
          inputStyle={styles.input}
        />
      </View>
    </View>
  );
};
