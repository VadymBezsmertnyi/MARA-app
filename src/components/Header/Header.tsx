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
import { RouteProp, useRoute } from "@react-navigation/native";
import { z } from "zod";

// types
import { RootAllScreensParamList } from "../../navigators/Navigators.types";

// providers
import { themeContext } from "../../providers/ThemeProvider/ThemeProvider";
import { localesContext } from "../../../localization/localization.provider";
import { eventsContext } from "../../providers/EventsProvider/EventsProvider";

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
};

export const Header: FunctionComponent<HeaderStackProps> = ({
  title,
  leftElement = null,
  rightElement,
  onPressLeftElement,
  backgroundStyle,
}) => {
  const route = useRoute<RouteProp<RootAllScreensParamList>>();
  const navigation = useAllNavigation();
  const { theme } = useContext(themeContext);
  const { i18n } = useContext(localesContext);
  const { setIdDeleteEvent } = useContext(eventsContext);

  const backgroundStyles = useMemo(
    () => [styles.background, backgroundStyle],
    [backgroundStyle]
  );

  const idEditEvent = useMemo(() => {
    const currentParams = z
      .object({ eventId: z.number(), isUser: z.boolean() })
      .safeParse(route.params);
    if (currentParams.success) return currentParams.data.eventId;
    return null;
  }, [route]);

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

  const onDeleteEvent = () => {
    if (idEditEvent) setIdDeleteEvent(idEditEvent);
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
        {idEditEvent ? (
          <TouchableOpacity onPress={onDeleteEvent}>
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
