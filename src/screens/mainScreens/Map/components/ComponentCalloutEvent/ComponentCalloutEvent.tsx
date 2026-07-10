import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import dayjs from "dayjs";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// components
import { LinearGradientCustom } from "../../../../../components/LinearGradientCustom/LinearGradientCustom";

// styles
import { styles } from "./ComponentCalloutEvent.styles";

type ComponentCalloutEventProps = {
  title: string;
  distance: string | null;
  date: number | null;
};

export const ComponentCalloutEvent: FunctionComponent<
  ComponentCalloutEventProps
> = ({ title, distance, date }) => {
  const { i18n } = useLocalesProvider();

  return (
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
              {i18n._("{distance} km", { distance: distance ?? "0" })}
            </Text>
            <Text style={styles.titleDate}>
              {date ? dayjs(date).format("DD.MM.YYYY") : i18n._("No date")}
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
};
