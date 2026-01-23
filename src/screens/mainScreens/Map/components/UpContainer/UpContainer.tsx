import React, { FunctionComponent, useMemo } from "react";
import { Platform, View } from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// components
import { Menu } from "../Menu/Menu";

// styles
import { styles } from "./UpContainer.styles";

export const UpContainer: FunctionComponent = () => {
  const { top } = useSafeAreaInsets();

  const mainContainerStyles = useMemo(
    () => [styles.containerUp, { top: 12 + top }],
    [top]
  );

  return (
    <View style={mainContainerStyles}>
      {Platform.OS !== "android" ? (
        <BlurView tint="dark" style={styles.blurViewContainer} />
      ) : null}
      <View style={styles.container}>
        <Menu />
      </View>
    </View>
  );
};
