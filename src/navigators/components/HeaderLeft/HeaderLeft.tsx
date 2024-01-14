import React, { FunctionComponent, useContext, useMemo } from "react";
import { Text, TouchableOpacity } from "react-native";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { Trans } from "@lingui/macro";

// components
import { ArrowLeft } from "../../../icons/components";

// providers
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";

// constants
import { THEME_DARK } from "../../../providers/ThemeProvider/ThemeProvider.const";

// styles
import { styles } from "./HeaderLeft.styles";
import colors from "../../../../styles/colors";

type HeaderLeftProps = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

export const HeaderLeft: FunctionComponent<HeaderLeftProps> = ({
  navigation,
}) => {
  const { theme } = useContext(themeContext);

  const titleStyle = useMemo(
    () => [
      styles.titleButtonBack,
      theme === THEME_DARK ? { color: "white" } : {},
    ],
    [theme]
  );

  return (
    <TouchableOpacity
      onPress={navigation.goBack}
      style={styles.containerButtonBack}
    >
      <ArrowLeft
        width={24}
        height={24}
        stroke={theme === THEME_DARK ? colors.white : colors.black}
        style={styles.iconButtonBack}
      />
      <Text style={titleStyle}>
        <Trans>Back</Trans>
      </Text>
    </TouchableOpacity>
  );
};
