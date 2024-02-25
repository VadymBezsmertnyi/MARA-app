import React, { FunctionComponent, useContext, useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Trans } from "@lingui/macro";

// types
import { RootEventsScreensParamList } from "../../../navigators/Navigators.types";

// providers
import { eventsContext } from "../../../providers/EventsProvider/EventsProvider";
import { localesContext } from "../../../../localization/localization.provider";

// components
import { ItemListEvents } from "./components/ItemListEvents/ItemListEvents";
import { ImageCache } from "../../../components/ImageCache/ImageCache";
import { AddEventButton } from "../../../components/AddEventButton/AddEventButton";

// icons
import { ArrowLongRight } from "../../../icons/components";

// images
import notEventsImage from "../../../../assets/newsEvents/notEvents.jpeg";
import notNewsImage from "../../../../assets/newsEvents/notNews.jpeg";

// constants
import { PATHS_EVENTS_SCREENS } from "../../../navigators/useNavigator.constants";

// styles
import colors from "../../../../styles/colors";
import { styles } from "./EventsMain.styles";

type EventsMainProps = {
  navigation: NativeStackNavigationProp<RootEventsScreensParamList>;
};

export const EventsMain: FunctionComponent<EventsMainProps> = ({
  navigation,
}) => {
  const { i18n } = useContext(localesContext);
  const { eventsList } = useContext(eventsContext);
  const timeNow = useMemo(() => new Date().getTime(), []);
  const eventsWill = useMemo(
    () => eventsList.filter((event) => event.date.finish > timeNow),
    [eventsList, timeNow]
  );
  const eventsOld = useMemo(
    () => eventsList.filter((event) => event.date.finish < timeNow),
    [eventsList, timeNow]
  );

  const onToEventsList = () => {
    navigation.navigate(PATHS_EVENTS_SCREENS.eventsList);
  };
  const onToOldNewsList = () => {
    navigation.navigate(PATHS_EVENTS_SCREENS.eventsList, { isOld: true });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.containerPart}>
            <Text style={styles.titleType}>
              <Trans>Upcoming events:</Trans>
            </Text>
            <View style={styles.containerEvents}>
              {eventsWill.length ? (
                eventsWill
                  .slice(0, 3)
                  .map((eventItem) => (
                    <ItemListEvents
                      key={`event-${eventItem.id}`}
                      item={eventItem}
                      navigation={navigation}
                    />
                  ))
              ) : (
                <View style={styles.containerNotList}>
                  <ImageCache
                    contentFit="contain"
                    style={styles.imageNotElements}
                    imageSrc={notEventsImage}
                  />
                  <Text style={styles.titleNotList}>
                    <Trans>Sorry, there are no upcoming events</Trans>
                  </Text>
                </View>
              )}
            </View>
            {eventsWill.length ? (
              <TouchableOpacity
                accessibilityLabel={i18n._("Press show more events")}
                style={styles.buttonMore}
                onPress={onToEventsList}
              >
                <Text style={styles.titleButtonMore}>
                  <Trans>More events</Trans>
                </Text>
                <ArrowLongRight
                  width={40}
                  height={12}
                  fill={colors.blueTufts}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.containerPart}>
            <Text style={styles.titleType}>
              <Trans>Past events:</Trans>
            </Text>
            <View style={styles.containerEvents}>
              {eventsOld.length ? (
                eventsOld
                  .slice(0, 3)
                  .map((itemOld) => (
                    <ItemListEvents
                      key={`event-${itemOld.id}`}
                      item={itemOld}
                      navigation={navigation}
                    />
                  ))
              ) : (
                <View style={styles.containerNotList}>
                  <ImageCache
                    contentFit="contain"
                    style={styles.imageNotElements}
                    imageSrc={notNewsImage}
                  />
                  <Text style={styles.titleNotList}>
                    <Trans>No events have passed</Trans>
                  </Text>
                </View>
              )}
            </View>
            {eventsOld.length ? (
              <TouchableOpacity
                style={styles.buttonMore}
                onPress={onToOldNewsList}
              >
                <Text style={styles.titleButtonMore}>
                  <Trans>More events</Trans>
                </Text>
                <ArrowLongRight
                  width={40}
                  height={12}
                  fill={colors.blueTufts}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ScrollView>
      <AddEventButton
        onPress={() => {
          navigation.navigate(PATHS_EVENTS_SCREENS.eventAdd);
        }}
        accessibilityLabel={i18n._("Add event")}
      />
    </>
  );
};
