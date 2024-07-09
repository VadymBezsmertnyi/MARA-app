import React, { FunctionComponent, useContext, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView } from "react-native-gesture-handler";
import { Trans } from "@lingui/macro";

// types
import { RootAllScreensParamList } from "../../../navigators/Navigators.types";

// providers
import { localesContext } from "../../../../localization/localization.provider";
import { marketContext } from "../../../providers/MarketProvider/MarketProvider";
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";

// components
import { ImageCache } from "../../../components/ImageCache/ImageCache";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { ItemSettingProducts } from "./components/ItemSettingProducts/ItemSettingProducts";

// constants
import { PATHS_SETTINGS_SCREENS } from "../../../navigators/useNavigator.constants";

// images
import notItemsImage from "../../../../assets/settingsScreen/notWorkshopsUsers.jpeg";

// icons
import { IconClose, IconPlus } from "../../../icons/components";

// styles
import { styles } from "./SettingsProducts.styles";
import colors from "../../../../styles/colors";
import { userContext } from "../../../providers/UserProvider/UserProvider";

type SettingsProductsProps = {
  navigation: NativeStackNavigationProp<RootAllScreensParamList> &
    DrawerNavigationHelpers;
};

export const SettingsProducts: FunctionComponent<SettingsProductsProps> = ({
  navigation,
}) => {
  const { userData } = useContext(userContext);
  const { heightStatusBar } = useContext(themeContext);
  const { i18n } = useContext(localesContext);
  const typeItem = useMemo(() => i18n._("adverts"), [i18n]);
  console.log("userData?.productsIds", userData?.productsIds);
  const productsUser = useMemo(
    () => userData?.productsIds || [],
    [userData?.productsIds]
  );

  const containerStyles = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }],
    [heightStatusBar]
  );

  const onClose = () => {
    navigation.goBack();
  };

  return (
    <View style={containerStyles}>
      <View style={styles.containerHeader}>
        <View style={styles.boxHeaderEmpty} />
        <Text style={styles.titleHeader}>
          <Trans>My adverts</Trans>
        </Text>
        <TouchableOpacity
          accessibilityLabel={i18n._(
            "Button for closing the settings products screen"
          )}
          onPress={onClose}
        >
          <IconClose width={24} height={24} fill={colors.blackCoffee} />
        </TouchableOpacity>
      </View>
      {productsUser.length === 0 ? (
        <View style={styles.containerNotElements}>
          <ImageCache
            contentFit="contain"
            style={styles.imageNotElements}
            imageSrc={notItemsImage}
          />
          <View style={styles.titlesNotElements}>
            <Text style={styles.titleNotElements}>
              <Trans>Sorry!</Trans>
            </Text>
            <Text style={styles.titleNotElements}>
              <Trans>You don't have {typeItem}.</Trans>
            </Text>
          </View>
        </View>
      ) : (
        <ScrollView style={styles.containerElements}>
          {productsUser.map((product, index) => {
            const isStart = index === 0;
            return (
              <ItemSettingProducts
                key={`setting-product-${product._id}`}
                product={product}
                isStart={isStart}
              />
            );
          })}
          <ButtonCustom
            onSubmit={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsProductAdd);
            }}
            styleContainer={styles.containerButtonAdd}
          >
            <View style={styles.buttonAdd}>
              <IconPlus width={16} height={16} fill={colors.white} />
              <Text style={styles.titleAdd}>
                <Trans>Add advert</Trans>
              </Text>
            </View>
          </ButtonCustom>
        </ScrollView>
      )}

      <View style={styles.containerFooter}>
        <ButtonCustom
          onSubmit={() => {
            navigation.navigate(PATHS_SETTINGS_SCREENS.settingsProductAdd);
          }}
        >
          <View style={styles.buttonAdd}>
            <IconPlus width={16} height={16} fill={colors.white} />
            <Text style={styles.titleAdd}>
              <Trans>Add advert</Trans>
            </Text>
          </View>
        </ButtonCustom>
      </View>
    </View>
  );
};
