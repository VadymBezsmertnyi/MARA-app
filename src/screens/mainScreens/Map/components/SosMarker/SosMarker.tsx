import React, { FunctionComponent, useMemo } from "react";
import { Linking, Text } from "react-native";
import { Callout, Marker } from "react-native-maps";
import dayjs from "dayjs";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

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
  const { i18n } = useLocalesProvider();
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

  const onPressTelegram = async () => {
    if (telegram) {
      const isAt = telegram.includes("@");
      const currentTelegramName = isAt
        ? telegram.slice(1, telegram.length)
        : telegram;
      const appTelegramURI = `tg://resolve?domain=${currentTelegramName}`;
      const webTelegramURI = `https://t.me/${currentTelegramName}`;
      const isTelegram = await Linking.canOpenURL(appTelegramURI);

      if (isTelegram) await Linking.openURL(appTelegramURI);
      else await Linking.openURL(webTelegramURI);
    }
  };

  const onCall = async () => {
    if (phoneNumber) {
      const phoneURI = `tel:${phoneNumber.replaceAll(" ", "")}`;
      const isPhone = await Linking.canOpenURL(phoneURI);

      if (isPhone) Linking.openURL(phoneURI);
      else await onPressTelegram();
    } else await onPressTelegram();
  };

  return (
    <Marker coordinate={coordinateMarker}>
      <IconSosMap width={32} height={32} />
      <Callout style={styles.container} onPress={onCall}>
        {telegram ? (
          <>
            <Text style={styles.title}>Telegram:</Text>
            <Text style={styles.title}>{telegram}</Text>
          </>
        ) : null}
        {phoneNumber ? (
          <>
            <Text style={styles.title}>{i18n._("Phone number")}:</Text>
            <Text style={styles.title}>{phoneNumber}</Text>
          </>
        ) : null}
        {description ? (
          <>
            <Text style={styles.title}>{i18n._("Description")}:</Text>
            <Text style={styles.title}>{description}</Text>
          </>
        ) : null}
        <Text style={styles.title}>
          {i18n._("Last update")}: {dayjs(timeUpdate).format("mm:ss")}
        </Text>
      </Callout>
    </Marker>
  );
};
