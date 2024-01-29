import React, { FunctionComponent } from "react";
import { TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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

  return (
    <View style={styles.shadow}>
      <TouchableOpacity onPress={toggleSearch} style={styles.container}>
        <BlurView intensity={5} tint="dark" style={styles.blurViewContainer} />
        <IconSearchMap width={26} height={26} fill={colors.chileanFireOrange} />
      </TouchableOpacity>
    </View>
  );
};
