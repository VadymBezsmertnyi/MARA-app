import React, { FunctionComponent, useMemo } from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// types
import { ProductType } from "../../../../../providers/MarketProvider/MarketProvider.types";

// providers
import { usePaymentProvider } from "../../../../../providers/PaymentProvider/PaymentProvider";
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// components
import { ImageCache } from "../../../../../components/ImageCache/ImageCache";
import { TextLinearGradient } from "../../../../../components/TextLinearGradient/TextLinearGradient";

// helps
import { useAllNavigation } from "../../../../../navigators/Navigators.helps";

// constants
import { PATHS_SETTINGS_SCREENS } from "../../../../../navigators/useNavigator.constants";

// icons
import { IconEye, IconPencilGradient } from "../../../../../icons/components";

// styles
import { styles } from "./ItemSettingProducts.styles";
import { useBusinessProvider } from "../../../../../providers/BusinessProvider/BusinessProvider";

type ItemSettingProductsProps = {
  product: ProductType;
  isStart: boolean;
};

export const ItemSettingProducts: FunctionComponent<
  ItemSettingProductsProps
> = ({ product, isStart }) => {
  const navigation = useAllNavigation();
  const { businessMarketUser } = useBusinessProvider();
  const { i18n } = useLocalesProvider();
  const { listCurrency } = usePaymentProvider();
  const firstImage = product.images[0] ? product.images[0].url : null;
  const containerStyles: StyleProp<ViewStyle> = useMemo(
    () => [styles.container, { marginTop: isStart ? 0 : 12 }],
    [isStart]
  );
  const symbolCurrency =
    listCurrency.find((currency) => currency.code === product.codeCurrency)
      ?.symbol || i18n._("grn");

  const onPressChange = () => {
    navigation.navigate(PATHS_SETTINGS_SCREENS.settingsProductChange, {
      productId: product._id,
    });
  };

  return (
    <View style={containerStyles}>
      <View style={styles.containerLeft}>
        {firstImage ? (
          <ImageCache imageSrc={firstImage} style={styles.image} />
        ) : null}
        {product.isBusiness && businessMarketUser?.logo && (
          <ImageCache
            imageSrc={businessMarketUser.logo.url}
            style={styles.logoBusiness}
          />
        )}
      </View>
      <View style={styles.containerCenter}>
        <Text>{product.title}</Text>
        <View style={styles.containerInfo}>
          <TextLinearGradient
            title={`${product.price.toLocaleString("uk")} ${symbolCurrency}`}
          />
          <View style={styles.containerViews}>
            <IconEye width={16} height={10} />
            <Text style={styles.titleViews}>{product.quantityViews}</Text>
          </View>
        </View>
      </View>
      <View style={styles.containerRight}>
        <TouchableOpacity onPress={onPressChange}>
          <IconPencilGradient width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
