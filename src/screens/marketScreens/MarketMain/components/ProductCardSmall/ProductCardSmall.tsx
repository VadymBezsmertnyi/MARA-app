import React, { FunctionComponent, useContext, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import dayjs from "dayjs";

// types
import { ProductType } from "../../../../../providers/MarketProvider/MarketProvider.types";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";
import { paymentContext } from "../../../../../providers/PaymentProvider/PaymentProvider";
import { marketContext } from "../../../../../providers/MarketProvider/MarketProvider";
import { userContext } from "../../../../../providers/UserProvider/UserProvider";

// components
import { ImageCache } from "../../../../../components/ImageCache/ImageCache";
import { TextLinearGradient } from "../../../../../components/TextLinearGradient/TextLinearGradient";

// images
import imageNoPhoto from "../../../../../../assets/noPhoto.png";

// icons
import {
  IconLikeFullGradient,
  IconLikeGradient,
  IconLocationMarker,
} from "../../../../../icons/components";

// styles
import { styles } from "./ProductCardSmall.styles";
import colors from "../../../../../../styles/colors";

type ProductCardFullProps = {
  product: ProductType;
  onSelect: (idProduct: number) => void;
};

export const ProductCardSmall: FunctionComponent<ProductCardFullProps> = ({
  product,
  onSelect,
}) => {
  const { i18n } = useContext(localesContext);
  const { listCurrency } = useContext(paymentContext);
  const { changeProduct } = useContext(marketContext);
  const { userData } = useContext(userContext);
  const isLike = useMemo(
    () => (userData ? product.likeUserIds.includes(userData.id) : false),
    [product?.likeUserIds]
  );
  const firstImage = useMemo(
    () => (product.images.length ? product.images[0] : null),
    [product.images]
  );
  const symbolCurrency =
    listCurrency.find((currency) => currency.code === product.codeCurrency)
      ?.symbol || i18n._("grn");

  const onPressLike = async () => {
    if (userData) {
      const currentImages = product.images.map((image) => ({
        id: image.id || "",
        url: image.url || "",
        width: image.width,
        height: image.height,
        image,
      }));
      const likeUserIds = isLike
        ? product.likeUserIds.filter(
            (likeUserId) => likeUserId !== userData?.id
          )
        : [...product.likeUserIds, userData.id];
      await changeProduct({ ...product, images: currentImages, likeUserIds });
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onSelect(product.id);
      }}
    >
      {firstImage ? (
        <ImageCache imageSrc={firstImage.url} style={styles.image} />
      ) : (
        <ImageCache imageSrc={imageNoPhoto} style={styles.image} />
      )}
      <View style={styles.body}>
        <Text numberOfLines={2} style={styles.title}>
          {product.title}
        </Text>
        <View style={styles.containerCity}>
          <IconLocationMarker width={14} height={13} fill={colors.grayCloudy} />
          <Text style={styles.subTitle}>{product.place.city}</Text>
        </View>
        <TextLinearGradient
          title={`${product.price.toLocaleString("uk")} ${symbolCurrency}`}
        />
        <View style={styles.containerSubTitle}>
          <Text style={styles.subTitle}>
            {dayjs(product.updateAT).format("DD.MM.YYYY")}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        accessibilityLabel={i18n._("Toggle like product")}
        onPress={onPressLike}
        style={styles.containerLike}
      >
        {isLike ? (
          <IconLikeFullGradient width={38} height={38} />
        ) : (
          <IconLikeGradient width={38} height={38} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
