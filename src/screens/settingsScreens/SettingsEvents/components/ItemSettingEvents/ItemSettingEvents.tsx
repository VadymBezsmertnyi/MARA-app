import React, { FunctionComponent, useMemo } from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// types
import { TEvent } from "../../../../../storeRedux/apis/events/events.types";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// components
import { ImageCache } from "../../../../../components/ImageCache/ImageCache";

// helps
import { formatDateFromUnixTimestamp } from "../../../../../helps/helps";
import { useAllNavigation } from "../../../../../navigators/Navigators.helps";

// constants
import { PATHS_SETTINGS_SCREENS } from "../../../../../navigators/useNavigator.constants";

// icons
import { IconPencilGradient } from "../../../../../icons/components";

// styles
import { styles } from "./ItemSettingEvents.styles";

type ItemSettingEventsProps = {
  event: TEvent;
  isStart: boolean;
};

export const ItemSettingEvents: FunctionComponent<ItemSettingEventsProps> = ({
  event,
  isStart,
}) => {
  const { i18n } = useLocalesProvider();
  const navigation = useAllNavigation();
  const firstImage = event.imageFiles[0] ? event.imageFiles[0].url : null;
  const containerStyles: StyleProp<ViewStyle> = useMemo(
    () => [styles.container, { marginTop: isStart ? 0 : 12 }],
    [isStart]
  );

  const onPressChange = () => {
    navigation.navigate(PATHS_SETTINGS_SCREENS.settingsEventChange, {
      eventId: event._id,
    });
  };

  return (
    <View style={containerStyles}>
      <View style={styles.containerLeft}>
        {firstImage ? (
          <ImageCache imageSrc={firstImage} style={styles.image} />
        ) : null}
        <View style={styles.containerInfo}>
          <Text numberOfLines={1} style={styles.title}>
            {event.title}
          </Text>
          {event.verification && (
            <View style={styles.containerStatus}>
              <View
                style={[
                  styles.statusBadge,
                  event.verification.status === "pending" &&
                    styles.statusPending,
                  event.verification.status === "verified" &&
                    styles.statusVerified,
                  event.verification.status === "rejected" &&
                    styles.statusRejected,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    event.verification.status === "pending" &&
                      styles.statusTextPending,
                    event.verification.status === "verified" &&
                      styles.statusTextVerified,
                    event.verification.status === "rejected" &&
                      styles.statusTextRejected,
                  ]}
                >
                  {event.verification.status === "pending" &&
                    i18n._("Under review")}
                  {event.verification.status === "verified" &&
                    i18n._("Verified")}
                  {event.verification.status === "rejected" &&
                    i18n._("Rejected")}
                </Text>
              </View>
            </View>
          )}
          {event.verification?.status === "rejected" &&
            event.verification.reason && (
              <Text style={styles.reasonText} numberOfLines={2}>
                {event.verification.reason}
              </Text>
            )}
          <Text style={styles.data}>
            {formatDateFromUnixTimestamp(event.date.start)}
          </Text>
        </View>
      </View>
      <View style={styles.containerRight}>
        <TouchableOpacity onPress={onPressChange}>
          <IconPencilGradient width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
