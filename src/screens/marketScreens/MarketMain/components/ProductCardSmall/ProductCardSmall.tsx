import React, { FunctionComponent, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import dayjs from "dayjs";

// types
import { ProductType } from "../../../../../providers/MarketProvider/MarketProvider.types";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import { usePaymentProvider } from "../../../../../providers/PaymentProvider/PaymentProvider";
import { useMarketProvider } from "../../../../../providers/MarketProvider/MarketProvider";
import { useUserProvider } from "../../../../../providers/UserProvider/UserProvider";
import { usePlacesProvider } from "../../../../../providers/PlacesProvider/PlacesProvider";

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
  onSelect: (idProduct: string) => void;
};

export const ProductCardSmall: FunctionComponent<ProductCardFullProps> = ({
  product,
  onSelect,
}) => {
  const { i18n, language } = useLocalesProvider();
  const { listCurrency } = usePaymentProvider();
  const { changeProduct } = useMarketProvider();
  const { placesDB } = usePlacesProvider();
  const { userData } = useUserProvider();
  const showTitlePlace = useMemo(() => {
    const placeDB = product.place_id;
    if (!placeDB) return "";
    return placeDB[language].formatted_address;
  }, [placesDB, product.place_id]);
  const isLike = useMemo(
    () =>
      userData
        ? product.likeUserIds
            .map((likeUserId) => likeUserId._id)
            .includes(userData._id)
        : false,
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
        _id: image._id || "",
        url: image.url || "",
        width: image.width,
        height: image.height,
        image,
      }));
      const likeUserIds = isLike
        ? product.likeUserIds
            .filter((likeUserId) => likeUserId._id !== userData?._id)
            .map((likeUserId) => likeUserId._id)
        : [
            ...product.likeUserIds.map((likeUserId) => likeUserId._id),
            userData._id,
          ];
      if (product.userId)
        await changeProduct({
          ...product,
          images: currentImages,
          likeUserIds,
          userId: product.userId._id,
        });
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onSelect(product._id);
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
          <Text numberOfLines={1} style={styles.subTitle}>
            {showTitlePlace}
          </Text>
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
