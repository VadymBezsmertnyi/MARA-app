import React, { FunctionComponent, useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";

// components
import { ImageCache } from "../../../../../components/ImageCache/ImageCache";
import { TextLinearGradient } from "../../../../../components/TextLinearGradient/TextLinearGradient";

// images
import DELETE_IMAGE from "./DELETE.png";

// icons
import {
  IconLikeGradient,
  IconLocationMarker,
} from "../../../../../icons/components";

// styles
import { styles } from "./ProductCardSmall.styles";
import colors from "../../../../../../styles/colors";

type ProductCardFullProps = {
  onSelect: (idProduct: number) => void;
};

export const ProductCardSmall: FunctionComponent<ProductCardFullProps> = ({
  onSelect,
}) => {
  const { i18n } = useContext(localesContext);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onSelect(1);
      }}
    >
      <ImageCache imageSrc={DELETE_IMAGE} style={styles.image} />
      <View style={styles.body}>
        <Text numberOfLines={2} style={styles.title}>
          Дууууууууже довга назва товару який продаєтьсДууууууууже довга назва
          товару який продаєтьс
        </Text>
        <View style={styles.containerCity}>
          <IconLocationMarker width={14} height={13} fill={colors.grayCloudy} />
          <Text style={styles.subTitle}>City</Text>
        </View>
        <TextLinearGradient
          title={i18n._("{price} grn", {
            price: (200000).toLocaleString("uk"),
          })}
        />
        <View style={styles.containerSubTitle}>
          <Text style={styles.subTitle}>DD.MM.YYYY</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log("Like product");
        }}
        style={styles.containerLike}
      >
        <IconLikeGradient width={38} height={20} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
