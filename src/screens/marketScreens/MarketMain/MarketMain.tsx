import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { Trans } from "@lingui/macro";

// types
import { RootMarketScreensParamList } from "../../../navigators/Navigators.types";
import { ProductType } from "../../../providers/MarketProvider/MarketProvider.types";

// providers
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";
import { localesContext } from "../../../../localization/localization.provider";
import { marketContext } from "../../../providers/MarketProvider/MarketProvider";

// components
import { Header } from "../../../components/Header/Header";
import { MenuBurgerButton } from "../../../components/MenuBurgerButton/MenuBurgerButton";
import { HeaderFilters } from "../../workshopsScreens/WorkshopsMain/components/HeaderFilters/HeaderFilters";
import { Input } from "../../../components/Input/Input";
import { ProductCardSmall } from "./components/ProductCardSmall/ProductCardSmall";
import { ProductCardFull } from "./components/ProductCardFull/ProductCardFull";
import { AddEventButton } from "../../../components/AddEventButton/AddEventButton";
import { ModalFilter } from "./components/ModalFilter/ModalFilter";
import { ModalSort } from "./components/ModalSort/ModalSort";
import { ModalFilterSubmitType } from "./components/ModalFilter/ModalFilter.types";
import { ImageCache } from "../../../components/ImageCache/ImageCache";

// icons
import { IconSearchInput } from "../../../icons/components";

// constants
import { PATHS_MARKET_SCREENS } from "../../../navigators/useNavigator.constants";
import { CURRENCY_UAH } from "../../../providers/PaymentProvider/PaymentProvider.constants";

// images
import notProductsImage from "../../../../assets/market/notProducts.jpeg";
import notProductsFilterImage from "../../../../assets/market/notProductsFilter.jpeg";

// styles
import { styles } from "./MarketMain.styles";

type MarketMainProps = {
  navigation: NativeStackNavigationProp<RootMarketScreensParamList> &
    DrawerNavigationHelpers;
};

export const MarketMain: FunctionComponent<MarketMainProps> = ({
  navigation,
}) => {
  const { i18n } = useContext(localesContext);
  const { heightStatusBar } = useContext(themeContext);
  const { products, minMaxPrices } = useContext(marketContext);
  const [productName, setProductName] = useState("");
  const [isShowSort, setIsShowSort] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isWrap, setIsWrap] = useState(false);
  const [dataFilter, setDataFilter] = useState<ModalFilterSubmitType | null>(
    null
  );
  const [sort, setSort] = useState<"latest" | "cheapest" | "expensive" | null>(
    null
  );

  const getIsPrice = (
    product: ProductType,
    currentDataFilter: ModalFilterSubmitType
  ) => {
    if (currentDataFilter.price) {
      const priceProductCurrency =
        product.codeCurrency === currentDataFilter.price.codeCurrent
          ? product.price
          : product.prices[currentDataFilter.price.codeCurrent] ||
            minMaxPrices?.max[currentDataFilter.price.codeCurrent] ||
            null;
      if (!priceProductCurrency) return false;
      return priceProductCurrency <= currentDataFilter.price.max;
    }
    return true;
  };

  const productsFilterSort = useMemo(() => {
    if (dataFilter === null && sort === null && !productName.length)
      return products;

    const filterProducts = dataFilter
      ? products.filter((product) => {
          const brandMotoProductId =
            product.moto?.brandId || product.motoParts?.brandId || null;
          const brandAutoProductId =
            product.auto?.brandId || product.autoParts?.brandId || null;
          const isPrice = getIsPrice(product, dataFilter);
          const isNew =
            dataFilter.isNew !== null
              ? dataFilter.isNew === product.isNew
              : true;
          const isBusiness =
            dataFilter.isBusiness !== null
              ? dataFilter.isBusiness === product.isBusiness
              : true;
          const isCategory = dataFilter.category?.length
            ? dataFilter.category.filter(
                (categoryProducts) =>
                  (categoryProducts.id === 1 && Boolean(product.moto)) ||
                  (categoryProducts.id === 2 && Boolean(product.auto)) ||
                  (categoryProducts.id === 3 && Boolean(product.motoParts)) ||
                  (categoryProducts.id === 4 && Boolean(product.autoParts))
              ).length > 0
            : true;
          const isBrandMoto =
            dataFilter.brandMoto && brandMotoProductId
              ? dataFilter.brandMoto.filter(
                  (brand) => brand.id === brandMotoProductId
                ).length > 0
              : true;
          const isBrandAuto =
            dataFilter.brandAuto && brandAutoProductId
              ? dataFilter.brandAuto.filter(
                  (brand) => brand.id === brandAutoProductId
                ).length > 0
              : true;
          const isPlaceCountry = dataFilter.selectPlaces
            ? dataFilter.selectPlaces.countryPlaceIds.filter(
                (countryPlaceId) => countryPlaceId === product.country_place_id
              ).length > 0
            : true;
          const isPlaceRegion = dataFilter.selectPlaces
            ? dataFilter.selectPlaces.regionPlaceIds.filter(
                (regionPlaceId) => regionPlaceId === product.region_place_id
              ).length > 0
            : true;
          const isPlaceCity = dataFilter.selectPlaces
            ? dataFilter.selectPlaces.cityPlaceIds.filter(
                (cityPlaceId) => cityPlaceId === product.place_id
              ).length > 0
            : true;

          return (
            isPrice &&
            isNew &&
            isBusiness &&
            isCategory &&
            isBrandMoto &&
            isBrandAuto &&
            isPlaceCountry &&
            isPlaceRegion &&
            isPlaceCity
          );
        })
      : products;

    const sortFilterProducts = sort
      ? filterProducts.sort((prev, next) => {
          const pricePrevUAH =
            prev.codeCurrency === CURRENCY_UAH
              ? prev.price
              : prev.prices[CURRENCY_UAH] || 0;
          const priceNextUAH =
            next.codeCurrency === CURRENCY_UAH
              ? next.price
              : next.prices[CURRENCY_UAH] || 0;
          if (sort === "cheapest") return priceNextUAH - pricePrevUAH;
          if (sort === "expensive") return pricePrevUAH - priceNextUAH;
          if (sort === "latest") return prev.updateAT - next.updateAT;
          return 0;
        })
      : filterProducts;

    const findInputWorkshop = sortFilterProducts.length
      ? sortFilterProducts.filter((product) =>
          product.title
            .toLocaleLowerCase()
            .includes(productName.toLocaleLowerCase())
        )
      : sortFilterProducts;

    return findInputWorkshop;
  }, [products, dataFilter, sort, productName]);

  const stylesContainer: StyleProp<ViewStyle> = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }],
    [heightStatusBar]
  );

  const onClose = () => {
    setIsShowSort(false);
    setIsShowFilter(false);
  };

  const setTypeSort = (type: "latest" | "cheapest" | "expensive") => {
    setSort((state) => (state === type ? null : type));
    onClose();
  };

  const onPressShowMenu = () => {
    navigation.openDrawer();
  };

  const onPressAddProduct = () => {
    navigation.navigate(PATHS_MARKET_SCREENS.marketAdd);
  };

  const onSelectProduct = (productId: number) => {
    navigation.navigate(PATHS_MARKET_SCREENS.marketItem, {
      productId,
    });
  };

  const renderItem: ListRenderItem<ProductType> = ({ item }) =>
    isWrap ? (
      <ProductCardFull product={item} onSelect={onSelectProduct} />
    ) : (
      <ProductCardSmall product={item} onSelect={onSelectProduct} />
    );

  return (
    <>
      <View style={stylesContainer}>
        <Header
          leftElement={
            <View style={styles.containerHeaderMenu}>
              <MenuBurgerButton onPress={onPressShowMenu} />
            </View>
          }
          title={i18n._("Market")}
          rightElement={
            <HeaderFilters
              isWrap={isWrap}
              setIsWrap={setIsWrap}
              onPressFilter={() => {
                setIsShowFilter(true);
              }}
              onPressSort={() => {
                setIsShowSort(true);
              }}
            />
          }
        />
        <View>
          <View style={styles.containerInput}>
            <Input
              placeholder={i18n._("Enter the name")}
              value={productName}
              onChange={setProductName}
              InputIcon={
                <IconSearchInput
                  width={26}
                  height={26}
                  style={styles.iconInput}
                />
              }
            />
          </View>
          {products.length && productsFilterSort?.length ? (
            isWrap ? (
              <FlatList
                key={"_"}
                data={productsFilterSort}
                renderItem={renderItem}
                keyExtractor={(item) => `product-${item.id}`}
                numColumns={1}
                contentContainerStyle={styles.containerList}
              />
            ) : (
              <FlatList
                key={"#"}
                data={productsFilterSort}
                renderItem={renderItem}
                keyExtractor={(item) => `product-wrap-${item.id}`}
                numColumns={2}
                contentContainerStyle={styles.containerList}
                columnWrapperStyle={styles.columnContainerList}
              />
            )
          ) : products.length ? (
            <View style={styles.containerNotList}>
              <ImageCache
                contentFit="contain"
                style={styles.imageNotElements}
                imageSrc={notProductsFilterImage}
              />
              <Text style={styles.titleNotList}>
                <Trans>Sorry, but no products were found by the filters</Trans>
              </Text>
            </View>
          ) : (
            <View style={styles.containerNotList}>
              <ImageCache
                contentFit="contain"
                style={styles.imageNotElements}
                imageSrc={notProductsImage}
              />
              <Text style={styles.titleNotList}>
                <Trans>Sorry, there are no available items</Trans>
              </Text>
            </View>
          )}
        </View>
        <AddEventButton
          onPress={onPressAddProduct}
          accessibilityLabel={i18n._("Add product")}
        />
      </View>
      <ModalSort
        isOpen={isShowSort}
        onClose={onClose}
        setTypeSort={setTypeSort}
      />
      <ModalFilter
        isOpen={isShowFilter}
        onClose={onClose}
        dataFilterOld={dataFilter}
        onSubmit={setDataFilter}
      />
    </>
  );
};
