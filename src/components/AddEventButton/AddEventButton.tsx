import React, { FunctionComponent, useMemo } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// styles
import { styles } from "./AddEventButton.styles";

type AddEventButtonProps = {
  disabled?: boolean;
  onPress: () => void;
  accessibilityLabel?: string;
};

const CURRENT_BOTTOM = 80;

export const AddEventButton: FunctionComponent<AddEventButtonProps> = ({
  disabled,
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
        opacity: disabled ? 0 : 1,
      },
    ],
    [bottom, disabled]
  );

  return (
    <TouchableOpacity
      disabled={disabled}
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
