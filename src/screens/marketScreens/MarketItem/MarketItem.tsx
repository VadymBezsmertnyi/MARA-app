import React, { FunctionComponent, useMemo, useState } from "react";
import { Linking, Modal, ScrollView, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import dayjs from "dayjs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// types
import { RootMarketScreensParamList } from "../../../navigators/Navigators.types";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useMarketProvider } from "../../../providers/MarketProvider/MarketProvider";
import { usePaymentProvider } from "../../../providers/PaymentProvider/PaymentProvider";
import { useUserProvider } from "../../../providers/UserProvider/UserProvider";
import { useSharingProvider } from "../../../providers/SharingProvider/SharingProvider";
import { usePlacesProvider } from "../../../providers/PlacesProvider/PlacesProvider";
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";

// components
import { Header } from "../../../components/Header/Header";
import { HeaderRightItem } from "../../workshopsScreens/WorkshopsItem/components/HeaderRightItem/HeaderRightItem";
import { CustomSlider } from "../../../components/CustomSlider/CustomSlider";
import { ItemDescriptions } from "./components/ItemDescriptions/ItemDescriptions";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { ModalWindow } from "../../../components/ModalWindow/ModalWindow";
import { GalleryModal } from "../../../components/GalleryModal/GalleryModal";

// helps
import { useCategoriesMarket } from "../../../helps/useCategoriesMarket";

// icons
import {
  IconLocationMarkerGradient,
  IconPhone,
  IconTelegram,
  RadixIconsCash,
} from "../../../icons/components";

// styles
import { styles } from "./MarketItem.styles";
import colors from "../../../../styles/colors";

type MarketItemProps = {
  route: RouteProp<
    RootMarketScreensParamList,
    keyof RootMarketScreensParamList
  >;
};

export const MarketItem: FunctionComponent<MarketItemProps> = ({ route }) => {
  const { heightTabBar } = useThemeProvider();
  const { top, bottom } = useSafeAreaInsets();
  const { i18n, language } = useLocalesProvider();
  const { userData } = useUserProvider();
  const { products, changeProduct } = useMarketProvider();
  const { listCurrency } = usePaymentProvider();
  const { getSharedLink } = useSharingProvider();
  const {
    getBrandMoto,
    getBrandAuto,
    getFuelType,
    getTransmissionType,
    getMotoPart,
    getAutoPart,
  } = useCategoriesMarket(i18n);
  const [gallery, setGallery] = useState<{
    images: string[];
    indexImage?: number;
  } | null>(null);
  const { placesDB } = usePlacesProvider();
  const selectProduct = useMemo(
    () =>
      products.find((product) => product._id === route.params?.productId) ||
      null,
    [route.params]
  );
  const showTitlePlace = useMemo(() => {
    if (!selectProduct) return "";
    const placeDB = selectProduct.place_id;
    if (!placeDB) return "";
    return placeDB[language].formatted_address;
  }, [placesDB, selectProduct?.place_id]);
  const isLike = useMemo(
    () =>
      userData && selectProduct
        ? selectProduct.likeUserIds
            .map((item) => item._id)
            .includes(userData._id)
        : false,
    [selectProduct?.likeUserIds]
  );
  const showPrice = useMemo(() => {
    const showCurrency =
      listCurrency.find(
        (currency) => currency.code === selectProduct?.codeCurrency
      ) || listCurrency[0];
    return `${selectProduct?.price.toLocaleString("uk")} ${
      showCurrency.symbol
    }`;
  }, [selectProduct?.price]);
  const brand = useMemo(() => {
    if (selectProduct?.autoParts)
      return getBrandAuto(selectProduct.autoParts.brandId)?.name || "";
    if (selectProduct?.motoParts)
      return getBrandMoto(selectProduct.motoParts.brandId)?.name || "";
    if (selectProduct?.auto)
      return getBrandAuto(selectProduct.auto.brandId)?.name || "";
    if (selectProduct?.moto)
      return getBrandMoto(selectProduct.moto.brandId)?.name || "";
    return null;
  }, [selectProduct]);
  const mileage = useMemo(() => {
    if (selectProduct?.auto)
      return selectProduct.auto.mileage.toLocaleString("uk");
    if (selectProduct?.moto)
      return selectProduct.moto.mileage.toLocaleString("uk");
    return null;
  }, [selectProduct?.auto, selectProduct?.moto]);
  const yearRelease = useMemo(() => {
    if (selectProduct?.auto) return selectProduct.auto.yearRelease;
    if (selectProduct?.moto) return selectProduct.moto.yearRelease;
    return null;
  }, [selectProduct?.auto, selectProduct?.moto]);
  const cleared = useMemo(() => {
    if (selectProduct?.auto)
      return selectProduct.auto.isCleared ? i18n._("Yes") : i18n._("No");
    if (selectProduct?.moto)
      return selectProduct.moto.isCleared ? i18n._("Yes") : i18n._("No");
    return null;
  }, [selectProduct?.auto, selectProduct?.moto]);
  const typeFuel = useMemo(() => {
    if (selectProduct?.auto)
      return getFuelType(selectProduct.auto.typeFuelId)?.name || "";
    if (selectProduct?.moto)
      return getFuelType(selectProduct.moto.typeFuelId)?.name || "";
    return null;
  }, [selectProduct?.auto, selectProduct?.moto]);
  const typeTransmission = useMemo(() => {
    if (selectProduct?.auto)
      return (
        getTransmissionType(selectProduct.auto.typeTransmissionId)?.name || ""
      );
    if (selectProduct?.moto)
      return (
        getTransmissionType(selectProduct.moto.typeTransmissionId)?.name || ""
      );
    return null;
  }, [selectProduct?.auto, selectProduct?.moto]);
  const typeParts = useMemo(() => {
    if (selectProduct?.autoParts)
      return getAutoPart(selectProduct.autoParts.typeId)?.name || "";
    if (selectProduct?.motoParts)
      return getMotoPart(selectProduct.motoParts?.typeId)?.name || "";
    return null;
  }, [selectProduct?.autoParts, selectProduct?.motoParts]);

  const onPressTelegram = async () => {
    if (selectProduct?.telegram) {
      const isAt = selectProduct.telegram.includes("@");
      const currentTelegramName = isAt
        ? selectProduct.telegram.slice(1, selectProduct.telegram.length)
        : selectProduct.telegram;
      const appTelegramURI = `tg://resolve?domain=${currentTelegramName}`;
      const webTelegramURI = `https://t.me/${currentTelegramName}`;
      const isTelegram = await Linking.canOpenURL(appTelegramURI);

      if (isTelegram) Linking.openURL(appTelegramURI);
      else Linking.openURL(webTelegramURI);
    }
  };
  const onPressCall = async () => {
    if (selectProduct?.phoneNumber) {
      const phoneURI = `tel:${selectProduct.phoneNumber.replaceAll(" ", "")}`;
      const isPhone = await Linking.canOpenURL(phoneURI);

      if (isPhone) Linking.openURL(phoneURI);
    }
  };
  const onPressLike = () => {
    if (selectProduct && userData) {
      const currentImages = selectProduct.images.map((image) => ({
        _id: image._id || "",
        url: image.url || "",
        width: image.width,
        height: image.height,
        image,
      }));
      const likeUserIds = isLike
        ? selectProduct.likeUserIds
            .filter((likeUserId) => likeUserId._id !== userData?._id)
            .map((item) => item._id)
        : [...selectProduct.likeUserIds.map((item) => item._id), userData._id];
      if (selectProduct.userId)
        changeProduct({
          ...selectProduct,
          images: currentImages,
          likeUserIds,
          userId: selectProduct.userId._id,
          place_id: selectProduct.place_id?._id,
          country_place_id: selectProduct.country_place_id?._id,
          region_place_id: selectProduct.region_place_id?._id,
        });
    }
  };

  const onShowGallery = (indexImage?: number) => {
    if (selectProduct?.images.length) {
      setGallery({
        images: selectProduct.images.map((image) => image.url),
        indexImage,
      });
    }
  };

  const onPressShare = () => {
    if (selectProduct) getSharedLink({ productId: selectProduct._id });
  };

  if (!selectProduct) return null;
  return (
    <>
      <View style={styles.container}>
        <Header
          title={""}
          rightElement={
            <HeaderRightItem
              onPressLike={onPressLike}
              isLike={isLike}
              onPressShare={onPressShare}
            />
          }
        />
        <ScrollView>
          <View style={styles.containerMain}>
            <View style={styles.containerInfo}>
              {selectProduct?.images.length ? (
                <View style={styles.containerSlider}>
                  <CustomSlider
                    images={selectProduct?.images || []}
                    loop
                    styleScroll={(props) => [props, styles.imagesScroll]}
                    onPress={({ index }) => {
                      onShowGallery(index);
                    }}
                  />
                </View>
              ) : null}
              <Text numberOfLines={2} style={styles.title}>
                {selectProduct?.title}
              </Text>
              <View style={styles.containerPlaceData}>
                <Text style={styles.titleDate}>
                  {dayjs(selectProduct.updateAT).format("DD.MM.YYYY")}
                </Text>
                <View style={styles.containerCity}>
                  <IconLocationMarkerGradient width={14} height={13} />
                  <Text style={styles.subTitle}>{showTitlePlace}</Text>
                </View>
              </View>
            </View>
            <View style={styles.containerPrice}>
              <View style={styles.iconWrapperLightBlue}>
                <RadixIconsCash
                  width={24}
                  height={24}
                  fill={colors.californiaOrange}
                />
              </View>
              <Text style={styles.titlePrice}>{showPrice}</Text>
            </View>
            <View style={styles.containerMainInfo}>
              <View style={styles.containerDescription}>
                <Text style={styles.titleDescription}>
                  {i18n._("Description")}
                </Text>
                <View style={styles.containerItemsDescriptions}>
                  <ItemDescriptions title={i18n._("Brand")} value={brand} />
                  <ItemDescriptions
                    title={i18n._("Condition")}
                    value={
                      selectProduct.isNewProduct
                        ? i18n._("New")
                        : i18n._("Used")
                    }
                  />
                  <ItemDescriptions
                    title={i18n._("Seller")}
                    value={
                      selectProduct.isBusiness
                        ? i18n._("Business")
                        : i18n._("Private individual")
                    }
                  />
                  <ItemDescriptions
                    title={i18n._("Mileage")}
                    value={mileage ? i18n._("{mileage} km", { mileage }) : null}
                  />
                  <ItemDescriptions
                    title={i18n._("Year of manufacture")}
                    value={
                      yearRelease
                        ? i18n._("{yearRelease} km", { yearRelease })
                        : null
                    }
                  />
                  <ItemDescriptions
                    title={i18n._("Customs cleared")}
                    value={cleared}
                  />
                  <ItemDescriptions
                    title={i18n._("Fuel type")}
                    value={typeFuel}
                  />
                  <ItemDescriptions
                    title={i18n._("Transmission")}
                    value={typeTransmission}
                  />
                  <ItemDescriptions
                    title={i18n._("Type parts")}
                    value={typeParts}
                  />
                </View>
              </View>
              <Text style={styles.description}>
                {selectProduct.description}
              </Text>
              <View style={styles.containerViews}>
                <Text style={styles.titleViews}>
                  {i18n._("Views:")} {selectProduct.quantityViews}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.containerEmpty} />
        </ScrollView>
        <View
          style={[
            styles.containerButtons,
            {
              paddingBottom: bottom,
            },
          ]}
        >
          {selectProduct.telegram ? (
            <ButtonCustom
              onSubmit={onPressTelegram}
              styleContainer={styles.containerTelegram}
            >
              <View style={styles.containerButton}>
                <IconTelegram
                  width={25}
                  height={22}
                  strokeWidth={2}
                  stroke={colors.white}
                />
                <Text style={styles.titleButton}>{i18n._("Write")}</Text>
              </View>
            </ButtonCustom>
          ) : null}
          <ButtonCustom
            onSubmit={onPressCall}
            styleContainer={
              !selectProduct.telegram ? styles.containerTelegram : undefined
            }
          >
            <View style={styles.containerButton}>
              <IconPhone width={29} height={29} fill={colors.white} />
              {!selectProduct.telegram ? (
                <Text style={styles.titleButton}>{i18n._("Call")}</Text>
              ) : null}
            </View>
          </ButtonCustom>
        </View>
      </View>
      <Modal visible={gallery !== null} transparent>
        {gallery ? (
          <ModalWindow
            onClose={() => {
              setGallery(null);
            }}
          >
            <GalleryModal
              data={gallery}
              onClose={() => {
                setGallery(null);
              }}
            />
          </ModalWindow>
        ) : null}
      </Modal>
    </>
  );
};
