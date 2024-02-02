import React, { FunctionComponent, useContext, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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

type ItemListEventsProps = {
  navigation: NativeStackNavigationProp<RootEventsScreensParamList>;
};

export const EventsList: FunctionComponent<ItemListEventsProps> = ({
  navigation,
}) => {
  const { eventsList } = useContext(eventsContext);
  const { i18n } = useContext(localesContext);
  const [valueSearch, setValueSearch] = useState("");

  const onSelectCity = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Trans>Upcoming events:</Trans>
      </Text>
      <Input
        value={valueSearch}
        onChange={setValueSearch}
        placeholder={i18n._("Enter the text to search")}
        InputIcon={<IconSearchInput width={26} height={26} />}
      />
      <InputSelectCity data={LIST_CITY} onSelect={onSelectCity} />
      <ScrollView contentContainerStyle={styles.containerList}>
        {eventsList.map((eventItem) => (
          <ItemListEvents
            key={`event-${eventItem.id}`}
            item={eventItem}
            navigation={navigation}
          />
        ))}
      </ScrollView>
      <AddEventButton
        onPress={() => {
          navigation.navigate(PATHS_EVENTS_SCREENS.addEvent);
        }}
      />
    </View>
  );
};
