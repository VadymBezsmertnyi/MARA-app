import React, {
  FunctionComponent,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";

// types
import { RootAllScreensParamList } from "../../../navigators/Navigators.types";

// redux
import { useUserSelector } from "../../../storeRedux/apis/user/slice";
import { useEventsSelector } from "../../../storeRedux/apis/events/slice";
import { useGetEventsUserQuery } from "../../../storeRedux/api";

// providers
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useSubscriptionProvider } from "../../../providers/SubscriptionProvider/SubscriptionProvider";
import {
  useDropDownAlertProvider,
  DropdownAlertType,
} from "../../../providers/DropDownAlertProvider/DropDownAlertProvider";

// components
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { ImageCache } from "../../../components/ImageCache/ImageCache";
import { ItemSettingEvents } from "./components/ItemSettingEvents/ItemSettingEvents";
import ModalWindowBuy from "../../../components/ModalWindowBuy/ModalWindowBuy";

// icons
import { IconClose, IconPlus } from "../../../icons/components";

// constants
import { PATHS_SETTINGS_SCREENS } from "../../../navigators/useNavigator.constants";

// images
import notItemsImage from "../../../../assets/settingsScreen/notSettings.jpg";

// styles
import { styles } from "./SettingsEvents.styles";
import colors from "../../../../styles/colors";

type SettingsEventsProps = {
  navigation: NativeStackNavigationProp<RootAllScreensParamList> &
    DrawerNavigationProp<RootAllScreensParamList>;
};

type TabType = "upcoming" | "past";
type MainTabType = "all" | "created" | "owned";

export const SettingsEvents: FunctionComponent<SettingsEventsProps> = ({
  navigation,
}) => {
  const { userData } = useUserSelector();
  const { infoSmallEvents } = useSubscriptionProvider();
  const { eventsUserList } = useEventsSelector();
  const { heightStatusBar } = useThemeProvider();
  const { i18n, language } = useLocalesProvider();
  const { showMessageServer } = useDropDownAlertProvider();
  const [isShowPayment, setIsShowPayment] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState<MainTabType>("all");
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");
  const [refreshing, setRefreshing] = useState(false);
  const lastRefreshTimeRef = useRef<number>(0);
  const hasInitialLoadRef = useRef<boolean>(false);

  const typeItem = useMemo(() => i18n._("events"), [i18n, language]);
  const containerStyles = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }],
    [heightStatusBar]
  );
  const { refetch } = useGetEventsUserQuery(
    { userId: userData?._id || "" },
    { skip: !userData?._id }
  );

  const hasCreatedByMe = useMemo(() => {
    if (!userData?._id) return false;
    return eventsUserList.some((event) => {
      if (!event.userId) return false;
      const eventUserId =
        typeof event.userId === "string" ? event.userId : event.userId?._id;
      return eventUserId === userData._id;
    });
  }, [eventsUserList, userData?._id]);
  const hasOwned = useMemo(() => {
    if (!userData?._id) return false;
    return eventsUserList.some((event) => {
      if (!event.ownerUserId) return false;
      const eventOwnerId =
        typeof event.ownerUserId === "string"
          ? event.ownerUserId
          : event.ownerUserId?._id;
      return eventOwnerId === userData._id;
    });
  }, [eventsUserList, userData?._id]);
  const showMainTabs = (hasCreatedByMe ? 1 : 0) + (hasOwned ? 1 : 0) > 1;

  const eventsByMainTab = useMemo(() => {
    if (!userData?._id) return [];
    if (activeMainTab === "all") return eventsUserList;
    if (activeMainTab === "created")
      return eventsUserList.filter((event) => {
        if (!event.userId) return false;
        const eventUserId =
          typeof event.userId === "string" ? event.userId : event.userId?._id;
        return eventUserId === userData._id;
      });
    if (activeMainTab === "owned")
      return eventsUserList.filter((event) => {
        if (!event.ownerUserId) return false;
        const eventOwnerId =
          typeof event.ownerUserId === "string"
            ? event.ownerUserId
            : event.ownerUserId?._id;
        return eventOwnerId === userData._id;
      });
    return [];
  }, [eventsUserList, activeMainTab, userData?._id]);

  const filteredEvents = useMemo(() => {
    const nowTime = Date.now();
    if (activeTab === "past")
      return eventsByMainTab.filter((event) => event.date.finish < nowTime);
    return eventsByMainTab.filter((event) => event.date.finish >= nowTime);
  }, [eventsByMainTab, activeTab]);

  const onClose = () => {
    navigation.goBack();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const currentTime = Date.now();
    const timeSinceLastRefresh = currentTime - lastRefreshTimeRef.current;
    const minRefreshInterval = 10000;
    if (timeSinceLastRefresh >= minRefreshInterval) {
      lastRefreshTimeRef.current = currentTime;
      await refetch();
    } else
      showMessageServer(
        i18n._("Wait please before the next update"),
        i18n._("Wait please before the next update"),
        DropdownAlertType.Info
      );
    setRefreshing(false);
  };

  useEffect(() => {
    if (!userData?._id || hasInitialLoadRef.current) return;
    if (eventsUserList.length === 0) {
      hasInitialLoadRef.current = true;
      refetch();
    }
  }, [userData?._id, eventsUserList.length, refetch]);

  return (
    <>
      <View style={containerStyles}>
        <View style={styles.containerHeader}>
          <View style={styles.boxHeaderEmpty} />
          <Text style={styles.titleHeader}>{i18n._("My events")}</Text>
          <TouchableOpacity
            accessibilityLabel={i18n._(
              "Button for closing the settings events screen"
            )}
            onPress={onClose}
          >
            <IconClose width={24} height={24} fill={colors.blackCoffee} />
          </TouchableOpacity>
        </View>
        {showMainTabs && (
          <View style={styles.containerTabs}>
            <TouchableOpacity
              style={[styles.tab, activeMainTab === "all" && styles.tabActive]}
              onPress={() => setActiveMainTab("all")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeMainTab === "all" && styles.tabTextActive,
                ]}
              >
                {i18n._("All")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeMainTab === "created" && styles.tabActive,
              ]}
              onPress={() => setActiveMainTab("created")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeMainTab === "created" && styles.tabTextActive,
                ]}
              >
                {i18n._("Created by me")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeMainTab === "owned" && styles.tabActive,
              ]}
              onPress={() => setActiveMainTab("owned")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeMainTab === "owned" && styles.tabTextActive,
                ]}
              >
                {i18n._("Mine")}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.containerTabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "upcoming" && styles.tabActive]}
            onPress={() => setActiveTab("upcoming")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "upcoming" && styles.tabTextActive,
              ]}
            >
              {i18n._("Upcoming events")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "past" && styles.tabActive]}
            onPress={() => setActiveTab("past")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "past" && styles.tabTextActive,
              ]}
            >
              {i18n._("Past events")}
            </Text>
          </TouchableOpacity>
        </View>
        {filteredEvents.length === 0 ? (
          <View style={styles.containerNotElements}>
            <ImageCache
              contentFit="contain"
              style={styles.imageNotElements}
              imageSrc={notItemsImage}
            />
            <View style={styles.titlesNotElements}>
              <Text style={styles.titleNotElements}>{i18n._("Sorry!")}</Text>
              <Text style={styles.titleNotElements}>
                {i18n._("You don't have {typeItem}.", { typeItem })}
              </Text>
            </View>
          </View>
        ) : (
          <ScrollView
            style={styles.containerElements}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {filteredEvents.map((event, index) => {
              const isStart = index === 0;
              return (
                <ItemSettingEvents
                  key={`${activeTab}-events-settings-${event._id}`}
                  event={event}
                  isStart={isStart}
                />
              );
            })}
            <ButtonCustom
              onSubmit={() => {
                if (infoSmallEvents.amountSmallEvent > 0)
                  navigation.navigate(PATHS_SETTINGS_SCREENS.settingsEventAdd);
                else setIsShowPayment(true);
              }}
              styleContainer={styles.containerButtonAdd}
            >
              <View style={styles.buttonAdd}>
                {infoSmallEvents.amountSmallEvent > 0 && (
                  <IconPlus width={16} height={16} fill={colors.white} />
                )}
                <Text style={styles.titleAdd}>
                  {infoSmallEvents.amountSmallEvent > 0
                    ? i18n._("Add event")
                    : i18n._("Buy event")}
                </Text>
              </View>
            </ButtonCustom>
          </ScrollView>
        )}

        <View style={styles.containerFooter}>
          <ButtonCustom
            onSubmit={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsEventAdd);
            }}
          >
            <View style={styles.buttonAdd}>
              <IconPlus width={16} height={16} fill={colors.white} />
              <Text style={styles.titleAdd}>{i18n._("Add event")}</Text>
            </View>
          </ButtonCustom>
        </View>
      </View>
      {isShowPayment && (
        <ModalWindowBuy onClose={() => setIsShowPayment(false)} />
      )}
    </>
  );
};
