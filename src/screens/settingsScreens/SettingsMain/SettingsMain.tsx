import React, { FunctionComponent, useMemo } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
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
import { useGetUserStatsQuery } from "../../../storeRedux/api";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";

// components
import { MenuBurgerButton } from "../../../components/MenuBurgerButton/MenuBurgerButton";
import { ContainerUser } from "./components/ContainerUser/ContainerUser";
import {
  SectionItemComponent,
  SectionItem,
} from "./components/SectionItem/SectionItem";

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

export const SettingsMain: FunctionComponent<SettingsMainProps> = ({
  navigation,
}) => {
  const dispatch = useRootDispatch();
  const { i18n } = useLocalesProvider();
  const { heightStatusBar } = useThemeProvider();
  const { data: userStats, isLoading, error } = useGetUserStatsQuery();

  const containerStyles = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }],
    [heightStatusBar]
  );

  const rolesData: SectionItem[] = useMemo(() => {
    if (!userStats) return [];
    return [
      {
        id: "1",
        name: "Owner of workshops",
        icon: "business",
        count: userStats.userRoles.ownerWorkshopIds.length,
      },
      {
        id: "2",
        name: "Adder of workshops",
        icon: "build",
        count: userStats.userRoles.addedWorkshopIds.length,
      },
      {
        id: "3",
        name: "Owner of events",
        icon: "event",
        count: userStats.userRoles.ownerEventIds.length,
      },
      {
        id: "4",
        name: "Adder of events",
        icon: "event-note",
        count: userStats.userRoles.addedEventIds.length,
      },
    ];
  }, [userStats]);

  const actionsData: SectionItem[] = useMemo(() => {
    if (!userStats) return [];
    return [
      {
        id: "1",
        name: "Workshops",
        icon: "school",
        subItems: [
          {
            label: "Active",
            value: userStats.userActions.workshops.active,
            icon: "check-circle",
            color: "#4CAF50",
          },
          {
            label: "On review",
            value: userStats.userActions.workshops.onReview,
            icon: "lock-clock",
            color: "#FF9800",
          },
          {
            label: "Rejected",
            value: userStats.userActions.workshops.rejected,
            icon: "cancel",
            color: "#F44336",
          },
        ],
      },
      {
        id: "2",
        name: "Events",
        icon: "event",
        subItems: [
          {
            label: "Active",
            value: userStats.userActions.events.active,
            icon: "check-circle",
            color: "#4CAF50",
          },
          {
            label: "On review",
            value: userStats.userActions.events.onReview,
            icon: "lock-clock",
            color: "#FF9800",
          },
        ],
      },
      {
        id: "3",
        name: "Comments",
        icon: "comment",
        count: userStats.userComments.totalComments,
      },
      {
        id: "4",
        name: "Rating",
        icon: "star",
        count: userStats.userComments.averageRating.toString(),
        isRating: true,
      },
    ];
  }, [userStats]);

  const workshopsData: SectionItem[] = useMemo(() => {
    if (!userStats) return [];
    return [
      {
        id: "1",
        name: "Active",
        icon: "check-circle",
        color: "#4CAF50",
        count: userStats.userActions.workshops.active,
      },
    ];
  }, [userStats]);

  const eventsData: SectionItem[] = useMemo(() => {
    if (!userStats) return [];
    return [
      {
        id: "1",
        name: "Active",
        icon: "check-circle",
        color: "#4CAF50",
        count: userStats.userActions.events.active,
      },
    ];
  }, [userStats]);

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
          <ContainerUser
            onPressEditProfile={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsProfile);
            }}
          />

          <View style={styles.profileSections}>
            <SectionItemComponent
              title={i18n._("My roles")}
              items={rolesData}
              sectionLoading={isLoading}
            />
            <SectionItemComponent
              title={i18n._("My actions")}
              items={actionsData}
              sectionLoading={isLoading}
            />
            <SectionItemComponent
              title={i18n._("Your workshops")}
              items={workshopsData}
              onPress={() => {
                navigation.navigate(PATHS_SETTINGS_SCREENS.settingsWorkshops);
              }}
              sectionLoading={isLoading}
            />
            <SectionItemComponent
              title={i18n._("Your events")}
              items={eventsData}
              onPress={() => {
                navigation.navigate(PATHS_SETTINGS_SCREENS.settingsEvents);
              }}
              sectionLoading={isLoading}
            />
          </View>
          <View style={styles.containerEmpty} />
        </ScrollView>
      </View>
    </>
  );
};
