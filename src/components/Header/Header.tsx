import React, { FunctionComponent, useContext, useMemo } from "react";
import {
  SafeAreaView,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Trans, t } from "@lingui/macro";

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
  onPressLeftElement?: () => void;
  backgroundStyle?: StyleProp<ViewStyle>;
  onRightDelete?: () => void;
};

export const Header: FunctionComponent<HeaderStackProps> = ({
  title,
  leftElement = null,
  rightElement,
  onPressLeftElement,
  backgroundStyle,
  onRightDelete,
}) => {
  const navigation = useAllNavigation();
  const { theme } = useContext(themeContext);
  const { i18n } = useContext(localesContext);

  const backgroundStyles = useMemo(
    () => [styles.background, backgroundStyle],
    [backgroundStyle]
  );

  const backTitleStyle = useMemo(
    () => [
      styles.titleButtonBack,
      theme === THEME_DARK ? { color: colors.white } : {},
    ],
    [theme]
  );

  const onBack = () => {
    if (onPressLeftElement) onPressLeftElement();
    else navigation.goBack();
  };

  return (
    <SafeAreaView style={backgroundStyles}>
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
        {onRightDelete ? (
          <TouchableOpacity onPress={onRightDelete}>
            <Text style={styles.titleButtonDeleteEvent}>
              <Trans>Delete</Trans>
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.wrapper}>{rightElement && rightElement}</View>
        )}
      </View>
    </SafeAreaView>
  );
};
