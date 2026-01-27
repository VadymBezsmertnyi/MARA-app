import React, { FunctionComponent, useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";

// types
import { RootAllScreensParamList } from "../../../navigators/Navigators.types";

// redux
import { useEventsSelector } from "../../../storeRedux/apis/events/slice";

// providers
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useSubscriptionProvider } from "../../../providers/SubscriptionProvider/SubscriptionProvider";

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

export const SettingsEvents: FunctionComponent<SettingsEventsProps> = ({
  navigation,
}) => {
  const { infoSmallEvents } = useSubscriptionProvider();
  const { eventsUserList } = useEventsSelector();
  const { heightStatusBar } = useThemeProvider();
  const { i18n, language } = useLocalesProvider();
  const [isShowPayment, setIsShowPayment] = useState(false);

  const typeItem = useMemo(() => i18n._("events"), [i18n, language]);
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
        {eventsUserList.length === 0 ? (
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
          <ScrollView style={styles.containerElements}>
            {eventsUserList.map((event, index) => {
              const isStart = index === 0;
              return (
                <ItemSettingEvents
                  key={`events-settings-${event._id}`}
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
