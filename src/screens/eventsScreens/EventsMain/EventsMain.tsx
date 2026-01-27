import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
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
import { RootEventsScreensParamList } from "../../../navigators/Navigators.types";

// redux
import { useGetClosestEventsQuery } from "../../../storeRedux/api";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useSubscriptionProvider } from "../../../providers/SubscriptionProvider/SubscriptionProvider";
import { useMapProvider } from "../../../providers/MapProvider/MapProvider";

// components
import { ItemListEvents } from "./components/ItemListEvents/ItemListEvents";
import { ImageCache } from "../../../components/ImageCache/ImageCache";
import { HeaderActions } from "../../workshopsScreens/WorkshopsMain/components/HeaderActions/HeaderActions";
import { Header } from "../../../components/Header/Header";
import { MenuBurgerButton } from "../../../components/MenuBurgerButton/MenuBurgerButton";

// icons
import { ArrowLongRight } from "../../../icons/components";

// images
import notEventsImage from "../../../../assets/newsEvents/notEvents.jpeg";
import notNewsImage from "../../../../assets/newsEvents/notNews.jpeg";

// constants
import { PATHS_EVENTS_SCREENS } from "../../../navigators/useNavigator.constants";

// styles
import colors from "../../../../styles/colors";
import { styles } from "./EventsMain.styles";
import { LocationObjectCoords } from "expo-location";

type EventsMainProps = {
  navigation: NativeStackNavigationProp<RootEventsScreensParamList> &
    DrawerNavigationProp<RootEventsScreensParamList>;
};

export const EventsMain: FunctionComponent<EventsMainProps> = ({
  navigation,
}) => {
  const { i18n } = useLocalesProvider();
  const { infoSmallEvents } = useSubscriptionProvider();
  const { location } = useMapProvider();
  const [refreshing, setRefreshing] = useState(false);
  const [lastLocation, setLastLocation] = useState<LocationObjectCoords | null>(
    null
  );
  const lastRefreshTimeRef = useRef<number>(0);
  const { data: closestEventsData, refetch } = useGetClosestEventsQuery(
    lastLocation ? lastLocation : {}
  );

  const eventsWill = useMemo(
    () => closestEventsData?.upcomingAndCurrent || [],
    [closestEventsData]
  );
  const eventsOld = useMemo(
    () => closestEventsData?.past || [],
    [closestEventsData]
  );

  const onRefresh = async () => {
    setRefreshing(true);
    const currentTime = Date.now();
    const timeSinceLastRefresh = currentTime - lastRefreshTimeRef.current;
    const minRefreshInterval = 10000;
    if (timeSinceLastRefresh >= minRefreshInterval) {
      lastRefreshTimeRef.current = currentTime;
      await refetch();
    }
    setRefreshing(false);
  };

  const onToEventsList = () => {
    navigation.navigate(PATHS_EVENTS_SCREENS.eventsList);
  };
  const onToOldNewsList = () => {
    navigation.navigate(PATHS_EVENTS_SCREENS.eventsList, { isOld: true });
  };

  const onPressShowMenu = () => {
    navigation.openDrawer();
  };

  const onPressAddEvent = () => {
    navigation.navigate(PATHS_EVENTS_SCREENS.eventAdd);
  };

  useEffect(() => {
    if (location && !lastLocation) setLastLocation(location);
  }, [location]);

  return (
    <>
      <Header
        leftElement={<MenuBurgerButton onPress={onPressShowMenu} />}
        title={i18n._("Events")}
        rightElement={
          <HeaderActions
            onPressFilter={() => {}}
            onPressSort={() => {}}
            onPressAddWorkshop={onPressAddEvent}
            isAddButtonDisabled={infoSmallEvents.amountSmallEvent <= 0}
            addButtonAccessibilityLabel={i18n._("Add event")}
            showFilters={false}
            hasActiveSort={false}
          />
        }
        containerStyle={styles.containerHeader}
        rightStyle={styles.containerRightHeader}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <View style={styles.containerPart}>
            <Text style={styles.titleType}>{i18n._("Upcoming events:")}</Text>
            <View style={styles.containerEvents}>
              {eventsWill.length ? (
                eventsWill
                  .slice(0, 3)
                  .map((eventItem) => (
                    <ItemListEvents
                      key={`event-${eventItem._id}`}
                      item={eventItem}
                      navigation={navigation}
                    />
                  ))
              ) : (
                <View style={styles.containerNotList}>
                  <ImageCache
                    contentFit="contain"
                    style={styles.imageNotElements}
                    imageSrc={notEventsImage}
                  />
                  <Text style={styles.titleNotList}>
                    {i18n._("Sorry, there are no upcoming events")}
                  </Text>
                </View>
              )}
            </View>
            {eventsWill.length ? (
              <TouchableOpacity
                accessibilityLabel={i18n._("Press show more events")}
                style={styles.buttonMore}
                onPress={onToEventsList}
              >
                <Text style={styles.titleButtonMore}>
                  {i18n._("More events")}
                </Text>
                <ArrowLongRight
                  width={40}
                  height={12}
                  fill={colors.blueTufts}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.containerPart}>
            <Text style={styles.titleType}>{i18n._("Past events:")}</Text>
            <View style={styles.containerEvents}>
              {eventsOld.length ? (
                eventsOld
                  .slice(0, 3)
                  .map((itemOld) => (
                    <ItemListEvents
                      key={`event-${itemOld._id}`}
                      item={itemOld}
                      navigation={navigation}
                    />
                  ))
              ) : (
                <View style={styles.containerNotList}>
                  <ImageCache
                    contentFit="contain"
                    style={styles.imageNotElements}
                    imageSrc={notNewsImage}
                  />
                  <Text style={styles.titleNotList}>
                    {i18n._("No events have passed")}
                  </Text>
                </View>
              )}
            </View>
            {eventsOld.length ? (
              <TouchableOpacity
                style={styles.buttonMore}
                onPress={onToOldNewsList}
              >
                <Text style={styles.titleButtonMore}>
                  {i18n._("More events")}
                </Text>
                <ArrowLongRight
                  width={40}
                  height={12}
                  fill={colors.blueTufts}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <View style={styles.containerEmpty} />
      </ScrollView>
    </>
  );
};
