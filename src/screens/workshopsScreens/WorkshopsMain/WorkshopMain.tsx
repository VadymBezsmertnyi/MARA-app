import React, {
  FunctionComponent,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import { Modal, ScrollView, Text, View, RefreshControl } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { convertDistance, getDistance } from "geolib";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerNavigationProp } from "@react-navigation/drawer";

// redux
import { useWorkshopsSelector } from "../../../storeRedux/apis/workshops/slice";
import { useGetWorkshopsQuery } from "../../../storeRedux/api";
import { useMapSelector } from "../../../storeRedux/apis/map/slice";

// providers
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";
import {
  useDropDownAlertProvider,
  DropdownAlertType,
} from "../../../providers/DropDownAlertProvider/DropDownAlertProvider";

// types
import { RootWorkshopsScreensParamList } from "../../../navigators/Navigators.types";
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useSubscriptionProvider } from "../../../providers/SubscriptionProvider/SubscriptionProvider";

// components
import { Input } from "../../../components/Input/Input";
import { WorkshopListItem } from "./components/WorkshopItem/WorkshopItem";
import { Header } from "../../../components/Header/Header";
import { MenuBurgerButton } from "../../../components/MenuBurgerButton/MenuBurgerButton";
import { HeaderActions } from "./components/HeaderActions/HeaderActions";
import { ModalWindow } from "../../../components/ModalWindow/ModalWindow";
import { ModalSort } from "./components/ModalSort/ModalSort";
import {
  ModalFilter,
  TypeWorkshopFilters,
} from "./components/ModalFilter/ModalFilter";
import { ImageCache } from "../../../components/ImageCache/ImageCache";

// icons
import { IconSearchInput } from "../../../icons/components";

// constants
import { PATHS_WORKSHOP_SCREENS } from "../../../navigators/useNavigator.constants";

// images
import notWorkshopsImage from "../../../../assets/workshops/notWorkshops.jpeg";
import notWorkshopsFilterImage from "../../../../assets/workshops/notWorkshopsFilter.jpeg";

// styles
import { styles } from "./WorkshopMain.styles";

type WorkshopMainProps = {
  navigation: NativeStackNavigationProp<RootWorkshopsScreensParamList> &
    DrawerNavigationProp<RootWorkshopsScreensParamList>;
};

export const WorkshopMain: FunctionComponent<WorkshopMainProps> = ({
  navigation,
}) => {
  const { bottom } = useSafeAreaInsets();
  const { i18n } = useLocalesProvider();
  const { infoWorkshops } = useSubscriptionProvider();
  const { heightTabBar } = useThemeProvider();
  const { showMessageServer } = useDropDownAlertProvider();
  const {
    workshopsList: workshops,
    pagination,
    maxDistance = 5,
  } = useWorkshopsSelector();
  const { location } = useMapSelector();
  const [isShowSort, setIsShowSort] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [workshopName, setWorkshopName] = useState("");
  const [debouncedWorkshopName, setDebouncedWorkshopName] = useState("");
  const [filters, setFilters] = useState<TypeWorkshopFilters | null>(null);
  const [sort, setSort] = useState<"comments" | "distance" | "rating" | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const limit = 20;
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const prevDebouncedWorkshopNameRef = useRef<string>("");
  const lastRefreshTimeRef = useRef<number>(0);

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      ...(sort && { sort }),
      ...(filters?.moto !== undefined && { moto: filters.moto }),
      ...(filters?.auto !== undefined && { auto: filters.auto }),
      ...(filters?.maxDistance
        ? { maxDistance: filters.maxDistance }
        : { maxDistance }),
      ...(filters?.minRating !== undefined && { minRating: filters.minRating }),
      ...(debouncedWorkshopName && { workshopName: debouncedWorkshopName }),
      ...(location && {
        latitude: location.latitude,
        longitude: location.longitude,
      }),
    }),
    [page, limit, sort, filters, debouncedWorkshopName, location, maxDistance]
  );

  const { isLoading, refetch } = useGetWorkshopsQuery(queryParams);

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
    } else
      showMessageServer(
        i18n._("Wait please before the next update"),
        i18n._("Wait please before the next update"),
        DropdownAlertType.Info
      );

    setRefreshing(false);
  };

  const onClose = () => {
    setIsShowSort(false);
    setIsShowFilter(false);
  };

  const setTypeSort = (type: "comments" | "distance" | "rating") => {
    setSort((state) => (state === type ? null : type));
    onClose();
  };

  const onSubmitFilters = (newFilters: TypeWorkshopFilters) => {
    setFilters(newFilters);
    onClose();
  };

  const onPressAddWorkshop = () => {
    navigation.navigate(PATHS_WORKSHOP_SCREENS.workshopAdd);
  };

  const onPressShowMenu = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    if (workshopName.length >= 3)
      debounceTimerRef.current = setTimeout(() => {
        setDebouncedWorkshopName(workshopName);
      }, 500);
    else setDebouncedWorkshopName("");

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [workshopName]);

  useEffect(() => {
    if (sort !== null || filters !== null || debouncedWorkshopName) setPage(1);
  }, [sort, filters, debouncedWorkshopName]);

  useEffect(() => {
    if (
      !debouncedWorkshopName &&
      prevDebouncedWorkshopNameRef.current &&
      workshopName.length < 3
    ) {
      refetch();
      lastRefreshTimeRef.current = Date.now();
    }

    prevDebouncedWorkshopNameRef.current = debouncedWorkshopName;
  }, [debouncedWorkshopName, workshopName, refetch]);

  useEffect(() => {
    if (!isLoading && lastRefreshTimeRef.current === 0)
      lastRefreshTimeRef.current = Date.now();
  }, [isLoading]);

  return (
    <>
      <Header
        leftElement={<MenuBurgerButton onPress={onPressShowMenu} />}
        title={i18n._("Workshops")}
        rightElement={
          <HeaderActions
            onPressFilter={() => {
              setIsShowFilter(true);
            }}
            onPressSort={() => {
              setIsShowSort(true);
            }}
            onPressAddWorkshop={onPressAddWorkshop}
            isAddButtonDisabled={infoWorkshops.amountWorkshop <= 0}
            addButtonAccessibilityLabel={i18n._("Add workshop")}
            showFilters={workshops.length > 0 || filters !== null}
            hasActiveSort={sort !== null}
          />
        }
        containerStyle={styles.containerHeader}
        rightStyle={styles.containerRightHeader}
      />
      <View style={styles.container}>
        {workshops.length > 0 ||
        workshopName ||
        debouncedWorkshopName ||
        filters !== null ||
        sort !== null ? (
          <View style={styles.search}>
            <Input
              value={workshopName}
              placeholder={i18n._(
                "Enter the name of the workshop or type of work"
              )}
              onChange={setWorkshopName}
              InputIcon={
                <IconSearchInput
                  width={26}
                  height={26}
                  style={styles.iconInput}
                />
              }
            />
          </View>
        ) : null}
        <ScrollView
          contentContainerStyle={[
            styles.wrapper,
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
          {workshops.length ? (
            workshops.map((item) => {
              const distance =
                location && item.coordinates
                  ? getDistance(location, {
                      longitude: item.coordinates.longitude,
                      latitude: item.coordinates.latitude,
                    })
                  : null;
              return (
                <WorkshopListItem
                  key={`workshop-${item._id}`}
                  workshopId={item._id}
                  title={item.title}
                  description={item.description}
                  range={
                    distance ? convertDistance(distance, "km").toFixed(2) : null
                  }
                  comments={item.comments.length} //TODO
                  rate={item.rating}
                  navigation={navigation}
                  isAutoService={item.autoTypesWorks.length > 0}
                  isMotoService={item.motoTypesWorks.length > 0}
                  image={item.imageFiles ? item.imageFiles[0] : null}
                />
              );
            })
          ) : pagination &&
            pagination.total === 0 &&
            (sort !== null || filters !== null || debouncedWorkshopName) ? (
            <View style={styles.containerNotList}>
              <ImageCache
                contentFit="contain"
                style={styles.imageNotElements}
                imageSrc={notWorkshopsFilterImage}
              />
              <Text style={styles.titleNotList}>
                {i18n._("Sorry, but no workshops were found by the filters")}
              </Text>
            </View>
          ) : (
            <View style={styles.containerNotList}>
              <ImageCache
                contentFit="contain"
                style={styles.imageNotElements}
                imageSrc={notWorkshopsImage}
              />
              <Text style={styles.titleNotList}>
                {i18n._("Sorry, there are no upcoming workshops")}
              </Text>
            </View>
          )}
          <View style={styles.containerEmpty} />
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
