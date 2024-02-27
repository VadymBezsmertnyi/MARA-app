import React, { FunctionComponent, useContext, useMemo } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";
import { Trans } from "@lingui/macro";

// providers
import { mapContext } from "../../../../../providers/MapProvider/MapProvider";
import { userContext } from "../../../../../providers/UserProvider/UserProvider";

// components
import { Menu } from "../Menu/Menu";

// styles
import { styles } from "./UpContainer.styles";

const INTENSITY = 5;

export const UpContainer: FunctionComponent = () => {
  const { userData } = useContext(userContext);
  const { usersSos } = useContext(mapContext);
  const distance = useMemo(
    () => userData?.settingsSos.radiusKm || 5,
    [userData?.settingsSos.radiusKm]
  );
  const isSos = useMemo(
    () => (usersSos ? usersSos.length > 0 : false),
    [usersSos, userData?.id]
  );

  const containerStyles = useMemo(
    () => [styles.container, isSos && styles.sosContainer],
    [isSos]
  );

  const pressSosLine = () => {
    console.log("pressSosLine");
  };

  return (
    <View style={styles.containerUp}>
      {Platform.OS !== "android" ? (
        <BlurView
          intensity={isSos ? INTENSITY : 0}
          tint="dark"
          style={styles.blurViewContainer}
        />
      ) : null}
      <View style={containerStyles}>
        <Menu />
        {isSos ? (
          <TouchableOpacity onPress={pressSosLine} style={styles.buttonSos}>
            <Text style={styles.titleButtonSos}>
              <Trans>Someone needs help within a {distance} km radius</Trans>
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
