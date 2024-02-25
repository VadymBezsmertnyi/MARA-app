import React, { FunctionComponent, useContext, useMemo } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { convertDistance } from "geolib";

// providers
import { localesContext } from "../../../localization/localization.provider";

// components
import { IconLocationMarker } from "../../icons/components";

// styles
import { styles } from "./DistanceCard.styles";
import colors from "../../../styles/colors";

type DistanceCardType = {
  distance: number | null;
  numberOfLines?: number;
  containerStyle?: StyleProp<ViewStyle>;
};

export const DistanceCard: FunctionComponent<DistanceCardType> = ({
  distance,
  numberOfLines = 2,
  containerStyle,
}) => {
  const { i18n } = useContext(localesContext);
  const containerStyles = useMemo(
    () => [styles.container, containerStyle],
    [containerStyle]
  );

  return (
    <View style={containerStyles}>
      <IconLocationMarker
        width={20}
        height={20}
        fill={colors.californiaOrange}
      />
      <Text numberOfLines={numberOfLines} style={styles.title}>
        {distance !== null
          ? `${convertDistance(distance, "km").toFixed(2)} ${i18n._("km")}`
          : i18n._(`Not enabled location`)}
      </Text>
    </View>
  );
};
