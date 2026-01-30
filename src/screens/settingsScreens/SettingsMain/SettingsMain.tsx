import React, { FunctionComponent, useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { CommonActions } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";

// types
import { RootAllScreensParamList } from "../../../navigators/Navigators.types";

// redux
import { cleanUserData } from "../../../storeRedux/apis/user/slice";
import { useRootDispatch } from "../../../storeRedux/store";
import { deleteTokens } from "../../../storeRedux/apis/user/user.helpers";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";
import { useSubscriptionProvider } from "../../../providers/SubscriptionProvider/SubscriptionProvider";

// components
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { MenuBurgerButton } from "../../../components/MenuBurgerButton/MenuBurgerButton";
import { ContainerUser } from "./components/ContainerUser/ContainerUser";
import ModalWindowBuy from "../../../components/ModalWindowBuy/ModalWindowBuy";

// constants
import {
  PATHS_MAIN_SCREENS,
  PATHS_SETTINGS_SCREENS,
} from "../../../navigators/useNavigator.constants";

// styles
import { styles } from "./SettingsMain.styles";

type SettingsMainProps = {
  navigation: NativeStackNavigationProp<RootAllScreensParamList> &
    DrawerNavigationProp<RootAllScreensParamList>;
};

// Mock data for profile sections
const mockRoles = [
  { id: "1", name: "Event Organizer", icon: "event" },
  { id: "2", name: "Workshop Instructor", icon: "school" },
  { id: "3", name: "Community Leader", icon: "people" },
];

const mockActions = [
  { id: "1", name: "Create Event", count: 12 },
  { id: "2", name: "Join Workshop", count: 8 },
  { id: "3", name: "Share Content", count: 24 },
];

const mockInteractions = [
  { id: "1", name: "Comments", count: 45 },
  { id: "2", name: "Likes", count: 128 },
  { id: "3", name: "Shares", count: 67 },
];

const mockWorkshops = [
  { id: "1", name: "Photography Basics", participants: 15 },
  { id: "2", name: "Digital Marketing", participants: 23 },
];

const mockEvents = [
  { id: "1", name: "Community Meetup", attendees: 45 },
  { id: "2", name: "Tech Conference", attendees: 120 },
];

export const SettingsMain: FunctionComponent<SettingsMainProps> = ({
  navigation,
}) => {
  const dispatch = useRootDispatch();
  const { i18n } = useLocalesProvider();
  const { heightStatusBar } = useThemeProvider();
  const [isShowPayment, setIsShowPayment] = useState(false);

  const containerStyles = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }],
    [heightStatusBar]
  );

  const onShowMenu = () => {
    navigation.openDrawer();
  };

  const onLogoutProfile = async () => {
    const isSignedInGoogle = GoogleSignin.hasPreviousSignIn();
    const isSignedInFacebook = await AccessToken.getCurrentAccessToken();
    if (isSignedInGoogle) await GoogleSignin.signOut();
    if (isSignedInFacebook) LoginManager.logOut();
    dispatch(cleanUserData());
    await deleteTokens();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: PATHS_MAIN_SCREENS.welcome }],
      })
    );
  };

  const onPressBuy = () => {
    setIsShowPayment(true);
  };

  const renderSectionItem = (
    title: string,
    items: any[],
    onPress?: () => void
  ) => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {onPress && (
          <TouchableOpacity onPress={onPress} style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See all</Text>
            <MaterialIcons name="arrow-forward-ios" size={12} color="#007AFF" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.sectionItems}>
        {items.slice(0, 3).map((item) => (
          <View key={item.id} style={styles.sectionItem}>
            <View style={styles.itemLeft}>
              {item.icon && (
                <MaterialIcons
                  name={item.icon}
                  size={20}
                  color="#666"
                  style={styles.itemIcon}
                />
              )}
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
            <Text style={styles.itemCount}>
              {item.participants || item.attendees || item.count || ""}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <>
      <View style={containerStyles}>
        <View style={styles.containerHeader}>
          <View style={styles.buttonsHeaderLeft}>
            <MenuBurgerButton onPress={onShowMenu} />
          </View>
          <Text style={styles.titleHeader}>{i18n._("Your profile")}</Text>
          <TouchableOpacity
            onPress={onLogoutProfile}
            style={styles.buttonsHeaderRight}
          >
            <Text style={styles.titleLogout}>{i18n._("Logout")}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <ContainerUser />

          <View style={styles.profileSections}>
            {renderSectionItem("My roles", mockRoles)}
            {renderSectionItem("My actions", mockActions)}
            {renderSectionItem("My interactions", mockInteractions)}
            {renderSectionItem("Your workshops", mockWorkshops, () => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsWorkshops);
            })}
            {renderSectionItem("Your events", mockEvents, () => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsEvents);
            })}
          </View>

          <View style={styles.containerFooter}>
            <ButtonCustom
              type="transparent"
              title={i18n._("Setting profile")}
              onSubmit={() => {
                navigation.navigate(PATHS_SETTINGS_SCREENS.settingsProfile);
              }}
            />
          </View>
          <View style={styles.containerEmpty} />
        </ScrollView>
      </View>
      {isShowPayment && (
        <ModalWindowBuy onClose={() => setIsShowPayment(false)} />
      )}
    </>
  );
};
