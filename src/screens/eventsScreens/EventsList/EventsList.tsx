import React, {
  FunctionComponent,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import { Modal, ScrollView, View, RefreshControl } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// types
import { IGetEventsRequest } from "../../../storeRedux/apis/events/events.types";

// redux
import { useEventsSelector } from "../../../storeRedux/apis/events/slice";
import { useGetEventsQuery } from "../../../storeRedux/api";
import { useMapSelector } from "../../../storeRedux/apis/map/slice";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";

// components
import { Input } from "../../../components/Input/Input";
import { EventListItem } from "../EventsMain/components/ItemListEvents/ItemListEvents";
import { IconSearchInput } from "../../../icons/components";
import { Header } from "../../../components/Header/Header";
import { HeaderActions } from "../../workshopsScreens/WorkshopsMain/components/HeaderActions/HeaderActions";
import { EventLocationButtonSheet } from "./components/EventLocationButtonSheet/EventLocationButtonSheet";
import { ModalWindow } from "../../../components/ModalWindow/ModalWindow";
import { ModalSort } from "./components/ModalSort/ModalSort";
import {
  ModalFilter,
  TypeEventFilters,
} from "./components/ModalFilter/ModalFilter";

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
  const { bottom } = useSafeAreaInsets();
  const { location } = useMapSelector();
  const {
    upcomingEventsList,
    pastEventsList,
    pagination,
    maxDistance = 5,
  } = useEventsSelector();
  const { i18n } = useLocalesProvider();
  const [valueSearch, setValueSearch] = useState("");
  const [debouncedValueSearch, setDebouncedValueSearch] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(
    null
  );
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [isShowSort, setIsShowSort] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [filters, setFilters] = useState<TypeEventFilters | null>(null);
  const [sort, setSort] = useState<"distance" | "date" | null>(null);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const limit = 20;
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const prevDebouncedValueSearchRef = useRef<string>("");
  const lastRefreshTimeRef = useRef<number>(0);
  const didInitFiltersRef = useRef(false);

  const eventStatus = params?.isOld ? "past" : "upcoming";

  const onClose = () => {
    setIsShowSort(false);
    setIsShowFilter(false);
  };

  const setTypeSort = (type: "distance" | "date") => {
    setSort((state) => (state === type ? null : type));
    onClose();
  };

  const onSubmitFilters = (newFilters: TypeEventFilters) => {
    const isClearFilters =
      newFilters.minPrice === null &&
      newFilters.maxPrice === null &&
      newFilters.maxDistance === maxDistance;

    setFilters(isClearFilters ? null : newFilters);
    onClose();
  };

  const queryParams: IGetEventsRequest = useMemo(
    () => ({
      page,
      limit,
      eventStatus,
      ...(sort && { sort }),
      ...(filters?.minPrice !== null && filters?.minPrice !== undefined
        ? { minPrice: filters.minPrice }
        : {}),
      ...(filters?.maxPrice !== null && filters?.maxPrice !== undefined
        ? { maxPrice: filters.maxPrice }
        : {}),
      ...(filters ? { maxDistance: filters.maxDistance } : { maxDistance }),
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
      sort,
      filters,
      maxDistance,
      debouncedValueSearch,
      selectedCountryId,
      selectedPlaceId,
      location,
    ]
  );

  const { isLoading, refetch } = useGetEventsQuery(queryParams);

  const eventsList = useMemo(
    () => (eventStatus === "past" ? pastEventsList : upcomingEventsList),
    [eventStatus, pastEventsList, upcomingEventsList]
  );

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
    if (valueSearch.length >= 3)
      debounceTimerRef.current = setTimeout(() => {
        setDebouncedValueSearch(valueSearch);
      }, 500);
    else setDebouncedValueSearch("");

    setPage(1);
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [valueSearch]);

  useEffect(() => {
    if (
      !debouncedValueSearch &&
      prevDebouncedValueSearchRef.current &&
      valueSearch.length < 3
    ) {
      refetch();
      lastRefreshTimeRef.current = Date.now();
    }

    prevDebouncedValueSearchRef.current = debouncedValueSearch;
  }, [debouncedValueSearch, valueSearch, refetch]);

  useEffect(() => {
    if (!isLoading && lastRefreshTimeRef.current === 0)
      lastRefreshTimeRef.current = Date.now();
  }, [isLoading]);

  useEffect(() => {
    setPage(1);
  }, [
    params?.isOld,
    debouncedValueSearch,
    selectedCountryId,
    selectedPlaceId,
    sort,
    filters,
  ]);

  useEffect(() => {
    if (!didInitFiltersRef.current) {
      didInitFiltersRef.current = true;
      if (!selectedCountryId && !selectedPlaceId) return;
    }
    if (page === 1) refetch();
  }, [filters, page, selectedCountryId, selectedPlaceId]);

  return (
    <>
      <Header
        title={
          params?.isOld ? i18n._("Past events:") : i18n._("Upcoming events:")
        }
        rightElement={
          <HeaderActions
            onPressFilter={() => {
              setIsShowFilter(true);
            }}
            onPressSort={() => {
              setIsShowSort(true);
            }}
            onPressAddWorkshop={onPressAddEvent}
            addButtonAccessibilityLabel={i18n._("Add event")}
            showFilters
            hasActiveSort={sort !== null}
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
        <EventLocationButtonSheet
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
            <EventListItem
              key={`event-${eventItem._id}`}
              item={eventItem}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </View>
      {isShowSort ? (
        <ModalWindow onClose={onClose}>
          <ModalSort
            onClose={onClose}
            setTypeSort={setTypeSort}
            currentSort={sort}
          />
        </ModalWindow>
      ) : null}
      {isShowFilter ? (
        <Modal>
          <ModalFilter
            onClose={onClose}
            filters={filters}
            onSubmit={onSubmitFilters}
            maxDistance={maxDistance}
          />
        </Modal>
      ) : null}
    </>
  );
};
