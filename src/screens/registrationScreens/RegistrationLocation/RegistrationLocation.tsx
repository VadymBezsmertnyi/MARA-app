import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import { ScrollView, Text, View, ViewStyle } from "react-native";
import { Link } from "@react-navigation/native";
import { Trans } from "@lingui/macro";

// types
import { ItemSearchPlaceType } from "../../../components/ModalSheetSearchPlace/ModalSheetSearchPlace.types";

// providers
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";
import { userContext } from "../../../providers/UserProvider/UserProvider";
import { localesContext } from "../../../../localization/localization.provider";

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
  const { i18n } = useContext(localesContext);
  const { heightStatusBar } = useContext(themeContext);
  const { editUser } = useContext(userContext);
  const [isShowModal, setIsShowModal] = useState(false);
  const [city, setCity] = useState<ItemSearchPlaceType | null>(null);
  const [isGeoLocation, setIsGeolocation] = useState(false);
  const [isGeoLocationBackground, setIsGeolocationBackground] = useState(false);
  const nameApp = "M.A.R.A.";

  const containerStyles: ViewStyle = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }] as ViewStyle,
    [heightStatusBar]
  );

  const buttonTermsService = useMemo(
    () => (
      <Link to={`/${PATHS_REGISTRATION_SCREENS.registrationTermsOfUse}`}>
        <Text style={styles.linkTermsPolicy}>
          <Trans>Terms of Service</Trans>
        </Text>
      </Link>
    ),
    []
  );
  const buttonPrivacyPolicy = useMemo(
    () => (
      <Link to={`/${PATHS_REGISTRATION_SCREENS.registrationPrivacyPolicy}`}>
        <Text style={styles.linkTermsPolicy}>
          <Trans>Privacy Policy</Trans>
        </Text>
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
              <Trans>
                To fully utilize all the features of the service, you need to
                grant the application permission to determine your location:
              </Trans>
            </Text>
          </View>
          <View style={styles.containerLocation}>
            <Text style={styles.titleLocation}>
              <Trans>
                Allow the {nameApp} application to determine my location
              </Trans>
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
            ]}
          >
            <Text style={styles.titleLocation}>
              <Trans>
                Allow the {nameApp} app to determine my location in the
                background
              </Trans>
            </Text>
            <Checkbox
              accessibilityLabel={i18n._(
                "Toggle on your location in the background"
              )}
              check={isGeoLocationBackground}
              setCheck={setIsGeolocationBackground}
            />
          </View>
          <View style={styles.containerCity}>
            <Text style={styles.titleCity}>
              <Trans>and choose the city of residence:</Trans>
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
            <Trans>
              By clicking the "Continue" button, you agree to the{" "}
              {buttonTermsService} and {buttonPrivacyPolicy}
            </Trans>
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
