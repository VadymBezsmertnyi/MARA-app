import React, {
  FunctionComponent,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  ScrollView,
  View,
  RefreshControl,
  Modal,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

// types
import { RootHelpScreensParamList } from "../../../navigators/Navigators.types";
import { TTelegramChannelCategory } from "../../../storeRedux/apis/telegram-channels/telegram-channels.types";
import { PATHS_HELP_SCREENS } from "../../../navigators/useNavigator.constants";

// providers
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";
import { useLocalesProvider } from "../../../../localization/localization.provider";

// components
import { ModalReportContact } from "../../../components/ModalReportContact/ModalReportContact";
import { Header } from "../../../components/Header/Header";
import { HeaderActions } from "../../workshopsScreens/WorkshopsMain/components/HeaderActions/HeaderActions";
import { Input } from "../../../components/Input/Input";
import { IconSearchInput } from "../../../icons/components";
import { ModalWindow } from "../../../components/ModalWindow/ModalWindow";
import { ModalSort } from "./components/ModalSort/ModalSort";
import { ModalFilter } from "./components/ModalFilter/ModalFilter";

// API
import {
  useGetTelegramChannelsQuery,
  useGetTelegramCategoriesQuery,
  useGetTelegramCountriesQuery,
  useGetTelegramCitiesQuery,
  useGetTelegramLocationsQuery,
} from "../../../storeRedux/api";

// styles
import { styles } from "./HelpMain.styles";
import colors from "../../../../styles/colors";

type HelpMainProps = {
  navigation: NativeStackNavigationProp<RootHelpScreensParamList> &
    DrawerNavigationProp<RootHelpScreensParamList>;
};

type SortOption = "name" | "category" | "verified" | null;
type FiltersState = {
  category: TTelegramChannelCategory | null;
  country: string;
  city: string;
  verified: boolean;
};

export const HelpMain: FunctionComponent<HelpMainProps> = ({ navigation }) => {
  const { heightTabBar } = useThemeProvider();
  const { bottom } = useSafeAreaInsets();
  const { i18n } = useLocalesProvider();
  const [valueSearch, setValueSearch] = useState("");
  const [debouncedValueSearch, setDebouncedValueSearch] = useState("");
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const prevDebouncedValueSearchRef = useRef<string>("");
  const [isShowSort, setIsShowSort] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [filters, setFilters] = useState<FiltersState | null>(null);
  const [sort, setSort] = useState<SortOption>(null);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const limit = 20;

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      ...(filters?.category && { category: filters.category }),
      ...(filters?.country && { country_place_id: filters.country }),
      ...(filters?.city && { place_id: filters.city }),
      ...(filters?.verified && { verified: filters.verified }),
      ...(debouncedValueSearch && { search: debouncedValueSearch }),
      ...(sort && { sort }),
    }),
    [page, limit, filters, debouncedValueSearch, sort]
  );
  const {
    data: channelsData,
    isLoading: channelsLoading,
    error: channelsError,
    refetch: refetchChannels,
  } = useGetTelegramChannelsQuery(queryParams);
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetTelegramCategoriesQuery();
  const { data: countriesData, isLoading: countriesLoading } =
    useGetTelegramCountriesQuery();
  const { data: citiesData, isLoading: citiesLoading } =
    useGetTelegramCitiesQuery({
      country_place_id: filters?.country || undefined,
    });

  const containerStyles = useMemo(
    () => [
      styles.container,
      {
        paddingBottom: bottom,
      },
    ],
    [bottom]
  );

  const onClose = () => {
    setIsShowSort(false);
    setIsShowFilter(false);
  };

  const setTypeSort = (type: SortOption) => {
    setSort((state) => (state === type ? null : type));
    onClose();
  };

  const onSubmitFilters = (newFilters: FiltersState) => {
    const isClearFilters =
      !newFilters.category &&
      !newFilters.country &&
      !newFilters.city &&
      !newFilters.verified;

    setFilters(isClearFilters ? null : newFilters);
    onClose();
  };

  const onPressAddChannel = () => {
    navigation.navigate(PATHS_HELP_SCREENS.addTelegramChannel);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchChannels();
    setRefreshing(false);
  };

  const handleOpenChannel = (url: string) => {
    let telegramUrl = url;
    if (url.startsWith("@")) telegramUrl = `https://t.me/${url.substring(1)}`;
    else if (!url.startsWith("https://t.me/") && !url.startsWith("tg://"))
      telegramUrl = `https://t.me/${url}`;

    Linking.openURL(telegramUrl).catch(() => {
      Toast.show({
        type: "error",
        text1: i18n._("Error"),
        text2: i18n._("Cannot open channel URL"),
        position: "top",
        visibilityTime: 3000,
      });
    });
  };

  const handleReportChannel = () => {
    setShowReportModal(true);
  };

  useEffect(() => {
    if (channelsError)
      Toast.show({
        type: "error",
        text1: i18n._("Error"),
        text2: i18n._("Failed to load telegram channels"),
        position: "top",
        visibilityTime: 3000,
      });
  }, [channelsError]);

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
      refetchChannels();
    }
    prevDebouncedValueSearchRef.current = debouncedValueSearch;
  }, [debouncedValueSearch, valueSearch, refetchChannels]);

  useEffect(() => {
    setPage(1);
  }, [debouncedValueSearch, filters, sort]);

  return (
    <>
      <Header
        title={i18n._("Help & Resources")}
        rightElement={
          <HeaderActions
            onPressFilter={() => {
              setIsShowFilter(true);
            }}
            onPressSort={() => {
              setIsShowSort(true);
            }}
            onPressAddWorkshop={onPressAddChannel}
            addButtonAccessibilityLabel={i18n._("Add Telegram channel")}
            showFilters
            hasActiveSort={sort !== null}
          />
        }
      />
      <View style={containerStyles}>
        <Input
          value={valueSearch}
          onChange={setValueSearch}
          placeholder={i18n._("Search channels...")}
          InputIcon={<IconSearchInput width={26} height={26} />}
        />
        {(filters || sort) && (
          <View style={styles.activeFiltersContainer}>
            <Text style={styles.activeFiltersTitle}>
              {i18n._("Active filters:")}
            </Text>
            {filters?.category && (
              <Text style={styles.activeFilter}>
                {i18n._("Category")}: {filters.category}
              </Text>
            )}
            {filters?.country && (
              <Text style={styles.activeFilter}>
                {i18n._("Country")}: {filters.country}
              </Text>
            )}
            {filters?.city && (
              <Text style={styles.activeFilter}>
                {i18n._("City")}: {filters.city}
              </Text>
            )}
            {filters?.verified && (
              <Text style={styles.activeFilter}>{i18n._("Verified only")}</Text>
            )}
            {sort && (
              <Text style={styles.activeFilter}>
                {i18n._("Sort by")}: {sort}
              </Text>
            )}
          </View>
        )}
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
        >
          {channelsLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.blueTufts} />
              <Text style={styles.loadingText}>
                {i18n._("Loading channels...")}
              </Text>
            </View>
          ) : (
            channelsData?.data?.channels?.map((channel: any) => (
              <View key={channel._id} style={styles.channelCard}>
                <View style={styles.channelHeader}>
                  <View style={styles.channelInfo}>
                    <Text style={styles.channelName}>{channel.name}</Text>
                    {channel.description && (
                      <Text style={styles.channelDescription}>
                        {channel.description}
                      </Text>
                    )}
                    <View style={styles.channelMeta}>
                      <Text style={styles.channelCategory}>
                        {channel.category}
                      </Text>
                      {channel.country_place_id?.name && (
                        <Text style={styles.channelLocation}>
                          {channel.country_place_id.name}
                        </Text>
                      )}
                      {channel.place_id?.name && (
                        <Text style={styles.channelLocation}>
                          {channel.place_id.name}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.channelBadges}>
                    {channel.verified && channel.aiVerified && (
                      <View style={styles.verifiedBadge}>
                        <MaterialIcons
                          name="verified"
                          size={16}
                          color="#4CAF50"
                        />
                        <Text style={styles.verifiedText}>
                          {i18n._("Verified")}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.channelActions}>
                  <TouchableOpacity
                    style={styles.channelButton}
                    onPress={() => handleOpenChannel(channel.channelUrl)}
                  >
                    <MaterialIcons
                      name="telegram"
                      size={20}
                      color={colors.white}
                    />
                    <Text style={styles.channelButtonText}>
                      {i18n._("Open Channel")}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.reportButton}
                    onPress={() => handleReportChannel()}
                  >
                    <MaterialIcons name="flag" size={20} color="#F44336" />
                    <Text style={styles.reportButtonText}>
                      {i18n._("Report")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
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
            filters={filters}
            onClose={onClose}
            onSubmit={onSubmitFilters}
            categoriesData={categoriesData}
            countriesData={countriesData?.data || []}
            citiesData={citiesData?.data || []}
            initialFilters={filters || undefined}
          />
        </Modal>
      ) : null}
      <ModalReportContact
        visible={showReportModal}
        onClose={() => setShowReportModal(false)}
        type="telegram-channel"
      />
    </>
  );
};
