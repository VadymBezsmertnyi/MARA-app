import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Modal, ScrollView, Text, View } from "react-native";
import { Trans } from "@lingui/macro";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { RouteProp, useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";

// types
import { PlaceType } from "../../../providers/PlacesProvider/PlacesProvider.types";
import { ImageType } from "../../../components/ImageModal/ImageModal.types";
import { CodeCurrenciesType } from "../../../providers/PaymentProvider/PaymentProvider.types";
import { TypeDataCategory, TypeModalCategories } from "./MarketAdd.types";
import { ProductType } from "../../../providers/MarketProvider/MarketProvider.types";
import {
  RootAllScreensParamList,
  RootMarketScreensParamList,
  RootSettingsScreensParamList,
} from "../../../navigators/Navigators.types";

// providers
import { localesContext } from "../../../../localization/localization.provider";
import { placesContext } from "../../../providers/PlacesProvider/PlacesProvider";
import { userContext } from "../../../providers/UserProvider/UserProvider";
import { marketContext } from "../../../providers/MarketProvider/MarketProvider";
import { loadingContext } from "../../../providers/LoadingProvider/LoadingProvider";

// components
import { Header } from "../../../components/Header/Header";
import { Input } from "../../../components/Input/Input";
import { InputPhone } from "../../../components/InputPhone/InputPhone";
import { InputButton } from "../../../components/InputButton/InputButton";
import { ModalSheetPlace } from "../../../components/ModalSheetPlace/ModalSheetPlace";
import { SelectTwoButtons } from "../../../components/SelectTwoButtons/SelectTwoButtons";
import { BoxSelectImages } from "../../../components/BoxSelectImages/BoxSelectImages";
import { PriceCurrency } from "../../../components/PriceCurrency/PriceCurrency";
import { ModalSheetCategories } from "./components/ModalSheetCategories/ModalSheetCategories";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { BodyCategory } from "./components/BodyCategory/BodyCategory";
import { ModalShowErrors } from "../../../components/ModalShowErrors/ModalShowErrors";
import { ModalDelete } from "../../../components/ModalDelete/ModalDelete";

// hooks
import { useAuthorizationRegistration } from "../../../helps/useAuthorizationRegistration";
import { useErrors } from "../../../helps/useErrors";
import showErrors from "../../../helps/errors/showError";
import { useCategoriesMarket } from "../../../helps/useCategoriesMarket";

// constants
import {
  DEFAULT_CODE_COUNTRY,
  DEFAULT_COUNTRY,
} from "../../../constants/inputs.const";
import {
  NAME_AUTO_PARTS,
  NAME_MAIN_CATEGORIES,
  NAME_MOTO_PARTS,
} from "./MarketAdd.constants";

// icons
import { IconArrowRightEvent } from "../../../icons/components";

// styles
import { styles } from "./MarketAdd.styles";
import colors from "../../../../styles/colors";

type MarketAddProps = {
  navigation: NativeStackNavigationProp<RootAllScreensParamList>;
};

export const MarketAdd: FunctionComponent<MarketAddProps> = ({
  navigation,
}) => {
  const { params } =
    useRoute<
      RouteProp<RootMarketScreensParamList & RootSettingsScreensParamList>
    >();
  const { i18n } = useContext(localesContext);
  const { places } = useContext(placesContext);
  const { userData } = useContext(userContext);
  const { productsUser, addProduct, changeProduct, deleteProduct } =
    useContext(marketContext);
  const { setLoading } = useContext(loadingContext);
  const { verifyPhone } = useAuthorizationRegistration();
  const {
    getCategory,
    getBrandMoto,
    getBrandAuto,
    getFuelType,
    getTransmissionType,
    getMotoPart,
    getAutoPart,
  } = useCategoriesMarket(i18n);
  const { getErrorAddProduct } = useErrors(i18n);
  const { success, bug } = showErrors;
  const [title, setTitle] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(`+${DEFAULT_CODE_COUNTRY}`);
  const [telegram, setTelegram] = useState("");
  const [selectCountryIso, setSelectCountryIso] = useState(DEFAULT_COUNTRY);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [yearRelease, setYearRelease] = useState("");
  const [codeCurrency, setCodeCurrency] = useState<CodeCurrenciesType>("UAH");
  const [place, setPlace] = useState<PlaceType | null>(null);
  const [isShowSelectPlace, setIsShowSelectPlace] = useState(false);
  const [isCleared, setIsCleared] = useState(true);
  const [isNew, setIsNew] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [images, setImages] = useState<ImageType[]>([]);
  const [typeModal, setTypeModal] = useState<TypeModalCategories | null>(null);
  const [select, setSelect] = useState<Record<
    TypeModalCategories,
    TypeDataCategory | undefined
  > | null>(null);
  const [isShowErrors, setIsShowErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Record<
    string,
    { name: string; title: string }
  > | null>(null);
  const productUser = useMemo(
    () =>
      params?.productId
        ? productsUser.find((product) => product.id === params.productId)
        : null,
    [params?.productId]
  );

  const showTitlePlace = useMemo(() => {
    const country = places
      ? Object.keys(places)
          .map((placeKey) => places[placeKey])
          .find((country) => country.id === place?.countryId) || null
      : null;
    if (country && place)
      return `${country.title}, ${place.city}, ${place.address}`;
    return ``;
  }, [places, place]);

  const clearKeyError = (key: string) => {
    if (errorMessage && key in errorMessage) {
      const { [key]: _, ...otherErrorMessage } = errorMessage;
      if (Object.keys(otherErrorMessage).length === 0) setErrorMessage(null);
      else setErrorMessage(otherErrorMessage);
    }
    setIsChange(false);
  };

  const checkEnterData = () => {
    const isPhone = verifyPhone(phoneNumber, selectCountryIso).length === 0;
    const isTransport =
      select?.category?.id === 1 || select?.category?.id === 2;
    const isParts = select?.category?.id === 3 || select?.category?.id === 4;
    const errorsObject = getErrorAddProduct({
      title,
      description,
      place,
      isPhone,
      price,
      select,
      isTransport,
      isParts,
      mileage,
      yearRelease,
    });
    const isError = Object.keys(errorsObject).length > 0;
    if (isError) {
      setIsShowErrors(true);
      setErrorMessage(errorsObject);
    } else setErrorMessage(null);
    return isError;
  };

  const onSubmitPlace = (data: PlaceType) => {
    setPlace(data);
    setIsShowSelectPlace(false);
    clearKeyError("place");
  };

  const onSubmit = async () => {
    const isError = checkEnterData();
    if (userData?.id && !isError && place) {
      const currentImages = images.map((image) => ({
        id: image.id || "",
        url: image.url || "",
        width: image.width,
        height: image.height,
        image,
      }));
      const newProduct: Omit<ProductType, "id"> = {
        userId: userData?.id,
        title,
        isNew,
        isBusiness,
        place,
        images: currentImages,
        description,
        price: Number(price),
        codeCurrency,
        phoneNumber,
        telegram,
        moto:
          select?.category?.id === 1 &&
          select.brandMoto &&
          select.typeFuel &&
          select.typeTransmission
            ? {
                brandId: select.brandMoto.id,
                mileage: Number(mileage),
                yearRelease: Number(yearRelease),
                isCleared,
                typeFuelId: select.typeFuel.id,
                typeTransmissionId: select.typeTransmission.id,
              }
            : null,
        auto:
          select?.category?.id === 2 &&
          select.brandAuto &&
          select.typeFuel &&
          select.typeTransmission
            ? {
                brandId: select.brandAuto.id,
                mileage: Number(mileage),
                yearRelease: Number(yearRelease),
                isCleared,
                typeFuelId: select.typeFuel.id,
                typeTransmissionId: select.typeTransmission.id,
              }
            : null,
        motoParts:
          select?.category?.id === 3 && select.brandMoto && select.motoParts
            ? {
                brandId: select.brandMoto.id,
                typeId: select.motoParts.id,
              }
            : null,
        autoParts:
          select?.category?.id === 4 && select.brandAuto && select.autoParts
            ? {
                brandId: select.brandAuto.id,
                typeId: select.autoParts.id,
              }
            : null,
        updateAT: dayjs().valueOf(),
        quantityViews: 0,
        likeUserIds: productUser?.likeUserIds || [],
      };
      const isCreate = productUser
        ? await changeProduct({ ...productUser, ...newProduct })
        : await addProduct(newProduct);
      if (isCreate) {
        navigation.goBack();
        success(
          productUser
            ? i18n._("Product change successfully")
            : i18n._("Product created successfully")
        );
      } else
        bug(
          productUser
            ? i18n._("Error changing product")
            : i18n._("Error creating product")
        );
    }
  };

  const getProductUser = async () => {
    setLoading(true);
    if (params) {
      if (productUser) {
        setIsChange(true);
        const getCategoryFull = () => {
          if (productUser.moto) return getCategory(1);
          if (productUser.auto) return getCategory(2);
          if (productUser.motoParts) return getCategory(3);
          if (productUser.autoParts) return getCategory(4);
          return undefined;
        };
        const imagesWithBath64 = await Promise.all(
          productUser.images.map(async (image) => {
            const response = await FileSystem.downloadAsync(
              image.url,
              `${FileSystem.documentDirectory}temp.jpg`
            );
            const base64 = await FileSystem.readAsStringAsync(response.uri, {
              encoding: "base64",
            });
            return {
              id: image.id,
              url: image.url,
              width: image.width,
              height: image.height,
              base64,
            };
          })
        );
        setTitle(productUser.title);
        setPlace(productUser.place);
        setImages(imagesWithBath64);
        setIsNew(productUser.isNew);
        setIsBusiness(productUser.isBusiness);
        setSelect({
          category: getCategoryFull(),
          brandMoto: getBrandMoto(
            productUser.moto?.brandId || productUser.motoParts?.brandId
          ),
          brandAuto: getBrandAuto(
            productUser.auto?.brandId || productUser.autoParts?.brandId
          ),
          typeFuel: getFuelType(
            productUser.auto?.typeFuelId || productUser.moto?.typeFuelId
          ),
          typeTransmission: getTransmissionType(
            productUser.auto?.typeTransmissionId ||
              productUser.moto?.typeTransmissionId
          ),
          motoParts: getMotoPart(productUser.motoParts?.typeId),
          autoParts: getAutoPart(productUser.autoParts?.typeId),
        });
        setMileage(
          productUser.auto?.mileage.toString() ||
            productUser.moto?.mileage.toString() ||
            ""
        );
        setYearRelease(
          productUser.auto?.yearRelease.toString() ||
            productUser.moto?.yearRelease.toString() ||
            ""
        );
        setIsCleared(
          productUser.auto?.isCleared || productUser.moto?.isCleared || false
        );
        setDescription(productUser.description);
        setPrice(productUser.price.toString());
        setCodeCurrency(productUser.codeCurrency);
        setTelegram(productUser.telegram);
        setPhoneNumber(productUser.phoneNumber);
      }
    } else if (userData?.phoneNumber) setPhoneNumber(userData.phoneNumber);
    setLoading(false);
  };

  useEffect(() => {
    if (!isChange) {
      const brakeSelect: Record<string, TypeDataCategory | undefined> | null =
        select?.category ? { category: select.category } : null;
      setSelect(brakeSelect);
    }
  }, [select?.category]);

  useEffect(() => {
    getProductUser();
  }, [params]);

  return (
    <>
      <View style={styles.container}>
        <Header
          title={productUser ? i18n._("Change advert") : i18n._("Add advert")}
          onRightDelete={() => {
            setIsShowDeleteModal(true);
          }}
        />
        <ScrollView style={styles.body}>
          <Input
            isSelect
            placeholder={i18n._("Enter the name of the advert")}
            label={i18n._("Advert name")}
            value={title}
            onChange={(value) => {
              clearKeyError("title");
              setTitle(value);
            }}
            errorMessage={errorMessage?.title ? errorMessage.title.title : ""}
          />
          <InputButton
            isSelect
            placeholder={i18n._("Category")}
            value={select?.category?.name || i18n._("Category")}
            onPress={() => {
              setTypeModal(NAME_MAIN_CATEGORIES);
            }}
            rightElementInput={
              <IconArrowRightEvent
                width={15}
                height={15}
                fill={colors.blackCoffee}
              />
            }
            containerStyle={styles.containerStyleInputButton}
            inputWrapperStyle={styles.inputWrapperStyleInputButton}
            errorMessage={
              errorMessage?.category ? errorMessage.category.title : ""
            }
          />
          <SelectTwoButtons
            isSelectFirst={isNew}
            titleFirst={i18n._("New")}
            titleSecond={i18n._("Used")}
            label={i18n._("The state of the goods:")}
            onPressFirst={() => {
              clearKeyError("isNew");
              setIsNew(true);
            }}
            onPressSecond={() => {
              clearKeyError("isNew");
              setIsNew(false);
            }}
            containerStyle={styles.containerTwoButtons}
          />
          <SelectTwoButtons
            isSelectFirst={!isBusiness}
            titleFirst={i18n._("Private individual")}
            titleSecond={i18n._("Business")}
            label={i18n._("Seller:")}
            onPressFirst={() => {
              setPlace(null);
              clearKeyError("isBusiness");
              setIsBusiness(false);
            }}
            onPressSecond={() => {
              setPlace(null);
              clearKeyError("isBusiness");
              setIsBusiness(true);
            }}
            containerStyle={styles.containerTwoButtons}
          />
          <InputButton
            isSelect
            label={i18n._("Location")}
            placeholder={i18n._("Choose a city")}
            value={showTitlePlace}
            onPress={() => {
              setIsShowSelectPlace(true);
            }}
            rightElementInput={
              <IconArrowRightEvent
                width={15}
                height={15}
                fill={colors.blackCoffee}
              />
            }
            containerStyle={styles.containerStyleInputButton}
            inputWrapperStyle={styles.inputWrapperStyleInputButton}
            errorMessage={errorMessage?.place ? errorMessage.place.title : ""}
          />
          <BodyCategory
            select={select}
            setTypeModal={setTypeModal}
            mileage={mileage}
            setMileage={setMileage}
            yearRelease={yearRelease}
            setYearRelease={setYearRelease}
            isCleared={isCleared}
            setIsCleared={setIsCleared}
            errorMessage={errorMessage}
            clearKeyError={clearKeyError}
          />
          <BoxSelectImages isSubTitle images={images} setImages={setImages} />
          <Input
            placeholder={i18n._("Add a description about the product")}
            label={i18n._("Product description")}
            value={description}
            onChange={(value) => {
              clearKeyError("description");
              setDescription(value);
            }}
            containerStyle={styles.containerStyle}
            customStyles={styles.customStylesInput}
            maxLength={9000}
            errorMessage={
              errorMessage?.description ? errorMessage.description.title : ""
            }
          />
          <PriceCurrency
            value={price}
            onChange={setPrice}
            code={codeCurrency}
            setCode={setCodeCurrency}
            errorMessage={errorMessage?.price?.title}
            clearKeyError={clearKeyError}
          />
          <View style={styles.containerContacts}>
            <Text style={styles.titleContacts}>
              <Trans>Your contact information</Trans>*:
            </Text>
            <Input
              isSelect
              placeholder={i18n._("@fgt_com")}
              label={i18n._("Your telegram")}
              value={telegram}
              onChange={(value) => {
                clearKeyError("telegram");
                setTelegram(value);
              }}
              errorMessage={
                errorMessage?.telegram ? errorMessage.telegram.title : ""
              }
              labelStyle={styles.labelInputContacts}
            />
            <InputPhone
              label={i18n._("Phone number*:")}
              phoneNumber={phoneNumber}
              setPhoneNumber={(value) => {
                clearKeyError("phoneNumber");
                setPhoneNumber(value);
              }}
              selectCountryIso={selectCountryIso}
              setSelectCountryIso={setSelectCountryIso}
              labelStyle={styles.labelInputContacts}
              errorMessage={
                errorMessage?.phoneNumber ? errorMessage.phoneNumber.title : ""
              }
            />
          </View>
          <ButtonCustom
            title={i18n._("Publish")}
            onSubmit={onSubmit}
            styleContainer={styles.containerButtonSubmit}
          />
          <View style={styles.containerEmpty} />
        </ScrollView>
      </View>
      <ModalSheetPlace
        place={place || productUser?.place}
        isExactLocation={isBusiness}
        isOpen={isShowSelectPlace}
        title={i18n._("Location")}
        onClose={() => {
          clearKeyError("place");
          setIsShowSelectPlace(false);
        }}
        onSubmit={onSubmitPlace}
      />
      <ModalSheetCategories
        type={typeModal}
        selectData={select}
        onClose={() => {
          setTypeModal(null);
        }}
        onSubmit={(type, selectData) => {
          const newSelectList: Record<string, TypeDataCategory | undefined> =
            select ? { ...select, [type]: selectData } : { [type]: selectData };
          if (type === NAME_MOTO_PARTS || type === NAME_AUTO_PARTS)
            clearKeyError("typeParts");
          else clearKeyError(type);
          setSelect(newSelectList);
        }}
      />
      <ModalShowErrors
        isOpen={isShowErrors}
        onClose={() => {
          setIsShowErrors(false);
        }}
        errors={errorMessage}
      />
      <Modal visible={isShowDeleteModal} transparent>
        <ModalDelete
          onClose={() => {
            setIsShowDeleteModal(false);
          }}
          onSubmit={async () => {
            if (productUser?.id) {
              await deleteProduct(productUser.id, "user");
              setIsShowDeleteModal(false);
            }
          }}
        />
      </Modal>
    </>
  );
};
