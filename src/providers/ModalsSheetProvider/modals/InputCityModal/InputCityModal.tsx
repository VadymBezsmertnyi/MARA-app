import React, { FunctionComponent, useContext, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { GoogleAutoComplete } from "react-native-google-autocomplete";
import { GoogleLocationDetailResult } from "react-native-google-autocomplete/dist/services/Google.service";
import { Trans } from "@lingui/macro";

// types
import { ModalSheetTypes } from "../../ModalsSheetProvider.types";

// providers
import { localesContext } from "../../../../../localization/localization.provider";

// components
import { Input } from "../../../../components/Input/Input";
import { ButtonCustom } from "../../../../components/ButtonCustom/ButtonCustom";

// helps
import { getStreetNumber } from "../../../../helps/helps";

// icons
import { IconSearchInput } from "../../../../icons/components";

// styles
import { styles } from "./InputCityModal.styles";

const EXPO_PUBLIC_API_KEY_GOOGLE_WEB = process.env
  .EXPO_PUBLIC_API_KEY_GOOGLE_WEB as string;

type InputCityModalProps = {
  setCity: React.Dispatch<
    React.SetStateAction<GoogleLocationDetailResult | null>
  >;
  setModalType: React.Dispatch<React.SetStateAction<ModalSheetTypes | null>>;
};

export const InputCityModal: FunctionComponent<InputCityModalProps> = ({
  setCity,
  setModalType,
}) => {
  const [selectCity, setSelectCity] = useState<string | null>(null);
  const { i18n, language } = useContext(localesContext);

  return (
    <View style={styles.container}>
      <GoogleAutoComplete
        apiKey={EXPO_PUBLIC_API_KEY_GOOGLE_WEB}
        debounce={1000}
        language={language}
        queryTypes="(cities)"
      >
        {({ inputValue, handleTextChange, locationResults, fetchDetails }) => (
          <React.Fragment>
            <View style={styles.containerTitle}>
              <Text style={styles.title}>
                <Trans>Your location</Trans>
              </Text>
              <View style={styles.lineTitle} />
            </View>
            <View style={styles.containerInput}>
              <Input
                placeholder={i18n._("Enter text to search")}
                label={i18n._("Choose a city:")}
                defaultValue={inputValue}
                onChange={(value) => {
                  setSelectCity(null);
                  setCity(null);
                  handleTextChange(value);
                }}
                labelStyle={styles.titleInput}
                InputIcon={<IconSearchInput width={26} height={26} />}
              />
            </View>
            <ScrollView style={styles.containerList}>
              {inputValue.length >= 2
                ? locationResults.map((address) => {
                    const { address: streetTitle, cityCountry: cityTitle } =
                      getStreetNumber(address.terms);
                    const isSelect = selectCity === address.place_id;
                    const selectPointStyle = () =>
                      isSelect
                        ? [styles.pointItemList, styles.selectPointItemList]
                        : styles.pointItemList;
                    const inSelectPointStyle = () =>
                      isSelect ? styles.inSelectPointItemList : {};
                    return (
                      <TouchableOpacity
                        key={`address-google=${address.place_id}`}
                        onPress={async () => {
                          const resultLocation = await fetchDetails(
                            address.place_id
                          );
                          setCity(resultLocation);
                          setSelectCity(resultLocation.place_id);
                        }}
                        style={styles.containerItemList}
                      >
                        <View style={styles.titleItemList}>
                          <Text style={styles.streetTitleItemList}>
                            {streetTitle}
                          </Text>
                          <Text style={styles.cityTitleItemList}>
                            {cityTitle}
                          </Text>
                        </View>
                        <View style={selectPointStyle()}>
                          <View style={inSelectPointStyle()} />
                        </View>
                      </TouchableOpacity>
                    );
                  })
                : null}
              <View style={styles.containerButton}>
                <ButtonCustom
                  disabled={!selectCity}
                  title={i18n._("Select")}
                  onSubmit={() => {
                    setModalType(null);
                  }}
                  styleButton={styles.buttonSelectMap}
                />
              </View>
            </ScrollView>
          </React.Fragment>
        )}
      </GoogleAutoComplete>
    </View>
  );
};
