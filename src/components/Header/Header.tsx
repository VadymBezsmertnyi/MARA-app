import React, { FunctionComponent, useContext, useMemo } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Trans, t } from "@lingui/macro";
import { RouteProp, useRoute } from "@react-navigation/native";
import { z } from "zod";

// types
import { RootAllScreensParamList } from "../../navigators/Navigators.types";

// providers
import { themeContext } from "../../providers/ThemeProvider/ThemeProvider";
import { localesContext } from "../../../localization/localization.provider";
import { eventsContext } from "../../providers/EventsProvider/EventsProvider";
import { modalDeleteContext } from "../../providers/ModalDeleteProvider/ModalDeleteProvider";

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
  const route = useRoute<RouteProp<RootAllScreensParamList>>();
  const navigation = useAllNavigation();
  const { theme } = useContext(themeContext);
  const { i18n } = useContext(localesContext);
  const { deleteEvent } = useContext(eventsContext);
  const { onShowModal } = useContext(modalDeleteContext);
  const idEditEvent = useMemo(() => {
    const currentParams = z
      .object({ eventId: z.number() })
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
    navigation.goBack();
  };

  const onDeleteEvent = () => {
    if (idEditEvent) deleteEvent(idEditEvent, "user");
    navigation.goBack();
  };

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
        {idEditEvent ? (
          <TouchableOpacity
            onPress={() => {
              onShowModal(() => onDeleteEvent);
            }}
          >
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
