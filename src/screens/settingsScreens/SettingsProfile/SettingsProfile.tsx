import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import {
  ImageURISource,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// types
import { RootAllScreensParamList } from "../../../navigators/Navigators.types";

// providers
import { useUserProvider } from "../../../providers/UserProvider/UserProvider";
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";
import { usePlacesProvider } from "../../../providers/PlacesProvider/PlacesProvider";
import {
  DropdownAlertType,
  useDropDownAlertProvider,
} from "../../../providers/DropDownAlertProvider/DropDownAlertProvider";

// components
import { Input } from "../../../components/Input/Input";
import { InputButton } from "../../../components/InputButton/InputButton";
import { InputPhone } from "../../../components/InputPhone/InputPhone";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { ItemSearchPlaceType } from "../../../components/ModalSheetSearchPlace/ModalSheetSearchPlace.types";
import { ModalSheetSearchPlace } from "../../../components/ModalSheetSearchPlace/ModalSheetSearchPlace";
import { ImageProfile } from "../../../components/ImageProfile/ImageProfile";

// helps
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
import { ModalShowErrors } from "../../../components/ModalShowErrors/ModalShowErrors";

type SettingsProfileProps = {
  navigation: NativeStackNavigationProp<RootAllScreensParamList> &
    DrawerNavigationProp<RootAllScreensParamList>;
};

type NamesErrorsType = "phoneNumber" | "firstName" | "place";

export const SettingsProfile: FunctionComponent<SettingsProfileProps> = ({
  navigation,
}) => {
  const { bottom } = useSafeAreaInsets();
  const { messageFromServer } = useDropDownAlertProvider();
  const { verifyPhone } = useAuthorizationRegistration();
  const { userData, editUser, exitUser, setIsChangeAvatar } = useUserProvider();
  const { i18n, language } = useLocalesProvider();
  const { heightTabBar, heightStatusBar } = useThemeProvider();
  const { placesDB } = usePlacesProvider();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(`+${DEFAULT_CODE_COUNTRY}`);
  const [selectCountryIso, setSelectCountryIso] = useState(DEFAULT_COUNTRY);
  const [isShowModal, setIsShowModal] = useState(false);
  const [city, setCity] = useState<ItemSearchPlaceType | null>(null);
  const showTitlePlace = useMemo(() => {
    if (!userData?.place_id) return "";
    return userData.place_id[language].formatted_address;
  }, [placesDB, userData?.place_id]);
  const [errorMessage, setErrorMessage] = useState<Record<
    string,
    { name: string; title: string }
  > | null>(null);
  const [isShowErrors, setIsShowErrors] = useState(false);
  const [needCheck, setNeedCheck] = useState<NamesErrorsType | null>(null);

  const containerStyles = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }],
    [heightStatusBar]
  );

  const imageSource = useMemo(
    () =>
      userData?.avatarFile
        ? ({
            uri: userData.avatarFile.url,
            cache: "force-cache",
          } as ImageURISource)
        : null,
    [userData?.avatarFile]
  );

  const errorsObject = useMemo(() => {
    const isPhone = verifyPhone(phoneNumber, selectCountryIso).length === 0;
    return {
      ...(!isPhone && {
        phoneNumber: {
          name: "phoneNumber",
          title: i18n._("Error: incorrect phone number"),
        },
      }),
      ...((firstName.length < 3 || firstName.length > 15) && {
        firstName: {
          name: "firstName",
          title: i18n._(
            "Error: First name must be between 3 and 15 characters"
          ),
        },
      }),
      ...(city === null && {
        place: {
          name: "place",
          title: i18n._("Error: select the city"),
        },
      }),
    };
  }, [firstName, phoneNumber, selectCountryIso]);

  const checkValueOnBlur = (key: NamesErrorsType) => {
    const error = errorsObject[key] || null;
    if (error) setErrorMessage({ [key]: error });
  };

  const checkEnterData = () => {
    const isError = Object.keys(errorsObject).length > 0;
    if (isError) {
      setIsShowErrors(true);
      setErrorMessage(errorsObject);
    } else setErrorMessage(null);
    return isError;
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const compressImages = await compressAndProcessImages(result);
      const resultUpdate = await editUser({
        avatarFile: compressImages[0],
      });

      if (!resultUpdate)
        messageFromServer(
          i18n._("The photo has been changed"),
          i18n._("Success"),
          DropdownAlertType.Success
        );
      else
        messageFromServer(
          i18n._("The photo added"),
          i18n._("Success"),
          DropdownAlertType.Success
        );
    } else
      messageFromServer(
        i18n._("Sorry, an error occurred"),
        i18n._("Error"),
        DropdownAlertType.Warn
      );
  };

  const onChangePhoto = () => {
    setIsChangeAvatar(true);
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
    const isError = checkEnterData();
    if (isError) return;
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
      ...(isPhone && { phoneNumber: clearPhoneNumber }),
    });
    if (resultSave) {
      messageFromServer(
        i18n._("Profile saved"),
        i18n._("Success"),
        DropdownAlertType.Success
      );
      navigation.navigate(PATHS_SETTINGS_SCREENS.settingsMain);
      setCity(null);
    } else
      messageFromServer(
        i18n._("Error: save profile"),
        i18n._("Error"),
        DropdownAlertType.Warn
      );
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

  useEffect(() => {
    if (needCheck) {
      checkValueOnBlur(needCheck);
      setNeedCheck(null);
    }
  }, [needCheck]);

  return (
    <KeyboardAvoidingView
      contentContainerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
      behavior="padding"
    >
      <View style={containerStyles}>
        <View style={styles.containerHeader}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsMain);
            }}
            style={styles.buttonsHeaderLeft}
          >
            <Text style={styles.titleDelete}>{i18n._("Back")}</Text>
          </TouchableOpacity>
          <Text style={styles.titleHeader}>{i18n._("Profile")}</Text>
          <TouchableOpacity
            onPress={onLogoutProfile}
            style={styles.buttonsHeaderRight}
          >
            <Text style={styles.titleLogout}>{i18n._("Logout")}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: bottom + (heightTabBar || 0),
          }}
        >
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
              onBlurProp={() => setNeedCheck("firstName")}
              value={firstName}
              onChange={setFirstName}
              containerStyle={styles.containerInput}
              labelStyle={styles.labelInput}
              errorMessage={
                errorMessage?.firstName ? errorMessage?.firstName.title : ""
              }
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
              errorMessage={
                errorMessage?.place ? errorMessage?.place.title : ""
              }
            />
            <InputPhone
              isRegular
              label={i18n._("Phone number")}
              onBlurProp={() => setNeedCheck("phoneNumber")}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              selectCountryIso={selectCountryIso}
              setSelectCountryIso={setSelectCountryIso}
              labelStyle={styles.labelInput}
              errorMessage={
                errorMessage?.phoneNumber ? errorMessage?.phoneNumber.title : ""
              }
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
          setNeedCheck("place");
        }}
        statePlace={city || undefined}
      />
      <ModalShowErrors
        isOpen={isShowErrors}
        onClose={() => {
          setIsShowErrors(false);
        }}
        errors={errorMessage}
      />
    </KeyboardAvoidingView>
  );
};
