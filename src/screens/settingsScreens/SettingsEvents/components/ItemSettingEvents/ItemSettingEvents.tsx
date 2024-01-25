import React, { FunctionComponent, useMemo } from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// types
import { EventType } from "../../../../../providers/EventsProvider/EventsProvider.types";

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
  event: EventType;
  isStart: boolean;
};

export const ItemSettingEvents: FunctionComponent<ItemSettingEventsProps> = ({
  event,
  isStart,
}) => {
  const navigation = useAllNavigation();
  const firstImage = event.images[0] ? event.images[0].url : null;
  const containerStyles: StyleProp<ViewStyle> = useMemo(
    () => [styles.container, { marginTop: isStart ? 0 : 12 }],
    [isStart]
  );

  const onPressChange = () => {
    navigation.navigate(PATHS_SETTINGS_SCREENS.settingsChangeEvent, {
      eventId: event.id,
      isUser: false,
    });
  };

  return (
    <View style={containerStyles}>
      <View style={styles.containerLeft}>
        {firstImage ? (
          <ImageCache imageSrc={firstImage} style={styles.image} />
        ) : null}
        <View style={styles.containerInfo}>
          <Text style={styles.title}>{event.title}</Text>
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
