import React, { FunctionComponent, useContext } from "react";
import { Text, View } from "react-native";
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
};

export const DistanceCard: FunctionComponent<DistanceCardType> = ({
  distance,
}) => {
  const { i18n } = useContext(localesContext);

  return (
    <View style={styles.container}>
      <IconLocationMarker
        width={20}
        height={20}
        fill={colors.californiaOrange}
      />
      <Text numberOfLines={2} style={styles.title}>
        {distance
          ? `${convertDistance(distance, "km").toFixed(2)} км`
          : i18n._(`Not enabled location`)}
      </Text>
    </View>
  );
};
