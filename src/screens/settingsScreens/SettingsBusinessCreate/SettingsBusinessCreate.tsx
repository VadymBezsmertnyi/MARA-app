import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { RouteProp, useRoute } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

// types
import {
  RootAllScreensParamList,
  RootSettingsScreensParamList,
} from "../../../navigators/Navigators.types";

// providers
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { usePlacesProvider } from "../../../providers/PlacesProvider/PlacesProvider";
import { useBusinessProvider } from "../../../providers/BusinessProvider/BusinessProvider";
import { useUserProvider } from "../../../providers/UserProvider/UserProvider";
import {
  useDropDownAlertProvider,
  DropdownAlertType,
} from "../../../providers/DropDownAlertProvider/DropDownAlertProvider";

// components
import { Header } from "../../../components/Header/Header";
import { ImageProfile } from "../../../components/ImageProfile/ImageProfile";
import { Input } from "../../../components/Input/Input";
import { InputButton } from "../../../components/InputButton/InputButton";
import { ModalSheetSearchPlaceAddress } from "../../../components/ModalSheetSearchPlaceAddress/ModalSheetSearchPlaceAddress";
import { ItemSearchPlaceAddressType } from "../../../components/ModalSheetSearchPlaceAddress/ModalSheetSearchPlaceAddress.types";
import { InputPhoneMessengers } from "../../../components/InputPhoneMessengers/InputPhoneMessengers";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { ModalShowErrors } from "../../../components/ModalShowErrors/ModalShowErrors";
import { ImageType } from "../../../components/ImageModal/ImageModal.types";

// hooks
import { useAuthorizationRegistration } from "../../../helps/useAuthorizationRegistration";
import { useErrors } from "../../../helps/useErrors";
import { compressAndProcessImages } from "../../../helps/helps";

// icons
import { IconMapGradient } from "../../../icons/components";

// styles
import { styles } from "./SettingsBusinessCreate.styles";
import {
  DEFAULT_CODE_COUNTRY,
  DEFAULT_COUNTRY,
} from "../../../constants/inputs.const";
import { useLoadingProvider } from "../../../providers/LoadingProvider/LoadingProvider";

type SettingsBusinessCreateProps = {
  navigation: NativeStackNavigationProp<RootAllScreensParamList> &
    DrawerNavigationProp<RootAllScreensParamList>;
};

type ErrorMessageType = Record<string, { name: string; title: string }>;

const DEFAULT_DATA_PHONE_NUMBER = {
  phoneNumber: `+${DEFAULT_CODE_COUNTRY}`,
  selectCountryIso: DEFAULT_COUNTRY,
  isTelegram: false,
  isWhatsApp: false,
  isViber: false,
};

const DEFAULT_DATA_PHONE_NUMBERS = [
  DEFAULT_DATA_PHONE_NUMBER,
  DEFAULT_DATA_PHONE_NUMBER,
];

export const SettingsBusinessCreate: FunctionComponent<
  SettingsBusinessCreateProps
> = ({ navigation }) => {
  const { params } = useRoute<RouteProp<RootSettingsScreensParamList>>();
  const { setLoading } = useLoadingProvider();
  const { messageFromServer } = useDropDownAlertProvider();
  const { i18n, language } = useLocalesProvider();
  const { heightStatusBar } = useThemeProvider();
  const { userData } = useUserProvider();
  const { placesDB, getPlace } = usePlacesProvider();
  const { businessMarketUser, onCreateBusinessMarket, onUpdateBusinessMarket } =
    useBusinessProvider();
  const { verifyPhone } = useAuthorizationRegistration();
  const { getErrorText } = useErrors(i18n);
  const [name, setName] = useState<string>("");
  const [place, setPlace] = useState<ItemSearchPlaceAddressType | null>(null);
  const [isShowSelectPlace, setIsShowSelectPlace] = useState(false);
  const [mainPhoneNumber, setMainPhoneNumber] = useState(
    DEFAULT_DATA_PHONE_NUMBER
  );
  const [otherPhoneNumbers, setOtherPhoneNumbers] = useState(
    DEFAULT_DATA_PHONE_NUMBERS
  );
  const [isShowErrors, setIsShowErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessageType | null>(
    null
  );
  const [logo, setLogo] = useState<
    ImageType | ImagePicker.ImagePickerAsset | null
  >(null);

  const selectBusinessMarket = useMemo(() => {
    if (!params?.businessMarketId) return null;
    if (!businessMarketUser) return null;
    if (businessMarketUser._id !== params.businessMarketId) return null;
    return businessMarketUser;
  }, [params?.businessMarketId, businessMarketUser]);
  const showTitlePlace = useMemo(() => {
    if (!place) return "";
    const findPlace =
      placesDB.find(
        (placeDB) =>
          placeDB._id === place.placeId || placeDB.place_id === place.placeId
      ) || null;
    if (!findPlace) {
      getPlace(place.placeId);
      return place.title;
    }
    return findPlace[language].formatted_address;
  }, [placesDB, place, language]);
  const containerStyles = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }],
    [heightStatusBar]
  );

  const clearKeyError = (key: string) => {
    if (errorMessage && key in errorMessage) {
      const { [key]: _, ...otherErrorMessage } = errorMessage;
      if (Object.keys(otherErrorMessage).length === 0) setErrorMessage(null);
      else setErrorMessage(otherErrorMessage);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      const compressImages = await compressAndProcessImages(result);
      setLogo({ ...compressImages[0], uri: result.assets[0].uri });
    } else
      messageFromServer(
        i18n._("Sorry, an error occurred"),
        i18n._("Error"),
        DropdownAlertType.Warn
      );
  };

  const onSubmitPlace = (data: ItemSearchPlaceAddressType) => {
    setPlace(data);
    setIsShowSelectPlace(false);
    clearKeyError("place");
  };

  const checkEnterData = () => {
    const isPhoneMain =
      verifyPhone(mainPhoneNumber.phoneNumber, mainPhoneNumber.selectCountryIso)
        .length === 0;
    const errorsObject = {
      ...((name.length < 5 || name.length > 30) && {
        title: getErrorText("title", {
          min: 5,
          max: 40,
          otherName: i18n._("business"),
        }),
      }),
      ...(place === null && {
        place: getErrorText("place", {
          otherName: i18n._("business"),
        }),
      }),
      ...(!isPhoneMain && {
        phoneNumber: getErrorText("phoneNumber", {
          otherName: i18n._("business"),
        }),
      }),
    };
    const isError = Object.keys(errorsObject).length > 0;
    if (isError) {
      setIsShowErrors(true);
      setErrorMessage(errorsObject);
    } else setErrorMessage(null);
    return isError;
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const isError = checkEnterData();
      const currentPhoneNumbers = otherPhoneNumbers.filter((otherPhone) => {
        const isPhone =
          verifyPhone(otherPhone.phoneNumber, otherPhone.selectCountryIso)
            .length === 0;
        return isPhone;
      });
      if (!isError && place && userData) {
        const newBusiness = {
          name,
          place,
          mainPhoneNumber,
          otherPhoneNumbers: currentPhoneNumbers.length
            ? currentPhoneNumbers
            : null,
          userId: userData._id,
        };
        const result = selectBusinessMarket
          ? await onUpdateBusinessMarket({
              ...newBusiness,
              logo: selectBusinessMarket.logo,
              _id: selectBusinessMarket._id,
              newLogo:
                logo?.base64 && logo?.uri !== selectBusinessMarket.logo?.url
                  ? { ...logo, base64: logo.base64 || "" }
                  : null,
            })
          : await onCreateBusinessMarket({
              ...newBusiness,
              newLogo: logo?.base64
                ? { ...logo, base64: logo.base64 || "" }
                : null,
            });
        if (result) navigation.goBack();
      }
    } catch (error) {
      if (__DEV__) console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  const setBusinessMarket = async () => {
    if (!selectBusinessMarket) return;
    setName(selectBusinessMarket.name);
    if (selectBusinessMarket.place?.place_id) {
      const title =
        selectBusinessMarket.place.place_id[language].formatted_address || "";
      setPlace({
        placeId: selectBusinessMarket.place.place_id.place_id,
        title,
        address: selectBusinessMarket.place.place_address,
        coordinates: selectBusinessMarket.place.coordinates,
      });
    }
    setMainPhoneNumber(selectBusinessMarket.mainPhoneNumber);
    if (selectBusinessMarket.otherPhoneNumbers)
      setOtherPhoneNumbers([
        ...selectBusinessMarket.otherPhoneNumbers,
        ...DEFAULT_DATA_PHONE_NUMBERS.slice(
          selectBusinessMarket.otherPhoneNumbers.length
        ),
      ]);
    setMainPhoneNumber(selectBusinessMarket.mainPhoneNumber);
    if (selectBusinessMarket.logo) {
      const response = await FileSystem.downloadAsync(
        selectBusinessMarket.logo.url,
        `${FileSystem.documentDirectory}temp.jpg`
      );
      const base64 = await FileSystem.readAsStringAsync(response.uri, {
        encoding: "base64",
      });
      setLogo({
        ...selectBusinessMarket.logo,
        uri: selectBusinessMarket.logo.url,
        base64,
      });
    }
  };

  useEffect(() => {
    if (selectBusinessMarket) setBusinessMarket();
  }, [selectBusinessMarket]);

  return (
    <KeyboardAvoidingView
      contentContainerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
      behavior="padding"
    >
      <View style={containerStyles}>
        <Header
          title={i18n._("Business profile")}
          isShowRight
          rightStyle={styles.containerRightHeader}
        />
        <ScrollView contentContainerStyle={styles.containerMain}>
          <View style={styles.containerLogo}>
            <ImageProfile
              imageSource={logo}
              onChangePhoto={pickImage}
              pickImage={pickImage}
            />
          </View>
          <Input
            label={i18n._("Name company")}
            placeholder={i18n._("Enter the name of your business")}
            value={name}
            onChange={(value) => {
              setName(value);
              clearKeyError("title");
            }}
            containerStyle={styles.containerInput}
            labelStyle={styles.labelInput}
            isSelect
            errorMessage={errorMessage?.title?.title || ""}
          />
          <InputButton
            label={`${i18n._("City")}:`}
            placeholder={i18n._("Select the city")}
            onPress={() => {
              setIsShowSelectPlace(true);
            }}
            value={showTitlePlace}
            InputIcon={<IconMapGradient width={42} height={32} />}
            containerStyle={styles.containerStyleInputButton}
            inputWrapperStyle={styles.inputWrapperStyleInputButton}
            labelStyle={styles.labelInput}
            errorMessage={errorMessage?.place?.title || ""}
          />
          <InputPhoneMessengers
            label={i18n._("Phone number")}
            phoneNumber={mainPhoneNumber.phoneNumber}
            setPhoneNumber={(phoneNumber) => {
              clearKeyError("phoneNumber");
              setMainPhoneNumber((state) => ({ ...state, phoneNumber }));
            }}
            selectCountryIso={mainPhoneNumber.selectCountryIso}
            setSelectCountryIso={(selectCountryIso) => {
              setMainPhoneNumber((state) => ({ ...state, selectCountryIso }));
            }}
            isViber={mainPhoneNumber.isViber}
            setIsViber={(isViber) => {
              setMainPhoneNumber((state) => ({ ...state, isViber }));
            }}
            isWhatsApp={mainPhoneNumber.isWhatsApp}
            setIsWhatsApp={(isWhatsApp) => {
              setMainPhoneNumber((state) => ({ ...state, isWhatsApp }));
            }}
            isTelegram={mainPhoneNumber.isTelegram}
            setIsTelegram={(isTelegram) => {
              setMainPhoneNumber((state) => ({ ...state, isTelegram }));
            }}
            labelStyle={styles.labelInputOtherPhone}
            errorMessage={errorMessage?.phoneNumber?.title || ""}
          />
          {otherPhoneNumbers.map((otherPhoneNumber, index) => (
            <InputPhoneMessengers
              key={`other-phone-number-${index + 1}`}
              label={i18n._("Additional number {numberOtherPhone}", {
                numberOtherPhone: index + 1,
              })}
              phoneNumber={otherPhoneNumber.phoneNumber}
              setPhoneNumber={(phoneNumber) => {
                setOtherPhoneNumbers((state) =>
                  state.map((item, indexState) =>
                    indexState === index ? { ...item, phoneNumber } : item
                  )
                );
              }}
              selectCountryIso={otherPhoneNumber.selectCountryIso}
              setSelectCountryIso={(selectCountryIso) => {
                setOtherPhoneNumbers((state) =>
                  state.map((item, indexState) =>
                    indexState === index ? { ...item, selectCountryIso } : item
                  )
                );
              }}
              isViber={otherPhoneNumber.isViber}
              setIsViber={(isViber) => {
                setOtherPhoneNumbers((state) =>
                  state.map((item, indexState) =>
                    indexState === index ? { ...item, isViber } : item
                  )
                );
              }}
              isWhatsApp={otherPhoneNumber.isWhatsApp}
              setIsWhatsApp={(isWhatsApp) => {
                setOtherPhoneNumbers((state) =>
                  state.map((item, indexState) =>
                    indexState === index ? { ...item, isWhatsApp } : item
                  )
                );
              }}
              isTelegram={otherPhoneNumber.isTelegram}
              setIsTelegram={(isTelegram) => {
                setOtherPhoneNumbers((state) =>
                  state.map((item, indexState) =>
                    indexState === index ? { ...item, isTelegram } : item
                  )
                );
              }}
              containerStyle={styles.containerInputOtherPhone}
              labelStyle={styles.labelInputOtherPhone}
              containerStyleCheckbox={styles.checkboxInputOtherPhone}
            />
          ))}
          <View style={styles.containerButton}>
            <ButtonCustom
              disabled={
                errorMessage ? Object.values(errorMessage).length > 1 : false
              }
              title={i18n._("Save")}
              onSubmit={onSubmit}
            />
          </View>
        </ScrollView>
      </View>
      <ModalSheetSearchPlaceAddress
        isOpen={isShowSelectPlace}
        onClose={() => {
          setIsShowSelectPlace(false);
        }}
        onSubmit={onSubmitPlace}
        statePlace={undefined}
      />
      <ModalShowErrors
        isOpen={isShowErrors}
        onClose={() => {
          setIsShowErrors(false);
        }}
        errors={errorMessage}
      />
    </KeyboardAvoidingView>
  );
};
