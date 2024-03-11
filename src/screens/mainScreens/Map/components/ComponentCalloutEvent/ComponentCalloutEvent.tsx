import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import { Trans } from "@lingui/macro";
import dayjs from "dayjs";

// components
import { LinearGradientCustom } from "../../../../../components/LinearGradientCustom/LinearGradientCustom";

// styles
import { styles } from "./ComponentCalloutEvent.styles";

type ComponentCalloutEventProps = {
  title: string;
  distance: string | null;
  date: number;
};

export const ComponentCalloutEvent: FunctionComponent<
  ComponentCalloutEventProps
> = ({ title, distance, date }) => (
  <View style={styles.container}>
    <LinearGradientCustom style={styles.linearGradient}>
      <View style={styles.containerMain}>
        <View style={styles.containerTitle}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>
        <View style={styles.containerSubTitles}>
          <Text style={styles.title}>
            <Trans>{distance} km</Trans>
          </Text>
          <Text style={styles.titleDate}>
            {dayjs(date).format("DD.MM.YYYY")}
          </Text>
        </View>
      </View>
    </LinearGradientCustom>
    <LinearGradientCustom style={styles.containerArrow}>
      <View style={styles.bodyArrow} />
    </LinearGradientCustom>
    <View style={styles.containerEmpty} />
  </View>
);
