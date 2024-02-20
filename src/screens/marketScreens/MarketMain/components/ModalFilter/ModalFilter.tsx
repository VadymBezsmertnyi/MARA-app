import React, { FunctionComponent, useContext, useState } from "react";
import { Modal, StatusBar, Text, View } from "react-native";
import { Trans } from "@lingui/macro";

// types
import { CurrencyType } from "../../../../../providers/PaymentProvider/PaymentProvider.types";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";
import { paymentContext } from "../../../../../providers/PaymentProvider/PaymentProvider";

// components
import { Header } from "../../../../../components/Header/Header";
import { InputButton } from "../../../../../components/InputButton/InputButton";
import { SelectTwoButtons } from "../../../../../components/SelectTwoButtons/SelectTwoButtons";
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";
import { InputSlider } from "../../../../../components/InputSlider/InputSlider";

// icons
import { IconArrowRightEvent } from "../../../../../icons/components";

// styles
import { styles } from "./ModalFilter.styles";
import colors from "../../../../../../styles/colors";

type ModalFilterProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalFilter: FunctionComponent<ModalFilterProps> = ({
  isOpen,
  onClose,
}) => {
  const { i18n } = useContext(localesContext);
  const { listCurrency } = useContext(paymentContext);
  const [selectCurrency, setSelectCurrency] = useState<CurrencyType | null>(
    null
  );
  const [price, setPrice] = useState(200);

  const onSubmitFilters = () => {};

  return (
    <Modal transparent visible={isOpen}>
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.lightOrange} />
        <Header
          title={i18n._("Filter")}
          onPressLeftElement={onClose}
          backgroundStyle={styles.headerBackground}
          rightStyle={styles.containerRightHeader}
        />
        <View style={styles.containerInputs}>
          <InputButton
            isSelect
            placeholder={i18n._("Category")}
            value={i18n._("Category")}
            onPress={() => {}}
            rightElementInput={
              <IconArrowRightEvent
                width={15}
                height={15}
                fill={colors.blackCoffee}
              />
            }
            containerStyle={styles.containerStyleInputButton}
            inputWrapperStyle={styles.inputWrapperStyleInputButton}
          />
          <InputButton
            isSelect
            label={i18n._("Location")}
            placeholder={i18n._("Choose a city")}
            value={""}
            onPress={() => {}}
            rightElementInput={
              <IconArrowRightEvent
                width={15}
                height={15}
                fill={colors.blackCoffee}
              />
            }
            containerStyle={styles.containerStyleInputButton}
            inputWrapperStyle={styles.inputWrapperStyleInputButton}
          />
          <SelectTwoButtons
            isSelectFirst={null}
            titleFirst={i18n._("New")}
            titleSecond={i18n._("Used")}
            label={i18n._("The state of the goods:")}
            onPressFirst={() => {}}
            onPressSecond={() => {}}
            containerStyle={styles.containerTwoButtons}
            labelStyle={styles.labelSelect}
          />
          <SelectTwoButtons
            isSelectFirst={null}
            titleFirst={i18n._("Private individual")}
            titleSecond={i18n._("Business")}
            label={i18n._("Seller:")}
            onPressFirst={() => {}}
            onPressSecond={() => {}}
            containerStyle={styles.containerTwoButtons}
            labelStyle={styles.labelSelect}
          />
          <View style={styles.containerCurrencies}>
            <Text style={styles.labelOther}>
              <Trans>Currency:</Trans>
            </Text>
            <View style={styles.listCurrencies}>
              {listCurrency.map((currency) => (
                <ButtonCustom
                  key={`currency=${currency.code}`}
                  disabledShadow
                  title={currency.symbol}
                  type={
                    selectCurrency?.code === currency.code
                      ? "full"
                      : "transparent"
                  }
                  onSubmit={() => {
                    setSelectCurrency((state) =>
                      state?.code === currency.code ? null : currency
                    );
                  }}
                  styleContainer={styles.containerButtonCurrency}
                  styleTitle={styles.titleButtonCurrency}
                />
              ))}
            </View>
          </View>
          <InputSlider
            disabled={selectCurrency === null}
            label={i18n._("Price, {symbol}:", {
              symbol: selectCurrency?.symbol || listCurrency[0].symbol,
            })}
            min={0}
            max={5000}
            value={price}
            onChange={setPrice}
          />
          <ButtonCustom
            title={i18n._("Filtering")}
            onSubmit={onSubmitFilters}
            styleContainer={styles.buttonSubmit}
          />
        </View>
      </View>
    </Modal>
  );
};
