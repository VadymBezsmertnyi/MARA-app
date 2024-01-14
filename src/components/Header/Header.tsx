import React, { FunctionComponent, useContext, useMemo } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { t } from "@lingui/macro";

// providers
import { themeContext } from "../../providers/ThemeProvider/ThemeProvider";
import { localesContext } from "../../../localization/localization.provider";

// icons
import { ArrowLeft } from "../../icons/components";

// constants
import { THEME_DARK } from "../../providers/ThemeProvider/ThemeProvider.const";

// hooks
import { useAllNavigation } from "../../navigators/Navigators.helps";

// styles
import { styles } from "./Header.styles";
import colors from "../../../styles/colors";

type HeaderStackProps = {
  title: string;
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
};

export const Header: FunctionComponent<HeaderStackProps> = ({
  title,
  leftElement = null,
  rightElement,
}) => {
  const navigation = useAllNavigation();
  const { theme } = useContext(themeContext);
  const { i18n } = useContext(localesContext);

  const onBack = () => {
    navigation.goBack();
  };

  const backTitleStyle = useMemo(
    () => [
      styles.titleButtonBack,
      theme === THEME_DARK ? { color: colors.white } : {},
    ],
    [theme]
  );

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onBack} style={styles.containerButtonBack}>
          {leftElement || (
            <>
              <ArrowLeft
                width={24}
                height={24}
                stroke={theme === THEME_DARK ? colors.white : colors.black}
                style={styles.iconButtonBack}
              />
              <Text style={backTitleStyle}>{t(i18n)`Back`}</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.wrapper}>{rightElement && rightElement}</View>
      </View>
    </SafeAreaView>
  );
};
