import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { convertDistance } from "geolib";

// types
import { NearbySearchGoogleType } from "../../MapLocationModal.types";

// icons
import { IconLocationMarkerGradient } from "../../../../../../icons/components";

// styles
import { styles } from "./AddressLocation.styles";
import colors from "../../../../../../../styles/colors";

type AddressLocationProps = {
  address: NearbySearchGoogleType;
  distance: number | null;
  isSelect: boolean;
  getDetailPlace: (place_id: string) => void;
};

export const AddressLocation: FunctionComponent<AddressLocationProps> = ({
  address,
  distance,
  isSelect,
  getDetailPlace,
}) => {
  const getStyle = () => [
    styles.itemList,
    isSelect && { borderColor: colors.chileanFireOrange },
  ];

  return (
    <TouchableOpacity
      key={`address-${address.place_id}`}
      style={getStyle()}
      onPress={() => {
        getDetailPlace(address.place_id);
      }}
    >
      <View style={styles.titlesItemList}>
        <Text numberOfLines={1} style={styles.titleItemList}>
          {address.vicinity}
        </Text>
        <Text numberOfLines={1} style={styles.subTitleItemList}>
          {address.name}
        </Text>
      </View>
      <View style={styles.containerLocationItemList}>
        <IconLocationMarkerGradient width={12} height={12} />
        {distance ? (
          <Text style={styles.titleLocationItemList}>
            {convertDistance(distance, "km").toFixed(2)} км
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
