import React, { FunctionComponent, useContext } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { GoogleAutoComplete } from "react-native-google-autocomplete";

// providers
import { localesContext } from "../../../../../localization/localization.provider";

// components
import { Input } from "../../../../components/Input/Input";
import { ButtonCustom } from "../../../../components/ButtonCustom/ButtonCustom";

// styles
import { styles } from "./InputLocationModal.styles";

const EXPO_PUBLIC_API_KEY_GOOGLE_WEB = process.env
  .EXPO_PUBLIC_API_KEY_GOOGLE_WEB as string;

export const InputLocationModal: FunctionComponent = () => {
  const { i18n, language } = useContext(localesContext);

  return (
    <View style={styles.container}>
      <GoogleAutoComplete
        apiKey={EXPO_PUBLIC_API_KEY_GOOGLE_WEB}
        debounce={300}
        language={language}
      >
        {({ inputValue, handleTextChange, locationResults, fetchDetails }) => {
          console.log("locationResults", locationResults);

          return (
            <React.Fragment>
              <View style={styles.containerInput}>
                <Input
                  placeholder={i18n._("Enter the address")}
                  label={i18n._("Enter the address")}
                  defaultValue={inputValue}
                  onChange={handleTextChange}
                />
              </View>

              <ScrollView>
                {inputValue.length >= 2
                  ? locationResults.map((address) => (
                      <TouchableOpacity
                        key={`address-google=${address.place_id}`}
                        onPress={async () => {
                          console.log(await fetchDetails(address.place_id));
                        }}
                      >
                        <Text>{address.description}</Text>
                      </TouchableOpacity>
                    ))
                  : null}
                <ButtonCustom
                  title={i18n._("Select on the map")}
                  onSubmit={() => {}}
                />
              </ScrollView>
            </React.Fragment>
          );
        }}
      </GoogleAutoComplete>
    </View>
  );
};
