import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ImageURISource,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { Trans } from "@lingui/macro";
import * as ImagePicker from "expo-image-picker";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootAllScreensParamList } from "../../../navigators/Navigators.types";

// providers
import { userContext } from "../../../providers/UserProvider/UserProvider";
import { localesContext } from "../../../../localization/localization.provider";
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";
import { placesContext } from "../../../providers/PlacesProvider/PlacesProvider";

// components
import { Input } from "../../../components/Input/Input";
import { InputButton } from "../../../components/InputButton/InputButton";
import { InputPhone } from "../../../components/InputPhone/InputPhone";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { ItemSearchPlaceType } from "../../../components/ModalSheetSearchPlace/ModalSheetSearchPlace.types";
import { ModalSheetSearchPlace } from "../../../components/ModalSheetSearchPlace/ModalSheetSearchPlace";
import { ImageProfile } from "../../../components/ImageProfile/ImageProfile";

// helps
import showErrors from "../../../helps/errors/showError";
import { compressAndProcessImages } from "../../../helps/helps";
import { getNamesUser } from "../../../providers/UserProvider/UserProvider.helps";
import { useAuthorizationRegistration } from "../../../helps/useAuthorizationRegistration";
import { getClearValue } from "../../../helps/regexp";

// constants
import {
  PATHS_MAIN_SCREENS,
  PATHS_SETTINGS_SCREENS,
} from "../../../navigators/useNavigator.constants";
import {
  DEFAULT_CODE_COUNTRY,
  DEFAULT_COUNTRY,
} from "../../../constants/inputs.const";

// icons
import { IconMapGradient } from "../../../icons/components";

// styles
import { styles } from "./SettingsProfile.styles";

type SettingsProfileProps = {
  navigation: NativeStackNavigationProp<RootAllScreensParamList> &
    DrawerNavigationHelpers;
};

export const SettingsProfile: FunctionComponent<SettingsProfileProps> = ({
  navigation,
}) => {
  const { verifyPhone } = useAuthorizationRegistration();
  const { userData, editUser, exitUser, deleteUser, setIsChangeAvatar } =
    useContext(userContext);
  const { i18n, language } = useContext(localesContext);
  const { heightStatusBar } = useContext(themeContext);
  const { placesDB } = useContext(placesContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(`+${DEFAULT_CODE_COUNTRY}`);
  const [selectCountryIso, setSelectCountryIso] = useState(DEFAULT_COUNTRY);
  const [isShowModal, setIsShowModal] = useState(false);
  const [city, setCity] = useState<ItemSearchPlaceType | null>(null);
  const { warning, success } = showErrors;
  const showTitlePlace = useMemo(() => {
    if (!userData?.place_id) return "";
    return userData.place_id[language].formatted_address;
  }, [placesDB, userData?.place_id]);

  const containerStyles = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }],
    [heightStatusBar]
  );

  const imageSource = useMemo(
    () =>
      userData?.avatar
        ? ({
            uri: userData.avatar.url,
            cache: "force-cache",
          } as ImageURISource)
        : null,
    [userData?.avatar]
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const compressImages = await compressAndProcessImages(result);
      const resultUpdate = await editUser({
        avatar: {
          ...userData?.avatar,
          image: compressImages[0],
        },
      });

      if (!resultUpdate) warning(i18n._("Sorry, an error occurred"));
      else success(i18n._("The photo added"));
    } else warning(i18n._("Sorry, an error occurred"));
  };

  const onChangePhoto = () => {
    setIsChangeAvatar(true);
  };

  const onDeleteProfile = async () => {
    const result = await deleteUser();
    if (result)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: PATHS_MAIN_SCREENS.welcome }],
        })
      );
  };

  const onLogoutProfile = async () => {
    const result = await exitUser();
    if (result)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: PATHS_MAIN_SCREENS.welcome }],
        })
      );
  };

  const onSave = async () => {
    const isPhone = verifyPhone(phoneNumber, selectCountryIso).length === 0;
    const clearPhoneNumber = getClearValue(phoneNumber);
    const currentCityUser =
      userData && city?.placeId === userData?.place_id?._id
        ? {
            place_id: userData.place_id,
            region_place_id: userData.region_place_id,
            country_place_id: userData.country_place_id,
          }
        : { cityUser: city };
    const resultSave = await editUser({
      ...userData,
      ...currentCityUser,
      firstName,
      lastName,
      phoneNumber,
      ...(isPhone && { phoneNumber: clearPhoneNumber }),
    });
    if (resultSave) {
      success(i18n._("Save profile"));
      navigation.navigate(PATHS_SETTINGS_SCREENS.settingsMain);
      setCity(null);
    } else warning(i18n._("Error: save profile"));
  };

  useEffect(() => {
    if (userData) {
      const currentNamesUser = getNamesUser(userData);
      setFirstName(currentNamesUser.firstName);
      setLastName(currentNamesUser.lastName);
      setPhoneNumber(userData.phoneNumber || `+${DEFAULT_CODE_COUNTRY}`);
      if (userData.place_id)
        setCity({
          placeId: userData.place_id._id,
          title: userData.place_id
            ? userData.place_id[language].formatted_address
            : "",
        });
    }
  }, [placesDB]);

  return (
    <>
      <View style={containerStyles}>
        <View style={styles.containerHeader}>
          <TouchableOpacity
            onPress={onDeleteProfile}
            style={styles.buttonsHeaderLeft}
          >
            <Text style={styles.titleDelete}>
              <Trans>Delete</Trans>
            </Text>
          </TouchableOpacity>
          <Text style={styles.titleHeader}>
            <Trans>Profile</Trans>
          </Text>
          <TouchableOpacity
            onPress={onLogoutProfile}
            style={styles.buttonsHeaderRight}
          >
            <Text style={styles.titleLogout}>
              <Trans>Logout</Trans>
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.containerAvatar}>
            <ImageProfile
              imageSource={imageSource}
              onChangePhoto={onChangePhoto}
              pickImage={pickImage}
            />
            <Text style={styles.email}>{userData?.email}</Text>
          </View>
          <View style={styles.containerInputs}>
            <Input
              label={`${i18n._("First Name")}:`}
              placeholder={i18n._("First Name")}
              value={firstName}
              onChange={setFirstName}
              containerStyle={styles.containerInput}
              labelStyle={styles.labelInput}
            />
            <Input
              label={`${i18n._("Last Name")}:`}
              placeholder={i18n._("Last Name")}
              value={lastName}
              onChange={setLastName}
              containerStyle={styles.containerInput}
              labelStyle={styles.labelInput}
            />
            <InputButton
              label={`${i18n._("City")}:`}
              placeholder={i18n._("Select the city")}
              onPress={() => {
                setIsShowModal(true);
              }}
              value={showTitlePlace}
              InputIcon={<IconMapGradient width={42} height={32} />}
              containerStyle={styles.containerInput}
              labelStyle={styles.labelInput}
            />
            <InputPhone
              isRegular
              label={i18n._("Phone number")}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              selectCountryIso={selectCountryIso}
              setSelectCountryIso={setSelectCountryIso}
              labelStyle={styles.labelInput}
            />
          </View>
          <ButtonCustom title={i18n._("Save")} onSubmit={onSave} />
        </ScrollView>
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
