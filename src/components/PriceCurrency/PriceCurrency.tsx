import React, { FunctionComponent, useMemo } from "react";
import { Text, View } from "react-native";

// types
import { CodeCurrenciesType } from "../../providers/PaymentProvider/PaymentProvider.types";

// schemas
import { codeCurrenciesSchema } from "../../providers/PaymentProvider/PaymentProvider.schemas";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";
import { usePaymentProvider } from "../../providers/PaymentProvider/PaymentProvider";

// components
import { Input } from "../Input/Input";
import { SelectPicker } from "../SelectPicker/SelectPicker";

// styles
import { styles } from "./PriceCurrency.styles";

type PriceCurrencyProps = {
  isRegular?: boolean;
  label?: string;
  value: string;
  code: CodeCurrenciesType;
  setCode: React.Dispatch<React.SetStateAction<CodeCurrenciesType>>;
  onChange: (value: string) => void;
  errorMessage?: string;
  clearKeyError: (type: string) => void;
};

export const PriceCurrency: FunctionComponent<PriceCurrencyProps> = ({
  isRegular = false,
  label,
  value,
  code,
  setCode,
  onChange,
  errorMessage,
  clearKeyError,
}) => {
  const { i18n } = useLocalesProvider();
  const { listCurrency } = usePaymentProvider();
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
        {label ? label : i18n._("The price of the item")}
        {isRegular ? (
          <>
            :<Text style={styles.labelRegular}>*</Text>
          </>
        ) : (
          ":"
        )}
      </Text>
      <View style={styles.containerInputs}>
        <Input
          keyboardType="numeric"
          placeholder={"100"}
          value={value}
          onChange={(value) => {
            onChange(value);
            clearKeyError("price");
          }}
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
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
};
