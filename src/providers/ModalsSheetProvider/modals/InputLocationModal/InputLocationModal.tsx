import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
/* import {
  GooglePlacesAutocomplete,
  PlaceDetails,
  PlacesError,
} from "expo-google-places-autocomplete"; */
/* import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"; */

// providers
import { localesContext } from "../../../../../localization/localization.provider";

// components
import { Input } from "../../../../components/Input/Input";
import { IconTabMap } from "../../../../icons/components";

// styles
import { styles } from "./InputLocationModal.styles";

const EXPO_PUBLIC_API_KEY_GOOGLE_IOS = process.env
  .EXPO_PUBLIC_API_KEY_GOOGLE_IOS as string;
const EXPO_PUBLIC_API_KEY_GOOGLE_ANDROID = process.env
  .EXPO_PUBLIC_API_KEY_GOOGLE_ANDROID as string;

export const InputLocationModal: FunctionComponent = () => {
  const [value, setValue] = useState("");
  const { i18n } = useContext(localesContext);
  /* const apiKeyGoogle = useMemo(
    () =>
      Platform.OS === "ios"
        ? EXPO_PUBLIC_API_KEY_GOOGLE_IOS
        : EXPO_PUBLIC_API_KEY_GOOGLE_ANDROID,
    []
  ); */

  /*   const onSearchError = React.useCallback((error: PlacesError) => {
    console.log(error);
  }, []);

  const onPlaceSelected = React.useCallback((place: PlaceDetails) => {
    console.log(place);
  }, []); */

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <Input
          placeholder={i18n._("Enter the address")}
          label={i18n._("Enter the address")}
          defaultValue={value}
          onChange={setValue}
        />
      </View>
      <SafeAreaView style={styles.containerList}>
        {/* <GooglePlacesAutocomplete
          apiKey={apiKeyGoogle}
          requestConfig={{ countries: ["US"] }}
          onPlaceSelected={onPlaceSelected}
          onSearchError={onSearchError}
        /> */}
        {/* <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          fetchDetails
          onTimeout={() => {
            console.log("error:");
          }}
          onFail={(e) => {
            console.log("error:", e);
          }}
          query={{
            key: "AIzaSyD7JKDGjjhLpdwTA6T5AQC6svsNsLZuNkw",
            //key: apiKeyGoogle,
            language: "en",
            components: "country:us",
          }}
        /> */}
      </SafeAreaView>
    </View>
  );
};
