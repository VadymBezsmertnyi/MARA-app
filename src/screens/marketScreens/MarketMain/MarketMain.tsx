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

// icons
import { IconSearchInput } from "../../../icons/components";

// constants
import { PATHS_MARKET_SCREENS } from "../../../navigators/useNavigator.constants";

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
  const { products } = useContext(marketContext);
  const [isShowSort, setIsShowSort] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isWrap, setIsWrap] = useState(false);
  const [dataFilter, setDataFilter] = useState<ModalFilterSubmitType | null>(
    null
  );

  const stylesContainer: StyleProp<ViewStyle> = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }],
    [heightStatusBar]
  );

  const onClose = () => {
    setIsShowSort(false);
    setIsShowFilter(false);
  };

  const setTypeSort = (type: "latest" | "cheapest" | "expensive") => {
    console.log(type);
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
              onChange={() => {}}
              InputIcon={<IconSearchInput width={26} height={26} />}
            />
          </View>
          {isWrap ? (
            <FlatList
              key={"_"}
              data={products}
              renderItem={renderItem}
              keyExtractor={(item) => `product-${item.id}`}
              numColumns={1}
              contentContainerStyle={styles.containerList}
            />
          ) : (
            <FlatList
              key={"#"}
              data={products}
              renderItem={renderItem}
              keyExtractor={(item) => `product-wrap-${item.id}`}
              numColumns={2}
              contentContainerStyle={styles.containerList}
              columnWrapperStyle={styles.columnContainerList}
            />
          )}
        </View>
        <AddEventButton onPress={onPressAddProduct} />
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
