import React, { FunctionComponent, useMemo, useState } from "react";
import { ScrollView, Text, View, ViewStyle } from "react-native";
import { Link } from "@react-navigation/native";

// types
import { ItemSearchPlaceType } from "../../../components/ModalSheetSearchPlace/ModalSheetSearchPlace.types";

// providers
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";
import { useUserProvider } from "../../../providers/UserProvider/UserProvider";
import { useLocalesProvider } from "../../../../localization/localization.provider";

// components
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { InputButton } from "../../../components/InputButton/InputButton";
import { ModalSheetSearchPlace } from "../../../components/ModalSheetSearchPlace/ModalSheetSearchPlace";

// constants
import { PATHS_REGISTRATION_SCREENS } from "../../../navigators/useNavigator.constants";

// helps
import { useAllNavigation } from "../../../navigators/Navigators.helps";

// icons
import { IconMapGradient } from "../../../icons/components";

// styles
import { styles } from "./RegistrationLocation.styles";

export const RegistrationLocation: FunctionComponent = () => {
  const navigation = useAllNavigation();
  const { i18n } = useLocalesProvider();
  const { heightStatusBar } = useThemeProvider();
  const { editUser } = useUserProvider();
  const [isShowModal, setIsShowModal] = useState(false);
  const [city, setCity] = useState<ItemSearchPlaceType | null>(null);
  const [isGeoLocation, setIsGeolocation] = useState(false);
  const [isGeoLocationBackground, setIsGeolocationBackground] = useState(false);
  const nameApp = "M.A.R.A.";

  const containerStyles: ViewStyle = useMemo(
    () =>
      [
        styles.container,
        { paddingTop: heightStatusBar },
      ] as unknown as ViewStyle,
    [heightStatusBar]
  );

  const buttonTermsService = useMemo(
    () => (
      <Link
        href={`/${PATHS_REGISTRATION_SCREENS.registrationTermsOfUse}`}
        action={{ type: "NAVIGATE" }}
      >
        <Text style={styles.linkTermsPolicy}>{i18n._("Terms of Service")}</Text>
      </Link>
    ),
    []
  );
  const buttonPrivacyPolicy = useMemo(
    () => (
      <Link
        href={`/${PATHS_REGISTRATION_SCREENS.registrationPrivacyPolicy}`}
        action={{ type: "NAVIGATE" }}
      >
        <Text style={styles.linkTermsPolicy}>{i18n._("Privacy Policy")}</Text>
      </Link>
    ),
    []
  );

  const saveLocationUser = async () => {
    if (city) {
      const resultSave = await editUser({
        isGeoLocation,
        isGeoLocationBackground,
        cityUser: city,
      });
      if (resultSave)
        navigation.navigate(PATHS_REGISTRATION_SCREENS.registrationInfo);
    }
    setCity(null);
  };

  return (
    <>
      <View style={containerStyles}>
        <ScrollView style={styles.containerBody}>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>
              {i18n._(
                "To fully utilize all the features of the service, you need to grant the application permission to determine your location:"
              )}
            </Text>
          </View>
          <View style={styles.containerLocation}>
            <Text style={styles.titleLocation}>
              {i18n._(
                "Allow the {nameApp} application to determine my location",
                { nameApp }
              )}
            </Text>
            <Checkbox
              accessibilityLabel={i18n._("Toggle on your location")}
              check={isGeoLocation}
              setCheck={setIsGeolocation}
            />
          </View>
          <View
            style={[
              styles.containerLocation,
              { opacity: isGeoLocation ? 1 : 0.5 },
              // TODO: will do later
              { opacity: 0 },
            ]}
          >
            <Text style={styles.titleLocation}>
              {i18n._(
                "Allow the {nameApp} app to determine my location in the background",
                { nameApp }
              )}
            </Text>
            <Checkbox
              // TODO: will do later
              disabled
              accessibilityLabel={i18n._(
                "Toggle on your location in the background"
              )}
              check={isGeoLocationBackground}
              setCheck={setIsGeolocationBackground}
            />
          </View>
          <View style={styles.containerCity}>
            <Text style={styles.titleCity}>
              {i18n._("and choose the city of residence:")}
            </Text>
            <InputButton
              placeholder={i18n._("Select the city")}
              onPress={() => {
                setIsShowModal(true);
              }}
              value={city?.title || ""}
              InputIcon={<IconMapGradient width={42} height={32} />}
              inputWrapperStyle={styles.inputCity}
            />
          </View>
        </ScrollView>

        <View style={styles.containerFooter}>
          <Text style={styles.titleTermsPolicy}>
            {i18n._(
              'By clicking the "Continue" button, you agree to the {buttonTermsService} and {buttonPrivacyPolicy}',
              {
                buttonTermsService,
                buttonPrivacyPolicy,
              }
            )}
          </Text>
          <ButtonCustom
            disabled={!city}
            title={i18n._(`Continue`)}
            onSubmit={saveLocationUser}
          />
        </View>
      </View>
      <ModalSheetSearchPlace
        isOpen={isShowModal}
        onClose={() => {
          setIsShowModal(false);
        }}
        onSubmit={(place) => {
          setCity(place);
          setIsShowModal(false);
        }}
        statePlace={city || undefined}
      />
    </>
  );
};
