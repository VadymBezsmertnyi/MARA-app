import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ImageURISource,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { Trans } from "@lingui/macro";
import * as ImagePicker from "expo-image-picker";
import { GoogleLocationDetailResult } from "react-native-google-autocomplete/dist/services/Google.service";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootAllScreensParamList } from "../../../navigators/Navigators.types";

// providers
import { InputCityModal } from "../../../components/InputCityModal/InputCityModal";

// providers
import { userContext } from "../../../providers/UserProvider/UserProvider";
import { localesContext } from "../../../../localization/localization.provider";
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";
import { sharingContext } from "../../../providers/SharingProvider/SharingProvider";

// components
import { ImageCache } from "../../../components/ImageCache/ImageCache";
import { Input } from "../../../components/Input/Input";
import { InputButton } from "../../../components/InputButton/InputButton";
import { InputPhone } from "../../../components/InputPhone/InputPhone";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { ModalsSheet } from "../../../components/ModalsSheet/ModalsSheet";

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
import {
  IconMapGradient,
  IconPencilGradient,
  IconPlusGradient,
  IconProfileAvatar,
} from "../../../icons/components";

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
  const { i18n } = useContext(localesContext);
  const { heightStatusBar } = useContext(themeContext);
  const { dataDeepLink } = useContext(sharingContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(`+${DEFAULT_CODE_COUNTRY}`);
  const [selectCountryIso, setSelectCountryIso] = useState(DEFAULT_COUNTRY);
  const [isShowModal, setIsShowModal] = useState(false);
  const [city, setCity] = useState<GoogleLocationDetailResult | null>(null);
  const { warning, success } = showErrors;

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
    const resultSave = await editUser({
      ...(city && { cityUser: city }),
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
    }
  }, []);

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
            <View style={styles.containerImage}>
              {imageSource ? (
                <ImageCache
                  style={styles.containerImage}
                  imageSrc={imageSource}
                />
              ) : (
                <IconProfileAvatar />
              )}
              <TouchableOpacity
                style={styles.buttonPickImage}
                onPress={imageSource ? onChangePhoto : pickImage}
              >
                {imageSource ? (
                  <IconPencilGradient width={24} height={24} />
                ) : (
                  <IconPlusGradient width={24} height={24} />
                )}
              </TouchableOpacity>
            </View>
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
              value={
                city?.formatted_address ||
                userData?.cityUser?.formatted_address ||
                ""
              }
              InputIcon={<IconMapGradient width={42} height={32} />}
              containerStyle={styles.containerInput}
              labelStyle={styles.labelInput}
            />
            <InputPhone
              label={i18n._("Phone number:")}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              selectCountryIso={selectCountryIso}
              setSelectCountryIso={setSelectCountryIso}
              labelStyle={styles.labelInput}
            />
            <Text>{JSON.stringify(dataDeepLink)}</Text>
          </View>
          <ButtonCustom title={i18n._("Save")} onSubmit={onSave} />
        </ScrollView>
      </View>
      <Modal visible={isShowModal} transparent>
        <ModalsSheet
          onClose={() => {
            setIsShowModal(false);
          }}
        >
          <InputCityModal
            setCity={setCity}
            setModalType={() => {
              setIsShowModal(false);
            }}
          />
        </ModalsSheet>
      </Modal>
    </>
  );
};
