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
import { PlaceDbType } from "../../../providers/PlacesProvider/PlacesProvider.types";

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
import { InputSelectCity } from "../../../components/InputSelectCity/InputSelectCity";
import { ItemListEvents } from "../EventsMain/components/ItemListEvents/ItemListEvents";
import { IconSearchInput } from "../../../icons/components";
import { Header } from "../../../components/Header/Header";
import { HeaderActions } from "../../workshopsScreens/WorkshopsMain/components/HeaderActions/HeaderActions";

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
  const [selectPlace, setSelectPlace] = useState<PlaceDbType | null>(null);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const limit = 20;
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastRefreshTimeRef = useRef<number>(0);

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      eventStatus: params?.isOld ? "past" : "future",
      ...(debouncedValueSearch && { eventName: debouncedValueSearch }),
      ...(location && {
        latitude: location.latitude,
        longitude: location.longitude,
      }),
    }),
    [page, limit, params?.isOld, debouncedValueSearch, location]
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

  const showCities = useMemo(() => {
    const placesAll = eventsList.map((event) => event.place_id);
    const places = placesAll.reduce((acc, place) => {
      if (!place) return acc;
      const isPlace = acc.find((item) => item._id === place._id);
      if (!isPlace) return [...acc, place];
      return acc;
    }, [] as PlaceDbType[]);

    return places;
  }, [eventsList]);

  const showEventsList = useMemo(
    () =>
      eventsList.filter((event) =>
        selectPlace ? event.place_id?._id === selectPlace._id : true
      ),
    [eventsList, selectPlace]
  );
  const containerStyles = useMemo(
    () => [
      styles.container,
      {
        paddingBottom: bottom,
      },
    ],
    [bottom]
  );

  const onSelectCity = (place: PlaceDbType) => {
    if (place._id === selectPlace?._id) setSelectPlace(null);
    else setSelectPlace(place);
  };

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
  }, [params?.isOld, debouncedValueSearch, selectPlace]);

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
        <InputSelectCity data={showCities} onSelect={onSelectCity} />
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
          {showEventsList.map((eventItem) => (
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
