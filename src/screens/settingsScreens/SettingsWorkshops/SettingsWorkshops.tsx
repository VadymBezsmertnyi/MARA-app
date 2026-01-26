import React, { FunctionComponent, useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootAllScreensParamList } from "../../../navigators/Navigators.types";

// redux
import { useUserSelector } from "../../../storeRedux/apis/user/slice";
import { useGetWorkshopsUserQuery } from "../../../storeRedux/api";

// providers
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useSubscriptionProvider } from "../../../providers/SubscriptionProvider/SubscriptionProvider";

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

export const SettingsWorkshops: FunctionComponent<SettingsWorkshopsProps> = ({
  navigation,
}) => {
  const { userData } = useUserSelector();
  const { heightStatusBar } = useThemeProvider();
  const { i18n } = useLocalesProvider();
  const { infoWorkshops } = useSubscriptionProvider();
  const [isShowPayment, setIsShowPayment] = useState(false);

  const { data: workshopsData, isLoading } = useGetWorkshopsUserQuery(
    { userId: userData?._id || "" },
    { skip: !userData?._id }
  );

  const workshopsUser = useMemo(
    () => workshopsData?.workshops || [],
    [workshopsData?.workshops]
  );
  const containerStyles = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }],
    [heightStatusBar]
  );

  const onClose = () => {
    navigation.goBack();
  };

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
          <ScrollView style={styles.containerElements}>
            {workshopsUser.map((workshop, index) => {
              const isStart = index === 0;
              return (
                <ItemSettingWorkshops
                  key={`user-workshop-${workshop._id}`}
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
