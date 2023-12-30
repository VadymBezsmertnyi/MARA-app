import React, { FunctionComponent, useContext } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { GoogleAutoComplete } from "react-native-google-autocomplete";
import { Trans } from "@lingui/macro";

// providers
import { localesContext } from "../../../../../localization/localization.provider";

// components
import { Input } from "../../../../components/Input/Input";
import { ButtonCustom } from "../../../../components/ButtonCustom/ButtonCustom";

// helps
import { getStreetNumber } from "../../../../helps/helps";

// icons
import { IconMapCustom } from "../../../../icons/components";

// styles
import { styles } from "./InputLocationModal.styles";
import colors from "../../../../../styles/colors";
import { GoogleLocationDetailResult } from "react-native-google-autocomplete/dist/services/Google.service";

const EXPO_PUBLIC_API_KEY_GOOGLE_WEB = process.env
  .EXPO_PUBLIC_API_KEY_GOOGLE_WEB as string;

type InputLocationModalProps = {
  location: GoogleLocationDetailResult | null;
  setLocation: (location: GoogleLocationDetailResult) => void;
};

export const InputLocationModal: FunctionComponent<InputLocationModalProps> = ({
  location,
  setLocation,
}) => {
  const { i18n, language } = useContext(localesContext);

  return (
    <View style={styles.container}>
      <GoogleAutoComplete
        apiKey={EXPO_PUBLIC_API_KEY_GOOGLE_WEB}
        debounce={1000}
        language={language}
      >
        {({ inputValue, handleTextChange, locationResults, fetchDetails }) => (
          <React.Fragment>
            <View style={styles.containerInput}>
              <Input
                placeholder={i18n._("Enter the address")}
                label={i18n._("Enter the address")}
                defaultValue={inputValue}
                onChange={handleTextChange}
              />
            </View>

            <ScrollView style={styles.containerList}>
              {inputValue.length >= 2
                ? locationResults.map((address) => {
                    const { address: streetTitle, cityCountry: cityTitle } =
                      getStreetNumber(address.terms);
                    return (
                      <TouchableOpacity
                        key={`address-google=${address.place_id}`}
                        onPress={async () => {
                          const resultLocation = await fetchDetails(
                            address.place_id
                          );
                          setLocation(resultLocation);
                        }}
                        style={styles.itemList}
                      >
                        <Text style={styles.streetTitleItemList}>
                          {streetTitle}
                        </Text>
                        <Text style={styles.cityTitleItemList}>
                          {cityTitle}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                : null}
              <View style={styles.containerButton}>
                <ButtonCustom
                  title={i18n._("Select on the map")}
                  onSubmit={() => {}}
                  styleButton={styles.buttonSelectMap}
                >
                  <>
                    <IconMapCustom
                      width={28}
                      height={23}
                      stroke={colors.white}
                    />
                    <Text style={styles.titleButtonSelectMap}>
                      <Trans>Select on the map</Trans>
                    </Text>
                  </>
                </ButtonCustom>
              </View>
            </ScrollView>
          </React.Fragment>
        )}
      </GoogleAutoComplete>
    </View>
  );
};
