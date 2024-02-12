import React, { FunctionComponent, useMemo } from "react";
import { Image, Text } from "react-native";
import { Marker, Callout } from "react-native-maps";

// icons
import iconWorkshopMap from "../../../../../../assets/map/icon_workshop_map.png";

// styles
import { styles } from "./WorkshopMarker.styles";

type OtherMarkerProps = {
  longitude: number;
  latitude: number;
  markerSize: number;
  title: string;
};

export const WorkshopMarker: FunctionComponent<OtherMarkerProps> = ({
  longitude,
  latitude,
  markerSize,
  title,
}) => {
  const markerSizeStyles = useMemo(
    () => ({ width: markerSize + 20, height: markerSize + 20 }),
    [markerSize]
  );

  const coordinateMarker = useMemo(
    () => ({
      longitude,
      latitude,
    }),
    [longitude, latitude]
  );

  return (
    <Marker coordinate={coordinateMarker}>
      <Image source={iconWorkshopMap} style={markerSizeStyles} />
      <Callout
        style={styles.container}
        onPress={() => {
          console.log("Callout");
        }}
      >
        <Text>{title}:</Text>
        <Text>longitude: {longitude}</Text>
        <Text>latitude: {latitude}</Text>
      </Callout>
    </Marker>
  );
};
