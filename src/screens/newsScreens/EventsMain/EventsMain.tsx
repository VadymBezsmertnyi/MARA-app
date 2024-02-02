import React, { FunctionComponent, useContext, useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Trans } from "@lingui/macro";

// types
import { RootEventsScreensParamList } from "../../../navigators/Navigators.types";

// providers
import { eventsContext } from "../../../providers/EventsProvider/EventsProvider";

// components
import { ItemListEvents } from "./components/ItemListEvents/ItemListEvents";
import { ItemListNews } from "./components/ItemListNews/ItemListNews";
import { ImageCache } from "../../../components/ImageCache/ImageCache";

// icons
import { ArrowLongRight } from "../../../icons/components";

// images
import notEventsImage from "../../../../assets/newsEvents/notEvents.jpeg";
import notNewsImage from "../../../../assets/newsEvents/notNews.jpeg";

// constants
import { DEFAULT_LIST_NEWS } from "../DELETE_newsScreens.constants";
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
  const { eventsList } = useContext(eventsContext);
  const startDateEvents = useMemo(() => eventsList.slice(0, 3), [eventsList]);
  const onToEventsList = () => {
    navigation.navigate(PATHS_EVENTS_SCREENS.eventsList);
  };
  const onToNewsList = () => {
    navigation.navigate(PATHS_EVENTS_SCREENS.newsList);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerPart}>
        <Text style={styles.titleType}>
          <Trans>Upcoming events:</Trans>
        </Text>
        <View style={styles.containerEvents}>
          {startDateEvents.length ? (
            startDateEvents.map((eventItem) => (
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
        {startDateEvents.length ? (
          <TouchableOpacity style={styles.buttonMore} onPress={onToEventsList}>
            <Text style={styles.titleButtonMore}>
              <Trans>More events</Trans>
            </Text>
            <ArrowLongRight width={40} height={12} fill={colors.blueTufts} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.containerPart}>
        <Text style={styles.titleType}>
          <Trans>Latest news:</Trans>
        </Text>
        <View style={styles.containerEvents}>
          {DEFAULT_LIST_NEWS.length ? (
            DEFAULT_LIST_NEWS.map((newItem) => (
              <ItemListNews
                key={`new-${newItem.id}`}
                newId={newItem.id}
                title={newItem.title}
                date={newItem.data}
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
                <Trans>Sorry, there is no news</Trans>
              </Text>
            </View>
          )}
        </View>
        {DEFAULT_LIST_NEWS.length ? (
          <TouchableOpacity style={styles.buttonMore} onPress={onToNewsList}>
            <Text style={styles.titleButtonMore}>
              <Trans>More news</Trans>
            </Text>
            <ArrowLongRight width={40} height={12} fill={colors.blueTufts} />
          </TouchableOpacity>
        ) : null}
      </View>
    </ScrollView>
  );
};
