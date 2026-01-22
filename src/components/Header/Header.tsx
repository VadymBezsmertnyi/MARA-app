import React, { FunctionComponent, useMemo, useState } from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// providers
import { useThemeProvider } from "../../providers/ThemeProvider/ThemeProvider";
import { useLocalesProvider } from "../../../localization/localization.provider";

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
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  onPressLeftElement?: () => void;
  backgroundStyle?: StyleProp<ViewStyle>;
  onRightDelete?: () => void;
  isShowLeft?: boolean;
  isShowRight?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  rightStyle?: StyleProp<ViewStyle>;
};

export const Header: FunctionComponent<HeaderStackProps> = ({
  title,
  leftElement = null,
  rightElement,
  onPressLeftElement,
  backgroundStyle,
  onRightDelete,
  isShowLeft = true,
  isShowRight = true,
  containerStyle,
  rightStyle,
}) => {
  const navigation = useAllNavigation();
  const { theme, heightStatusBar } = useThemeProvider();
  const { i18n } = useLocalesProvider();
  const [leftWidth, setLeftWidth] = useState(0);
  const [rightWidth, setRightWidth] = useState(0);

  const backgroundStyles = useMemo(
    () => [styles.background, { paddingTop: heightStatusBar }, backgroundStyle],
    [backgroundStyle, heightStatusBar]
  );

  const containerStyles = useMemo(
    () => [styles.container, containerStyle],
    [containerStyle]
  );

  const backTitleStyle = useMemo(
    () => [
      styles.titleButtonBack,
      theme === THEME_DARK ? { color: colors.white } : {},
    ],
    [theme]
  );

  const rightStyles = useMemo(
    () => [styles.containerRight, rightStyle],
    [rightStyle]
  );

  const onBack = () => {
    if (onPressLeftElement) onPressLeftElement();
    else navigation.goBack();
  };

  return (
    <View style={backgroundStyles}>
      <View style={containerStyles}>
        <View
          style={{
            width: "30%",
          }}
        >
          {isShowLeft ? (
            <TouchableOpacity
              disabled={Boolean(leftElement)}
              onPress={onBack}
              style={styles.containerButtonBack}
              onLayout={(event) => setLeftWidth(event.nativeEvent.layout.width)}
            >
              {leftElement || (
                <>
                  <ArrowLeft
                    width={24}
                    height={24}
                    stroke={theme === THEME_DARK ? colors.white : colors.black}
                    style={styles.iconButtonBack}
                  />
                  <Text style={backTitleStyle}>{i18n._("Back")}</Text>
                </>
              )}
            </TouchableOpacity>
          ) : null}
        </View>

        <View
          style={{
            width: "40%",
          }}
        >
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>
        <View
          style={{
            width: "30%",
          }}
        >
          {onRightDelete ? (
            <TouchableOpacity
              onPress={onRightDelete}
              onLayout={(event) =>
                setRightWidth(event.nativeEvent.layout.width)
              }
              style={{
                alignItems: "flex-end",
              }}
            >
              <Text style={styles.titleButtonDeleteEvent}>
                {i18n._("Delete")}
              </Text>
            </TouchableOpacity>
          ) : isShowRight ? (
            <View
              style={[
                rightStyles,
                {
                  width: rightWidth > leftWidth ? rightWidth : leftWidth,
                },
              ]}
              onLayout={(event) =>
                setRightWidth(event.nativeEvent.layout.width)
              }
            >
              {rightElement && rightElement}
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};
