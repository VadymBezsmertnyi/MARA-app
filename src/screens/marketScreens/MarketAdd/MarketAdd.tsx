import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import { Alert, View } from "react-native";

// types
import { PlaceType } from "../../../providers/PlacesProvider/PlacesProvider.types";

// providers
import { localesContext } from "../../../../localization/localization.provider";
import { placesContext } from "../../../providers/PlacesProvider/PlacesProvider";

// components
import { Header } from "../../../components/Header/Header";
import { Input } from "../../../components/Input/Input";
import { InputPhone } from "../../../components/InputPhone/InputPhone";
import { InputButton } from "../../../components/InputButton/InputButton";

// hooks
import { useAuthorizationRegistration } from "../../../helps/useAuthorizationRegistration";
import { useErrors } from "../../../helps/useErrors";

// constants
import {
  DEFAULT_CODE_COUNTRY,
  DEFAULT_COUNTRY,
} from "../../../constants/inputs.const";

// styles
import { styles } from "./MarketAdd.styles";
import { ModalSheetPlace } from "../../../components/ModalSheetPlace/ModalSheetPlace";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { SelectTwoButtons } from "../../../components/SelectTwoButtons/SelectTwoButtons";

export const MarketAdd: FunctionComponent = () => {
  const { i18n } = useContext(localesContext);
  const { places } = useContext(placesContext);
  const { verifyPhone } = useAuthorizationRegistration();
  const { getErrorText } = useErrors(i18n);
  const [phoneNumber, setPhoneNumber] = useState(`+${DEFAULT_CODE_COUNTRY}`);
  const [selectCountryIso, setSelectCountryIso] = useState(DEFAULT_COUNTRY);
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState<PlaceType | null>(null);
  const [isShowSelectPlace, setIsShowSelectPlace] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Record<
    string,
    { name: string; title: string }
  > | null>(null);

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
          otherName: i18n._("workshop"),
        }),
      }),
      ...(place === null && {
        place: getErrorText("place", {
          otherName: i18n._("workshop"),
        }),
      }),
      ...(!isPhone && {
        phoneNumber: getErrorText("phoneNumber", {
          otherName: i18n._("workshop"),
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

  return (
    <>
      <View style={styles.container}>
        <Header title={i18n._("Add ad")} />
        <View style={styles.body}>
          <Input
            isSelect
            placeholder={i18n._("Enter the name of the ad")}
            label={i18n._("Ad name")}
            value={title}
            onChange={(value) => {
              clearKeyError("title");
              setTitle(value);
            }}
            errorMessage={errorMessage?.title ? errorMessage.title.title : ""}
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
            labelStyle={styles.labelInput}
            errorMessage={
              errorMessage?.phoneNumber ? errorMessage.phoneNumber.title : ""
            }
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
            containerStyle={styles.containerStyleInputButton}
            inputWrapperStyle={styles.inputWrapperStyleInputButton}
            errorMessage={errorMessage?.place ? errorMessage.place.title : ""}
          />
        </View>
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
    </>
  );
};
