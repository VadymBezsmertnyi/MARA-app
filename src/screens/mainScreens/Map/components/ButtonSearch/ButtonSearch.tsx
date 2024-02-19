import React, { FunctionComponent, useMemo } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Shadow } from "react-native-shadow-2";

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

export const ButtonSearch: FunctionComponent<ButtonSearchProps> = ({
  navigation,
}) => {
  const toggleSearch = () => {
    navigation.navigate(PATHS_MAIN_TABS.workshops);
  };

  const offsetShadow: [x: string | number, y: string | number] = useMemo(
    () => [0, 3],
    []
  );

  return (
    <View style={styles.container}>
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
