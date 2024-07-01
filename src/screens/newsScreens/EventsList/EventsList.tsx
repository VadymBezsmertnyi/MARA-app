import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { Trans } from "@lingui/macro";

// providers
import { localesContext } from "../../../../localization/localization.provider";
import { eventsContext } from "../../../providers/EventsProvider/EventsProvider";

// constants
import { LIST_CITY } from "../DELETE_InputSelectCity.constants";
import { PATHS_EVENTS_SCREENS } from "../../../navigators/useNavigator.constants";

// components
import { Input } from "../../../components/Input/Input";
import { InputSelectCity } from "../../../components/InputSelectCity/InputSelectCity";
import { ItemListEvents } from "../EventsMain/components/ItemListEvents/ItemListEvents";
import { IconSearchInput } from "../../../icons/components";
import { AddEventButton } from "../../../components/AddEventButton/AddEventButton";

// types
import { RootEventsScreensParamList } from "../../../navigators/Navigators.types";

// styles
import { styles } from "./EventsList.styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ItemListEventsProps = {
  navigation: NativeStackNavigationProp<RootEventsScreensParamList>;
  route: RouteProp<
    RootEventsScreensParamList,
    keyof RootEventsScreensParamList
  >;
};

export const EventsList: FunctionComponent<ItemListEventsProps> = ({
  navigation,
  route,
}) => {
  const { params } = route;
  const { top, bottom } = useSafeAreaInsets();
  const { eventsList } = useContext(eventsContext);
  const { i18n } = useContext(localesContext);
  const [valueSearch, setValueSearch] = useState("");

  const newDate = useMemo(() => new Date().getTime(), []);
  const showEventsList = useMemo(
    () =>
      eventsList.filter((event) =>
        params?.isOld
          ? event.date.finish < newDate
          : event.date.finish > newDate
      ),
    [eventsList, params]
  );
  const containerStyles = useMemo(
    () => [
      styles.container,
      {
        paddingTop: top,
        paddingBottom: bottom,
      },
    ],
    [bottom]
  );

  const onSelectCity = () => {};

  return (
    <View style={containerStyles}>
      <Text style={styles.title}>
        {params?.isOld ? (
          <Trans>Past events:</Trans>
        ) : (
          <Trans>Upcoming events:</Trans>
        )}
      </Text>
      <Input
        value={valueSearch}
        onChange={setValueSearch}
        placeholder={i18n._("Enter the text to search")}
        InputIcon={<IconSearchInput width={26} height={26} />}
      />
      <InputSelectCity data={LIST_CITY} onSelect={onSelectCity} />
      <ScrollView contentContainerStyle={styles.containerList}>
        {showEventsList.map((eventItem) => (
          <ItemListEvents
            key={`event-${eventItem._id}`}
            item={eventItem}
            navigation={navigation}
          />
        ))}
      </ScrollView>
      <AddEventButton
        onPress={() => {
          navigation.navigate(PATHS_EVENTS_SCREENS.eventAdd);
        }}
      />
    </View>
  );
};
