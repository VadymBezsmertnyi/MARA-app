import React, { FunctionComponent, useMemo } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Shadow } from "react-native-shadow-2";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// types
import { RootMainTabsParamList } from "../../../../../navigators/Navigators.types";

// components
import { IconSearchMap } from "../../../../../icons/components";

// constants
import { PATHS_MAIN_TABS } from "../../../../../navigators/useNavigator.constants";

// styles
import { styles } from "./ButtonSearch.styles";
import colors from "../../../../../../styles/colors";

type ButtonSearchProps = {
  navigation: NativeStackNavigationProp<RootMainTabsParamList>;
};

const IOS_BOTTOM = 100;
const ANDROID_BOTTOM = 180;
const CURRENT_BOTTOM = Platform.OS === "ios" ? IOS_BOTTOM : ANDROID_BOTTOM;

export const ButtonSearch: FunctionComponent<ButtonSearchProps> = ({
  navigation,
}) => {
  const { bottom } = useSafeAreaInsets();
  const toggleSearch = () => {
    navigation.navigate(PATHS_MAIN_TABS.workshops);
  };

  const offsetShadow: [x: string | number, y: string | number] = useMemo(
    () => [0, 3],
    []
  );
  const containerStyle = useMemo(
    () => [
      styles.container,
      {
        bottom: bottom + CURRENT_BOTTOM,
      },
    ],
    [bottom]
  );

  return (
    <View style={containerStyle}>
      <Shadow stretch distance={4} offset={offsetShadow}>
        <BlurView
          intensity={Platform.OS === "android" ? 15 : 5}
          tint="light"
          style={styles.blurViewContainer}
        >
          <View style={styles.button}>
            <TouchableOpacity onPress={toggleSearch}>
              <IconSearchMap
                width={26}
                height={26}
                fill={colors.chileanFireOrange}
              />
            </TouchableOpacity>
          </View>
        </BlurView>
      </Shadow>
    </View>
  );
};
