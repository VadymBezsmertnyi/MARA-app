import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { Trans } from "@lingui/macro";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// providers
import { localesContext } from "../../../../localization/localization.provider";
import { eventsContext } from "../../../providers/EventsProvider/EventsProvider";

// components
import { Input } from "../../../components/Input/Input";
import { InputSelectCity } from "../../../components/InputSelectCity/InputSelectCity";
import { ItemListEvents } from "../EventsMain/components/ItemListEvents/ItemListEvents";
import { IconSearchInput } from "../../../icons/components";
import { AddEventButton } from "../../../components/AddEventButton/AddEventButton";

// types
import { RootEventsScreensParamList } from "../../../navigators/Navigators.types";

// constants
import { PATHS_EVENTS_SCREENS } from "../../../navigators/useNavigator.constants";

// styles
import { styles } from "./EventsList.styles";
import { PlaceDbType } from "../../../providers/PlacesProvider/PlacesProvider.types";

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
  const [selectPlace, setSelectPlace] = useState<PlaceDbType | null>(null);

  const showCities = useMemo(() => {
    const placesAll = eventsList.map((event) => event.place_id);
    const places = placesAll.reduce((acc, place) => {
      if (!place) return acc;
      const isPlace = acc.find((item) => item._id === place._id);
      if (!isPlace) return [...acc, place];
      return acc;
    }, [] as PlaceDbType[]);

    return places;
  }, [eventsList]);
  const newDate = useMemo(() => new Date().getTime(), []);
  const showEventsList = useMemo(
    () =>
      eventsList
        .filter((event) =>
          params?.isOld
            ? event.date.finish < newDate
            : event.date.finish > newDate
        )
        .filter((event) =>
          valueSearch.length > 0
            ? event.title.toLowerCase().includes(valueSearch.toLowerCase())
            : true
        )
        .filter((event) =>
          selectPlace ? event.place_id?._id === selectPlace._id : true
        ),
    [eventsList, params, valueSearch]
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

  const onSelectCity = (place: PlaceDbType) => {
    if (place._id === selectPlace?._id) setSelectPlace(null);
    else setSelectPlace(place);
  };

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
      <InputSelectCity data={showCities} onSelect={onSelectCity} />
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
