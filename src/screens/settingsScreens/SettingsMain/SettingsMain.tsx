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
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { MenuBurgerButton } from "../../../components/MenuBurgerButton/MenuBurgerButton";
import { ContainerUser } from "./components/ContainerUser/ContainerUser";

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

  const rolesData = useMemo(() => {
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
        name: "Organizator of events",
        icon: "event",
        count: userStats.userRoles.ownerEventIds.length,
      },
    ];
  }, [userStats]);

  const actionsData = useMemo(() => {
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

  const workshopsData = useMemo(() => {
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

  const eventsData = useMemo(() => {
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

  const renderSectionItem = (
    title: string,
    items: any[],
    onPress?: () => void,
    sectionLoading?: boolean
  ) => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {sectionLoading ? (
          <ActivityIndicator size="small" color="#007AFF" />
        ) : onPress ? (
          <TouchableOpacity onPress={onPress} style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See all</Text>
            <MaterialIcons name="arrow-forward-ios" size={12} color="#007AFF" />
          </TouchableOpacity>
        ) : null}
      </View>
      {sectionLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#666" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <View style={styles.sectionItems}>
          {items.slice(0, 4).map((item) => (
            <View key={item.id} style={styles.sectionItem}>
              <View style={styles.itemLeft}>
                {item.icon && (
                  <MaterialIcons
                    name={item.icon}
                    size={20}
                    color={item.color || "#666"}
                    style={styles.itemIcon}
                  />
                )}
                <View style={styles.itemContent}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  {item.subItems && (
                    <View style={styles.subItemsContainer}>
                      {item.subItems.map((subItem: any, index: number) => (
                        <View key={index} style={styles.subItem}>
                          <MaterialIcons
                            name={subItem.icon}
                            size={16}
                            color={subItem.color}
                            style={styles.subItemIcon}
                          />
                          <Text style={styles.subItemText}>
                            {subItem.label}: {subItem.value}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.itemRight}>
                {item.isRating ? (
                  <View style={styles.ratingContainer}>
                    <Text style={styles.itemCount}>{item.count}</Text>
                    <MaterialIcons name="star" size={16} color="#FFD700" />
                  </View>
                ) : item.count !== undefined ? (
                  <Text style={styles.itemCount}>{item.count}</Text>
                ) : null}
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={12}
                  color="#666"
                />
              </View>
            </View>
          ))}
        </View>
      )}
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
            {renderSectionItem(
              i18n._("My roles"),
              rolesData,
              undefined,
              isLoading
            )}
            {renderSectionItem(
              i18n._("My actions"),
              actionsData,
              undefined,
              isLoading
            )}
            {renderSectionItem(
              i18n._("Your workshops"),
              workshopsData,
              () => {
                navigation.navigate(PATHS_SETTINGS_SCREENS.settingsWorkshops);
              },
              isLoading
            )}
            {renderSectionItem(
              i18n._("Your events"),
              eventsData,
              () => {
                navigation.navigate(PATHS_SETTINGS_SCREENS.settingsEvents);
              },
              isLoading
            )}
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
    </>
  );
};
