import React, { FunctionComponent, useContext, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { GoogleAutoComplete } from "react-native-google-autocomplete";
import { GoogleLocationDetailResult } from "react-native-google-autocomplete/dist/services/Google.service";
import { Trans } from "@lingui/macro";

// types

// providers
import { localesContext } from "../../../localization/localization.provider";

// components
import { Input } from "../Input/Input";
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";
import { CheckboxPoint } from "../CheckboxPoint/CheckboxPoint";

// helps
import { getStreetNumber } from "../../helps/helps";

// icons
import { IconSearchInput } from "../../icons/components";

// styles
import { styles } from "./InputCityModal.styles";

const EXPO_PUBLIC_API_KEY_GOOGLE_WEB_PLACES = process.env
  .EXPO_PUBLIC_API_KEY_GOOGLE_WEB_PLACES as string;

type InputCityModalProps = {
  setCity: React.Dispatch<
    React.SetStateAction<GoogleLocationDetailResult | null>
  >;
  setModalType: (value: null) => void;
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
        apiKey={EXPO_PUBLIC_API_KEY_GOOGLE_WEB_PLACES}
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
                accessibilityLabel={i18n._(
                  "Press and enter to search for a city"
                )}
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
                    return (
                      <TouchableOpacity
                        key={`address-google=${address.place_id}`}
                        accessibilityLabel={i18n._(
                          "Select the city {cityName}",
                          { cityName: cityTitle }
                        )}
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
                        <CheckboxPoint isSelect={isSelect} />
                      </TouchableOpacity>
                    );
                  })
                : null}
              <View style={styles.containerButton}>
                <ButtonCustom
                  accessibilityLabel={i18n._(
                    "If you have selected a city, press to confirm"
                  )}
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
