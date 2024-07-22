import React, { FunctionComponent, useMemo } from "react";
import { Marker } from "react-native-maps";

// providers
import { useMapProvider } from "../../../../../providers/MapProvider/MapProvider";

// icons
import { IconAutoMap } from "../../../../../icons/components";

// styles
import colors from "../../../../../../styles/colors";

export const MeMarker: FunctionComponent = () => {
  const { location } = useMapProvider();
  const coordinateMarker = useMemo(
    () =>
      location?.longitude && location?.latitude
        ? {
            longitude: location.longitude,
            latitude: location.latitude,
          }
        : null,
    [location]
  );

  if (!coordinateMarker) return null;

  return (
    <Marker coordinate={coordinateMarker}>
      <IconAutoMap width={24} height={24} fill={colors.green} />
    </Marker>
  );
};
