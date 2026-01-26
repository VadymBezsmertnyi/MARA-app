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
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootAllScreensParamList } from "../../../navigators/Navigators.types";

// redux
import { useUserSelector } from "../../../storeRedux/apis/user/slice";
import { useWorkshopsSelector } from "../../../storeRedux/apis/workshops/slice";
import { useGetWorkshopsUserQuery } from "../../../storeRedux/api";

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
import { ItemSettingWorkshops } from "./components/ItemSettingWorkshops/ItemSettingWorkshops";
import ModalWindowBuy from "../../../components/ModalWindowBuy/ModalWindowBuy";

// icons
import { IconClose, IconPlus } from "../../../icons/components";

// constants
import { PATHS_SETTINGS_SCREENS } from "../../../navigators/useNavigator.constants";

// images
import notItemsImage from "../../../../assets/settingsScreen/notWorkshopsUsers.jpeg";

// styles
import { styles } from "./SettingsWorkshops.styles";
import colors from "../../../../styles/colors";

type SettingsWorkshopsProps = {
  navigation: NativeStackNavigationProp<RootAllScreensParamList> &
    DrawerNavigationProp<RootAllScreensParamList>;
};

type TabType = "all" | "created" | "owned";

export const SettingsWorkshops: FunctionComponent<SettingsWorkshopsProps> = ({
  navigation,
}) => {
  const { userData } = useUserSelector();
  const { heightStatusBar } = useThemeProvider();
  const { i18n } = useLocalesProvider();
  const { infoWorkshops } = useSubscriptionProvider();
  const { showMessageServer } = useDropDownAlertProvider();
  const { workshopsUserList } = useWorkshopsSelector();
  const [isShowPayment, setIsShowPayment] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [refreshing, setRefreshing] = useState(false);
  const lastRefreshTimeRef = useRef<number>(0);
  const hasInitialLoadRef = useRef<boolean>(false);

  const { refetch } = useGetWorkshopsUserQuery(
    { userId: userData?._id || "" },
    { skip: !userData?._id }
  );

  const workshopsUser = useMemo(() => {
    if (!userData?._id) return [];
    const userId = userData._id;

    if (activeTab === "all") return workshopsUserList;
    if (activeTab === "created")
      return workshopsUserList.filter((w) => {
        if (!w.userId) return false;
        const workshopUserId =
          typeof w.userId === "string" ? w.userId : w.userId?._id;
        return workshopUserId === userId;
      });
    if (activeTab === "owned")
      return workshopsUserList.filter((w) => {
        if (!w.ownerUserId) return false;
        const workshopOwnerId =
          typeof w.ownerUserId === "string"
            ? w.ownerUserId
            : w.ownerUserId?._id;
        return workshopOwnerId === userId;
      });

    return [];
  }, [workshopsUserList, activeTab, userData?._id]);
  const containerStyles = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }],
    [heightStatusBar]
  );

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
    if (workshopsUserList.length === 0) {
      hasInitialLoadRef.current = true;
      refetch();
    }
  }, [userData?._id, workshopsUserList.length, refetch]);

  return (
    <>
      <View style={containerStyles}>
        <View style={styles.containerHeader}>
          <View style={styles.boxHeaderEmpty} />
          <Text style={styles.titleHeader}>{i18n._("My workshops")}</Text>
          <TouchableOpacity
            accessibilityLabel={i18n._(
              "Button for closing the settings workshops screen"
            )}
            onPress={onClose}
          >
            <IconClose width={24} height={24} fill={colors.blackCoffee} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerTabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "all" && styles.tabActive]}
            onPress={() => setActiveTab("all")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "all" && styles.tabTextActive,
              ]}
            >
              {i18n._("All")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "created" && styles.tabActive]}
            onPress={() => setActiveTab("created")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "created" && styles.tabTextActive,
              ]}
            >
              {i18n._("Created by me")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "owned" && styles.tabActive]}
            onPress={() => setActiveTab("owned")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "owned" && styles.tabTextActive,
              ]}
            >
              {i18n._("Mine")}
            </Text>
          </TouchableOpacity>
        </View>
        {workshopsUser.length === 0 ? (
          <View style={styles.containerNotElements}>
            <ImageCache
              contentFit="contain"
              style={styles.imageNotElements}
              imageSrc={notItemsImage}
            />
            <View style={styles.titlesNotElements}>
              <Text style={styles.titleNotElements}>{i18n._("Sorry!")}</Text>
              <Text style={styles.titleNotElements}>
                {i18n._("You don't have {typeItem}.")}
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
            {workshopsUser.map((workshop, index) => {
              const isStart = index === 0;
              return (
                <ItemSettingWorkshops
                  key={`${activeTab}-workshop-${workshop._id}`}
                  workshop={workshop}
                  isStart={isStart}
                  currentUserId={userData?._id || null}
                />
              );
            })}
            <ButtonCustom
              onSubmit={() => {
                if (infoWorkshops.amountWorkshop > 0)
                  navigation.navigate(
                    PATHS_SETTINGS_SCREENS.settingsWorkshopAdd
                  );
                else setIsShowPayment(true);
              }}
              styleContainer={styles.containerButtonAdd}
            >
              <View style={styles.buttonAdd}>
                {infoWorkshops.amountWorkshop > 0 && (
                  <IconPlus width={16} height={16} fill={colors.white} />
                )}
                <Text style={styles.titleAdd}>
                  {infoWorkshops.amountWorkshop > 0
                    ? i18n._("Add workshop")
                    : i18n._("Buy workshop")}
                </Text>
              </View>
            </ButtonCustom>
          </ScrollView>
        )}
      </View>
      {isShowPayment && (
        <ModalWindowBuy onClose={() => setIsShowPayment(false)} />
      )}
    </>
  );
};
