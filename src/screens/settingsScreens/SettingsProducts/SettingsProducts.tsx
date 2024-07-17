import React, { FunctionComponent, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView } from "react-native-gesture-handler";
import { Trans } from "@lingui/macro";

// types
import { RootAllScreensParamList } from "../../../navigators/Navigators.types";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";
import { useUserProvider } from "../../../providers/UserProvider/UserProvider";
import { useSubscriptionProvider } from "../../../providers/SubscriptionProvider/SubscriptionProvider";

// components
import { ImageCache } from "../../../components/ImageCache/ImageCache";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { ItemSettingProducts } from "./components/ItemSettingProducts/ItemSettingProducts";
import ModalWindowBuy from "../../../components/ModalWindowBuy/ModalWindowBuy";

// constants
import { PATHS_SETTINGS_SCREENS } from "../../../navigators/useNavigator.constants";

// images
import notItemsImage from "../../../../assets/settingsScreen/notWorkshopsUsers.jpeg";

// icons
import { IconClose, IconPlus } from "../../../icons/components";

// styles
import { styles } from "./SettingsProducts.styles";
import colors from "../../../../styles/colors";

type SettingsProductsProps = {
  navigation: NativeStackNavigationProp<RootAllScreensParamList> &
    DrawerNavigationHelpers;
};

export const SettingsProducts: FunctionComponent<SettingsProductsProps> = ({
  navigation,
}) => {
  const { infoBusinessAdverts, infoAdverts } = useSubscriptionProvider();
  const { userData } = useUserProvider();
  const { heightStatusBar } = useThemeProvider();
  const { i18n } = useLocalesProvider();
  const [isShowPayment, setIsShowPayment] = useState(false);

  const isAmountAdverts = useMemo(
    () =>
      infoBusinessAdverts.amountBusinessAdvert > 0 ||
      infoAdverts.amountAdvert > 0,
    [infoBusinessAdverts, infoAdverts]
  );
  const typeItem = useMemo(() => i18n._("adverts"), [i18n]);
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
    <>
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
                if (isAmountAdverts)
                  navigation.navigate(
                    PATHS_SETTINGS_SCREENS.settingsProductAdd
                  );
                else setIsShowPayment(true);
              }}
              styleContainer={styles.containerButtonAdd}
            >
              <View style={styles.buttonAdd}>
                {isAmountAdverts && (
                  <IconPlus width={16} height={16} fill={colors.white} />
                )}
                <Text style={styles.titleAdd}>
                  {isAmountAdverts
                    ? i18n._("Add advert")
                    : i18n._("Buy advert")}
                </Text>
              </View>
            </ButtonCustom>
          </ScrollView>
        )}
      </View>
      {isShowPayment && (
        <ModalWindowBuy onClose={() => setIsShowPayment(false)} />
      )}
    </>
  );
};
