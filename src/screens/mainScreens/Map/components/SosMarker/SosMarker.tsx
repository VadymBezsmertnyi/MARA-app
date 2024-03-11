import React, { FunctionComponent, useMemo } from "react";
import { Text } from "react-native";
import { Callout, Marker } from "react-native-maps";
import { Trans } from "@lingui/macro";
import dayjs from "dayjs";

// icons
import { IconSosMap } from "../../../../../icons/components";

// styles
import { styles } from "./SosMarker.styles";

type SosMarkerProps = {
  longitude: number;
  latitude: number;
  phoneNumber: string;
  telegram: string;
  description: string;
  date: number;
};

export const SosMarker: FunctionComponent<SosMarkerProps> = ({
  longitude,
  latitude,
  phoneNumber,
  telegram,
  description,
  date,
}) => {
  const coordinateMarker = useMemo(
    () => ({
      longitude,
      latitude,
    }),
    [longitude, latitude]
  );
  const dateNow = dayjs().valueOf();
  const timeUpdate = useMemo(
    () => (dateNow > date ? dateNow - date : null),
    [date, dateNow]
  );

  return (
    <Marker coordinate={coordinateMarker}>
      <IconSosMap width={32} height={32} />
      <Callout style={styles.container}>
        <Text>Telegram: {telegram}</Text>
        <Text>
          <Trans>Phone number</Trans>: {phoneNumber}
        </Text>
        <Text>{description}</Text>
        <Text>
          <Trans>Last update</Trans>: {dayjs(timeUpdate).format("mm:ss")}
        </Text>
      </Callout>
    </Marker>
  );
};
