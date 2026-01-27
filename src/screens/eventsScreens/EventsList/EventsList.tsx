import React, {
  FunctionComponent,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import { ScrollView, Text, View, RefreshControl } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// types
import { IGetEventsRequest } from "../../../storeRedux/apis/events/events.types";

// redux
import { useEventsSelector } from "../../../storeRedux/apis/events/slice";
import { useGetEventsQuery } from "../../../storeRedux/api";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";
import { useMapProvider } from "../../../providers/MapProvider/MapProvider";
import { useSubscriptionProvider } from "../../../providers/SubscriptionProvider/SubscriptionProvider";

// components
import { Input } from "../../../components/Input/Input";
import { ItemListEvents } from "../EventsMain/components/ItemListEvents/ItemListEvents";
import { IconSearchInput } from "../../../icons/components";
import { Header } from "../../../components/Header/Header";
import { HeaderActions } from "../../workshopsScreens/WorkshopsMain/components/HeaderActions/HeaderActions";
import { EventLocationFilter } from "./components/EventLocationFilter/EventLocationFilter";

// types
import { RootEventsScreensParamList } from "../../../navigators/Navigators.types";

// constants
import { PATHS_EVENTS_SCREENS } from "../../../navigators/useNavigator.constants";

// styles
import { styles } from "./EventsList.styles";

type ItemListEventsProps = {
  navigation: NativeStackNavigationProp<RootEventsScreensParamList>;
  route: RouteProp<
    RootEventsScreensParamList,
    keyof RootEventsScreensParamList
  >;
};

export const EventsList: FunctionComponent<ItemListEventsProps> = ({
  navigation,
  route,
}) => {
  const { params } = route;
  const { heightTabBar } = useThemeProvider();
  const { top, bottom } = useSafeAreaInsets();
  const { location } = useMapProvider();
  const { infoSmallEvents } = useSubscriptionProvider();
  const { eventsList, pagination } = useEventsSelector();
  const { i18n } = useLocalesProvider();
  const [valueSearch, setValueSearch] = useState("");
  const [debouncedValueSearch, setDebouncedValueSearch] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(
    null
  );
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const limit = 20;
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastRefreshTimeRef = useRef<number>(0);

  const eventStatus = params?.isOld ? "past" : "upcoming";

  const queryParams: IGetEventsRequest = useMemo(
    () => ({
      page,
      limit,
      eventStatus,
      ...(debouncedValueSearch && { eventName: debouncedValueSearch }),
      ...(selectedCountryId && { countryId: selectedCountryId }),
      ...(selectedPlaceId && { placeId: selectedPlaceId }),
      ...(location && {
        latitude: location.latitude,
        longitude: location.longitude,
      }),
    }),
    [
      page,
      limit,
      eventStatus,
      debouncedValueSearch,
      selectedCountryId,
      selectedPlaceId,
      location,
    ]
  );

  const { isLoading, refetch } = useGetEventsQuery(queryParams);

  const hasMorePages = useMemo(
    () => pagination && pagination.page < pagination.totalPages,
    [pagination]
  );

  const loadMore = () => {
    if (hasMorePages && !isLoading) setPage((prev) => prev + 1);
  };

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

  const containerStyles = useMemo(
    () => [
      styles.container,
      {
        paddingBottom: bottom,
      },
    ],
    [bottom]
  );

  const onPressAddEvent = () => {
    navigation.navigate(PATHS_EVENTS_SCREENS.eventAdd);
  };

  useEffect(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedValueSearch(valueSearch);
      setPage(1);
    }, 500);
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [valueSearch]);

  useEffect(() => {
    setPage(1);
  }, [params?.isOld, debouncedValueSearch, selectedCountryId, selectedPlaceId]);

  return (
    <>
      <Header
        title={
          params?.isOld ? i18n._("Past events:") : i18n._("Upcoming events:")
        }
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
      />
      <View style={containerStyles}>
        <Input
          value={valueSearch}
          onChange={setValueSearch}
          placeholder={i18n._("Enter the text to search")}
          InputIcon={<IconSearchInput width={26} height={26} />}
        />
        <EventLocationFilter
          eventStatus={eventStatus}
          selectedCountryId={selectedCountryId}
          selectedPlaceId={selectedPlaceId}
          onSelectCountry={setSelectedCountryId}
          onSelectPlace={setSelectedPlaceId}
        />
        <ScrollView
          contentContainerStyle={[
            styles.containerList,
            {
              paddingBottom: (heightTabBar || 0) + bottom,
            },
          ]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScroll={({ nativeEvent }) => {
            const { layoutMeasurement, contentOffset, contentSize } =
              nativeEvent;
            const paddingToBottom = 20;
            if (
              layoutMeasurement.height + contentOffset.y >=
              contentSize.height - paddingToBottom
            )
              loadMore();
          }}
          scrollEventThrottle={400}
        >
          {eventsList.map((eventItem) => (
            <ItemListEvents
              key={`event-${eventItem._id}`}
              item={eventItem}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
};
