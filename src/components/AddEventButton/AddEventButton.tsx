import React, { FunctionComponent, useMemo } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { BlurView } from "expo-blur";

// styles
import { styles } from "./AddEventButton.styles";

type AddEventButtonProps = {
  onPress: () => void;
  accessibilityLabel?: string;
};

export const AddEventButton: FunctionComponent<AddEventButtonProps> = ({
  onPress,
  accessibilityLabel,
}) => {
  const offsetShadow: [x: string | number, y: string | number] = useMemo(
    () => [0, 3],
    []
  );

  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      style={styles.createNewEvent}
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
