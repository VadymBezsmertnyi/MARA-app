import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Trans } from "@lingui/macro";

// types
import { NearbySearchGoogleType } from "../../MapLocationModal.types";

// icons
import { IconPlusGradient } from "../../../../../../icons/components";

// styles
import { styles } from "./NotAddressLocation.styles";
import colors from "../../../../../../../styles/colors";

type NotAddressLocationProps = {
  address: NearbySearchGoogleType;
  isSelect: boolean;
  onEnterPlace: (value: boolean) => void;
};

export const NotAddressLocation: FunctionComponent<NotAddressLocationProps> = ({
  address,
  isSelect,
  onEnterPlace,
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
        onEnterPlace(true);
      }}
    >
      <View style={styles.titlesItemList}>
        <Text numberOfLines={1} style={styles.titleItemList}>
          <Trans>Add your address</Trans>
        </Text>
        <Text numberOfLines={1} style={styles.subTitleItemList}>
          {address.name}
        </Text>
      </View>
      <View style={styles.containerLocationItemList}>
        <IconPlusGradient width={30} height={30} />
      </View>
    </TouchableOpacity>
  );
};
