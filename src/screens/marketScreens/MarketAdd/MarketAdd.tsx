import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { Trans } from "@lingui/macro";

// types
import { PlaceType } from "../../../providers/PlacesProvider/PlacesProvider.types";
import { ImageType } from "../../../components/ImageModal/ImageModal.types";
import { CodeCurrenciesType } from "../../../providers/PaymentProvider/PaymentProvider.types";
import { TypeDataCategory, TypeModalCategories } from "./MarketAdd.types";

// providers
import { localesContext } from "../../../../localization/localization.provider";
import { placesContext } from "../../../providers/PlacesProvider/PlacesProvider";
import { paymentContext } from "../../../providers/PaymentProvider/PaymentProvider";

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

// hooks
import { useAuthorizationRegistration } from "../../../helps/useAuthorizationRegistration";
import { useErrors } from "../../../helps/useErrors";

// constants
import {
  DEFAULT_CODE_COUNTRY,
  DEFAULT_COUNTRY,
} from "../../../constants/inputs.const";
import { NAME_MAIN_CATEGORIES } from "./MarketAdd.constants";

// icons
import { IconArrowRightEvent } from "../../../icons/components";

// styles
import { styles } from "./MarketAdd.styles";
import colors from "../../../../styles/colors";

export const MarketAdd: FunctionComponent = () => {
  const { i18n } = useContext(localesContext);
  const { places } = useContext(placesContext);
  const { listCurrency } = useContext(paymentContext);
  const { verifyPhone } = useAuthorizationRegistration();
  const { getErrorText } = useErrors(i18n);
  const [phoneNumber, setPhoneNumber] = useState(`+${DEFAULT_CODE_COUNTRY}`);
  const [selectCountryIso, setSelectCountryIso] = useState(DEFAULT_COUNTRY);
  const [title, setTitle] = useState("");
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
  const [images, setImages] = useState<ImageType[]>([]);
  const [typeModal, setTypeModal] = useState<TypeModalCategories | null>(null);
  const [select, setSelect] = useState<Record<
    TypeModalCategories,
    TypeDataCategory | undefined
  > | null>(null);
  const [errorMessage, setErrorMessage] = useState<Record<
    string,
    { name: string; title: string }
  > | null>(null);
  console.log("select", select);

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
      if (Object.keys(otherErrorMessage).length <= 2) setErrorMessage(null);
      else setErrorMessage(otherErrorMessage);
    }
  };

  const checkEnterData = () => {
    const isPhone = verifyPhone(phoneNumber, selectCountryIso).length === 0;
    const errorsObject = {
      ...((title.length < 5 || title.length > 40) && {
        title: getErrorText("title", {
          min: 5,
          max: 40,
          otherName: i18n._("advert"),
        }),
      }),
      ...(place === null && {
        place: getErrorText("place", {
          otherName: i18n._("advert"),
        }),
      }),
      ...(!isPhone && {
        phoneNumber: getErrorText("phoneNumber", {
          otherName: i18n._("advert"),
        }),
      }),
    };
    const isError = Object.keys(errorsObject).length > 0;
    if (isError) {
      const errorMessage = getErrorText("errorMessage", {});
      const onlyErrors = Object.values(errorsObject).map(
        (errorObject) => `${errorObject.name}: ${errorObject.title}`
      );
      Alert.alert(`${errorMessage.title}:\n\n${onlyErrors.join("\n\n")}`);
      setErrorMessage({
        ...errorsObject,
        errorMessage,
      });
    } else setErrorMessage(null);
    return isError;
  };

  const onSubmitPlace = (data: PlaceType) => {
    setPlace(data);
    setIsShowSelectPlace(false);
    clearKeyError("place");
  };

  const onSubmit = () => {
    const isError = checkEnterData();
    console.log("isError", isError);
  };

  useEffect(() => {
    const brakeSelect: Record<string, TypeDataCategory | undefined> | null =
      select?.category ? { category: select.category } : null;
    setSelect(brakeSelect);
  }, [select?.category]);

  return (
    <>
      <View style={styles.container}>
        <Header title={i18n._("Add advert")} />
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
                height={20}
                fill={colors.blackCoffee}
              />
            }
            containerStyle={styles.containerStyleInputButton}
            inputWrapperStyle={styles.inputWrapperStyleInputButton}
            errorMessage={errorMessage?.place ? errorMessage.place.title : ""}
          />
          <SelectTwoButtons
            isSelectFirst={isNew}
            titleFirst={i18n._("New")}
            titleSecond={i18n._("Used")}
            label={i18n._("The state of the goods:")}
            onPressFirst={() => {
              setIsNew(true);
            }}
            onPressSecond={() => {
              setIsNew(false);
            }}
          />
          <SelectTwoButtons
            isSelectFirst={!isBusiness}
            titleFirst={i18n._("Private individual")}
            titleSecond={i18n._("Business")}
            label={i18n._("Seller:")}
            onPressFirst={() => {
              setPlace(null);
              setIsBusiness(false);
            }}
            onPressSecond={() => {
              setPlace(null);
              setIsBusiness(true);
            }}
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
                height={20}
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
          />
          <View style={styles.containerContacts}>
            <Text style={styles.titleContacts}>
              <Trans>Your contact information</Trans>*:
            </Text>
            <Input
              isSelect
              placeholder={i18n._("@fgt_com")}
              label={i18n._("Your telegram")}
              value={title}
              onChange={(value) => {
                clearKeyError("title");
                setTitle(value);
              }}
              errorMessage={errorMessage?.title ? errorMessage.title.title : ""}
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
        isExactLocation={isBusiness}
        isOpen={isShowSelectPlace}
        title={i18n._("Location")}
        onClose={() => {
          setIsShowSelectPlace(false);
        }}
        onSubmit={onSubmitPlace}
      />
      <ModalSheetCategories
        type={typeModal}
        onClose={() => {
          setTypeModal(null);
        }}
        onSubmit={(type, selectData) => {
          const newSelectList: Record<string, TypeDataCategory | undefined> =
            select ? { ...select, [type]: selectData } : { [type]: selectData };
          setSelect(newSelectList);
        }}
      />
    </>
  );
};
