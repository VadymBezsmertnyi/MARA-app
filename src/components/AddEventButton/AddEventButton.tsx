import React, { FunctionComponent, useMemo } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// styles
import { styles } from "./AddEventButton.styles";

type AddEventButtonProps = {
  onPress: () => void;
  accessibilityLabel?: string;
};

const IOS_BOTTOM = 100;
const ANDROID_BOTTOM = 180;
const CURRENT_BOTTOM = Platform.OS === "ios" ? IOS_BOTTOM : ANDROID_BOTTOM;

export const AddEventButton: FunctionComponent<AddEventButtonProps> = ({
  onPress,
  accessibilityLabel,
}) => {
  const { bottom } = useSafeAreaInsets();
  const offsetShadow: [x: string | number, y: string | number] = useMemo(
    () => [0, 3],
    []
  );
  const containerStyle = useMemo(
    () => [
      styles.createNewEvent,
      {
        bottom: bottom + CURRENT_BOTTOM,
      },
    ],
    [bottom]
  );

  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      style={containerStyle}
      onPress={onPress}
    >
      <Shadow stretch offset={offsetShadow} distance={4}>
        <BlurView
          intensity={Platform.OS === "android" ? 15 : 5}
          tint="light"
          style={styles.blurViewContainer}
        >
          <View style={styles.createNewEventWrapper}>
            <View style={styles.horizontal} />
            <View style={styles.vertical} />
          </View>
        </BlurView>
      </Shadow>
    </TouchableOpacity>
  );
};
