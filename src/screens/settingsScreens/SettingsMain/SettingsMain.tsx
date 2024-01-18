import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Alert,
  ImageURISource,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Trans } from "@lingui/macro";
import { z } from "zod";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";

// providers
import { userContext } from "../../../providers/user/user.provider";
import { localesContext } from "../../../../localization/localization.provider";
import { eventsContext } from "../../../providers/EventsProvider/EventsProvider";
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";
import { modalsSheetContext } from "../../../providers/ModalsSheetProvider/ModalsSheetProvider";

// components
import { SelectPicker } from "../../../components/SelectPicker/SelectPicker";
import { ImageCache } from "../../../components/ImageCache/ImageCache";
import { Input } from "../../../components/Input/Input";
import { InputButton } from "../../../components/InputButton/InputButton";
import { InputPhone } from "../../../components/InputPhone/InputPhone";

// helps
import showErrors from "../../../helps/errors/showError";
import { compressAndProcessImages } from "../../../helps/helps";
import {
  useAllNavigation,
  useMainTabsNavigation,
} from "../../../navigators/Navigators.helps";

// constants
import {
  languages,
  languagesKeys,
} from "../../../../localization/localization.const";
import {
  PATHS_MAIN_SCREENS,
  PATHS_MAIN_TABS,
  PATHS_NEWS_SCREENS,
  PATHS_SETTINGS_SCREENS,
} from "../../../navigators/useNavigator.constants";
import { DEFAULT_COUNTRY } from "../../../constants/inputs.const";

// icons
import {
  IconCloseGradient,
  IconMapGradient,
  IconPencilGradient,
  IconPlus,
  IconPlusGradient,
  IconProfileAvatar,
} from "../../../icons/components";

// styles
import { styles } from "./SettingsMain.styles";
import { getNamesUser } from "../../../providers/user/user.helps";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { MenuBurgerButton } from "../../../components/MenuBurgerButton/MenuBurgerButton";
import { ItemMyList } from "./componetns/ItemMyList/ItemMyList";

export const SettingsMain: FunctionComponent = () => {
  const navigation = useMainTabsNavigation();
  const { userData, editUser, exitUser } = useContext(userContext);
  const { i18n, language, setLanguage } = useContext(localesContext);
  const { eventsList, deleteEvent } = useContext(eventsContext);
  const { heightStatusBar } = useContext(themeContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { city, setModalType } = useContext(modalsSheetContext);
  const [phoneNumber, setPhoneNumber] = useState("+380");
  const [selectCountryIso, setSelectCountryIso] = useState(DEFAULT_COUNTRY);
  const { warning } = showErrors;
  const eventsListUser = useMemo(
    () => eventsList.filter((event) => event.userId === userData?.id),
    [eventsList, userData?.id]
  );

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

  const changeLanguage = async (item: { title: string; key: string }) => {
    const isLanguage = z.enum(languagesKeys).safeParse(item.key);
    if (isLanguage.success) await setLanguage(isLanguage.data);
  };

  const toggleIsLocation = (isGeoLocation: boolean) => {
    if (userData) editUser({ isGeoLocation });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const titleSuccess = userData?.avatar?.id
        ? i18n._("The photo has been changed")
        : i18n._("The photo added");
      const compressImages = await compressAndProcessImages(result);
      const resultUpdate = await editUser({
        avatar: {
          ...userData?.avatar,
          image: compressImages[0],
        },
      });

      if (!resultUpdate) warning(i18n._("Sorry, an error occurred"));
      else warning(titleSuccess);
    } else warning(i18n._("Sorry, an error occurred"));
  };

  const deleteImage = async () => {
    await editUser({ avatar: null });
  };

  const onDeleteProfile = () => {
    Alert.alert(`Delete profile ${userData?.id}`);
  };

  const onShowMenu = () => {
    navigation.openDrawer();
  };

  const onLogoutProfile = async () => {
    await exitUser();
    navigation.navigate(PATHS_MAIN_SCREENS.welcome);
  };

  return (
    <View style={containerStyles}>
      <View style={styles.containerHeader}>
        <View style={styles.buttonsHeaderLeft}>
          <MenuBurgerButton onPress={onShowMenu} />
        </View>
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
      <View style={styles.containerAvatar}>
        <View style={styles.containerImage}>
          {imageSource ? (
            <ImageCache style={styles.containerImage} imageSrc={imageSource} />
          ) : (
            <IconProfileAvatar />
          )}
        </View>
        <View style={styles.containerInfo}>
          <Text style={styles.infoUser}>{userData?.firstName}</Text>
          <Text style={styles.infoUser}>{userData?.email}</Text>
          <Text style={styles.infoUser}>
            {userData?.cityUser?.formatted_address}
          </Text>
          <Text style={styles.infoUser}>{userData?.phoneNumber}</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.containerList}>
          <View style={styles.lineEmpty} />
          <ItemMyList
            title={i18n._("My ads")}
            titleButton={i18n._("Add ad")}
            onLinkTo={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsAds);
            }}
            onAdd={() => {}}
          />
          <View style={styles.lineEmpty} />
          <ItemMyList
            title={i18n._("My workshops")}
            titleButton={i18n._("Add workshop")}
            onLinkTo={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsWorkshops);
            }}
            onAdd={() => {}}
          />
          <View style={styles.lineEmpty} />
          <ItemMyList
            title={i18n._("My events")}
            titleButton={i18n._("Add event")}
            onLinkTo={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsEvents);
            }}
            onAdd={() => {
              navigation.navigate(PATHS_MAIN_TABS.news, {
                screen: PATHS_NEWS_SCREENS.addEvent,
              });
            }}
          />
        </View>
        <View style={styles.lineEmpty} />
        <View style={styles.containerFooter}>
          <ButtonCustom
            type="transparent"
            title={i18n._("Setting profile")}
            onSubmit={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsProfile);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
