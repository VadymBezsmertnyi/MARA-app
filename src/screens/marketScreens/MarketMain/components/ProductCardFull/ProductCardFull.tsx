import React, { FunctionComponent, useContext, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import dayjs from "dayjs";

// types
import { ProductType } from "../../../../../providers/MarketProvider/MarketProvider.types";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";
import { paymentContext } from "../../../../../providers/PaymentProvider/PaymentProvider";

// components
import { ImageCache } from "../../../../../components/ImageCache/ImageCache";
import { TextLinearGradient } from "../../../../../components/TextLinearGradient/TextLinearGradient";

// images
import imageNoPhoto from "../../../../../../assets/noPhoto.png";

// icons
import {
  IconLikeGradient,
  IconLocationMarker,
} from "../../../../../icons/components";

// styles
import { styles } from "./ProductCardFull.styles";
import colors from "../../../../../../styles/colors";

type ProductCardFullProps = {
  product: ProductType;
  onSelect: (idProduct: number) => void;
};

export const ProductCardFull: FunctionComponent<ProductCardFullProps> = ({
  product,
  onSelect,
}) => {
  const { i18n } = useContext(localesContext);
  const { listCurrency } = useContext(paymentContext);
  const firstImage = useMemo(
    () => (product.images.length ? product.images[0] : null),
    [product.images]
  );
  const symbolCurrency =
    listCurrency.find((currency) => currency.code === product.codeCurrency)
      ?.symbol || i18n._("grn");

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onSelect(1);
      }}
    >
      {firstImage ? (
        <ImageCache imageSrc={firstImage.url} style={styles.image} />
      ) : (
        <ImageCache imageSrc={imageNoPhoto} style={styles.image} />
      )}
      <View style={styles.body}>
        <View style={styles.containerSubTitle}>
          <View style={styles.containerCity}>
            <IconLocationMarker
              width={14}
              height={13}
              fill={colors.grayCloudy}
            />
            <Text style={styles.subTitle}>{product.place.city}</Text>
          </View>
          <Text style={styles.subTitle}>
            {dayjs(product.updateAT).format("DD.MM.YYYY")}
          </Text>
        </View>
        <Text numberOfLines={2} style={styles.title}>
          {product.title}
        </Text>
        <TextLinearGradient title={`${product.price} ${symbolCurrency}`} />
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
