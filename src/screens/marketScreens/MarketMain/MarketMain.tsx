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

// providers
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";
import { localesContext } from "../../../../localization/localization.provider";

// components
import { Header } from "../../../components/Header/Header";
import { MenuBurgerButton } from "../../../components/MenuBurgerButton/MenuBurgerButton";
import { HeaderFilters } from "../../workshopsScreens/WorkshopsMain/components/HeaderFilters/HeaderFilters";

// styles
import { styles } from "./MarketMain.styles";
import { Input } from "../../../components/Input/Input";
import { IconSearchInput } from "../../../icons/components";
import { ProductCardSmall } from "./components/ProductCardSmall/ProductCardSmall";
import { ProductCardFull } from "./components/ProductCardFull/ProductCardFull";

type MarketMainProps = {
  navigation: NativeStackNavigationProp<RootMarketScreensParamList> &
    DrawerNavigationHelpers;
};

const data = [
  { id: "1", title: "Елемент 1" },
  { id: "2", title: "Елемент 2" },
  { id: "3", title: "Елемент 3" },
  { id: "4", title: "Елемент 4" },
];

export const MarketMain: FunctionComponent<MarketMainProps> = ({
  navigation,
}) => {
  const { i18n } = useContext(localesContext);
  const { heightStatusBar } = useContext(themeContext);
  const [isShowSort, setIsShowSort] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isWrap, setIsWrap] = useState(false);

  const stylesContainer: StyleProp<ViewStyle> = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }],
    [heightStatusBar]
  );

  const onPressShowMenu = () => {
    navigation.openDrawer();
  };

  const renderItem: ListRenderItem<{
    id: string;
    title: string;
  }> = ({ item }) =>
    isWrap ? (
      <ProductCardFull
        onSelect={(idProduct) => {
          console.log("onSelect-idProduct", idProduct);
        }}
      />
    ) : (
      <ProductCardSmall
        onSelect={(idProduct) => {
          console.log("onSelect-idProduct", idProduct);
        }}
      />
    );

  return (
    <View style={stylesContainer}>
      <Header
        leftElement={<MenuBurgerButton onPress={onPressShowMenu} />}
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
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => `product-${item.id}`}
            numColumns={1}
            contentContainerStyle={styles.containerList}
          />
        ) : (
          <FlatList
            key={"#"}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => `product-wrap-${item.id}`}
            numColumns={2}
            contentContainerStyle={styles.containerList}
            columnWrapperStyle={styles.columnContainerList}
          />
        )}
      </View>
    </View>
  );
};
