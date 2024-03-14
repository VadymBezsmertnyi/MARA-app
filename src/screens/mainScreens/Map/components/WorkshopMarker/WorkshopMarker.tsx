import React, { FunctionComponent } from "react";
import { LocationObjectCoords } from "expo-location";
import { Marker, Callout } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { convertDistance, getDistance } from "geolib";

// types
import { WorkshopType } from "../../../../../providers/WorkshopsProvider/WorkshopsProvider.types";

// components
import { ComponentCalloutWorkshop } from "../ComponentCalloutWorkshop/ComponentCalloutWorkshop";

// constants
import {
  PATHS_MAIN_TABS,
  PATHS_WORKSHOP_SCREENS,
} from "../../../../../navigators/useNavigator.constants";

// icons
import { IconWorkshopMap } from "../../../../../icons/components";

type WorkshopMarkerProps = {
  workshop: WorkshopType;
  location: LocationObjectCoords | null;
};

export const WorkshopMarker: FunctionComponent<WorkshopMarkerProps> = ({
  workshop,
  location,
}) => {
  const navigation = useNavigation<
    NativeStackNavigationProp<{
      [PATHS_MAIN_TABS.workshops]?: {
        screen: string;
        params: { workshopId: number };
      };
    }>
  >();
  const distance =
    location && workshop.coordinates
      ? getDistance(location, {
          longitude: workshop.coordinates.longitude,
          latitude: workshop.coordinates.latitude,
        })
      : null;

  if (!workshop.coordinates) return null;
  return (
    <Marker identifier={`marker-workshop`} coordinate={workshop.coordinates}>
      <IconWorkshopMap width={44} height={44} />
      <Callout
        tooltip
        onPress={() => {
          navigation.navigate(PATHS_MAIN_TABS.workshops, {
            screen: PATHS_WORKSHOP_SCREENS.workshopItem,
            params: {
              workshopId: workshop.id,
            },
          });
        }}
      >
        <ComponentCalloutWorkshop
          imageSrc={workshop.images.length ? workshop.images[0].url : null}
          title={workshop.title}
          distance={distance ? convertDistance(distance, "km").toFixed() : null}
          isMoto={workshop.motoTypesWorks.length > 0}
          isAuto={workshop.autoTypesWorks.length > 0}
        />
      </Callout>
    </Marker>
  );
};
