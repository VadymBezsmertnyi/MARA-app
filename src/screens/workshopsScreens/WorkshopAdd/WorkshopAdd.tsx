import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import { Alert, Modal, ScrollView, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//types
import { ImageType } from "../../../providers/ModalsProvider/ModalsProvider.types";
import { PlaceType } from "../../../providers/PlacesProvider/PlacesProvider.types";
import { RootAllScreensParamList } from "../../../navigators/Navigators.types";

// providers
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";
import { localesContext } from "../../../../localization/localization.provider";
import { useWorkshopsProvider } from "../../../providers/WorkshopsProvider/useWorkshopsProvider.constants";
import { userContext } from "../../../providers/UserProvider/UserProvider";
import { workshopsContext } from "../../../providers/WorkshopsProvider/WorkshopsProvider";
import { placesContext } from "../../../providers/PlacesProvider/PlacesProvider";

// components
import { Header } from "../../../components/Header/Header";
import { InputButton } from "../../../components/InputButton/InputButton";
import { Input } from "../../../components/Input/Input";
import { InputPhone } from "../../../components/InputPhone/InputPhone";
import { IconArrowRightEvent } from "../../../icons/components";
import { ModalSheetTypeWorkshops } from "../../../components/ModalSheetTypeWorkshops/ModalSheetTypeWorkshops";
import { ModalSheetTypesAutoWorks } from "../../../components/ModalSheetTypesAutoWorks/ModalSheetTypesAutoWorks";
import { ModalSheetTypesMotoWorks } from "../../../components/ModalSheetTypesMotoWorks/ModalSheetTypesMotoWorks";
import { ImagesSelect } from "../../../components/ImagesSelect/ImagesSelect";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { ModalSheetPlace } from "../../../components/ModalSheetPlace/ModalSheetPlace";

// helps
import { useAuthorizationRegistration } from "../../../helps/useAuthorizationRegistration";
import { getErrorText } from "./WorkshopAdd.helps";
import { getClearValue } from "../../../helps/regexp";
import showErrors from "../../../helps/errors/showError";

// constants
import {
  DEFAULT_CODE_COUNTRY,
  DEFAULT_COUNTRY,
} from "../../../constants/inputs.const";

// styles
import { styles } from "./WorkshopAdd.styles";
import colors from "../../../../styles/colors";

type WorkshopAddProps = {
  navigation: NativeStackNavigationProp<RootAllScreensParamList>;
};

export const WorkshopAdd: FunctionComponent<WorkshopAddProps> = ({
  navigation,
}) => {
  const { i18n } = useContext(localesContext);
  const { heightStatusBar } = useContext(themeContext);
  const { addWorkshop } = useContext(workshopsContext);
  const { userData } = useContext(userContext);
  const { places } = useContext(placesContext);
  const { typesWorkServices } = useWorkshopsProvider();
  const { verifyPhone } = useAuthorizationRegistration();
  const { success, bug } = showErrors;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(`+${DEFAULT_CODE_COUNTRY}`);
  const [selectCountryIso, setSelectCountryIso] = useState(DEFAULT_COUNTRY);
  const [place, setPlace] = useState<PlaceType | null>(null);
  const [isShowTypeWorkshops, setIsShowTypeWorkshops] = useState(false);
  const [isShowTypesMotoWorks, setIsShowTypesMotoWorks] = useState(false);
  const [isShowTypesAutoWorks, setIsShowTypesAutoWorks] = useState(false);
  const [isShowSelectPlace, setIsShowSelectPlace] = useState(false);
  const [typeWorkshops, setTypeWorkshops] = useState({
    moto: false,
    auto: false,
  });
  const [selectMotoTypesWorks, setSelectMotoTypesWorks] = useState<number[]>(
    []
  );
  const [selectAutoTypesWorks, setSelectAutoTypesWorks] = useState<number[]>(
    []
  );
  const [images, setImages] = useState<ImageType[]>([]);
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

  const containerStyles = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }],
    [heightStatusBar]
  );
  const valueTypesWork = useMemo(() => {
    const selectMotoTypes = selectMotoTypesWorks.map(
      (idTypeWork) =>
        typesWorkServices.moto.find((typeWork) => typeWork.id === idTypeWork)
          ?.title || i18n._("Not information")
    );
    const selectAutoTypes = selectAutoTypesWorks.map(
      (idTypeWork) =>
        typesWorkServices.auto.find((typeWork) => typeWork.id === idTypeWork)
          ?.title || i18n._("Not information")
    );
    const valueMoto = selectMotoTypes.length
      ? `${i18n._("Moto")}: ${selectMotoTypes.join("/")}`
      : "";
    const valueAuto = selectAutoTypes.length
      ? `${i18n._("Auto")}: ${selectAutoTypes.join("/")}`
      : "";

    if (valueMoto.length && valueAuto.length)
      return `${valueMoto}\n${valueAuto}`;
    if (valueMoto.length) return valueMoto;
    return valueAuto;
  }, [selectAutoTypesWorks, selectMotoTypesWorks]);

  const valueTypesWorkshops = useMemo(() => {
    if (typeWorkshops.auto && typeWorkshops.moto)
      return i18n._("All workshops");
    else if (typeWorkshops.moto) return i18n._("Repair of motorcycles");
    else if (typeWorkshops.auto) return i18n._("Repair of automobiles");
    return "";
  }, [typeWorkshops]);

  const checkEnterData = () => {
    const isPhone = verifyPhone(phoneNumber, selectCountryIso).length === 0;
    const errorsObject = {
      ...((title.length < 5 || title.length > 40) && {
        title: getErrorText("title", i18n),
      }),
      ...(place === null && {
        place: getErrorText("place", i18n),
      }),
      ...((description.length < 200 || description.length > 9000) && {
        description: getErrorText("description", i18n),
      }),
      ...(!isPhone && {
        phoneNumber: getErrorText("phoneNumber", i18n),
      }),
      ...(selectMotoTypesWorks.length === 0 &&
        selectAutoTypesWorks.length === 0 && {
          types: getErrorText("types", i18n),
        }),
    };
    const isError = Object.keys(errorsObject).length > 0;
    if (isError) {
      const errorMessage = getErrorText("errorMessage", i18n);
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

  const onSubmitTypeWorkshop = () => {
    if (!typeWorkshops.moto) setSelectMotoTypesWorks([]);
    if (!typeWorkshops.auto) setSelectAutoTypesWorks([]);
    setIsShowTypeWorkshops(false);
  };

  const onPressSelectTypesWork = () => {
    if (typeWorkshops.moto) setIsShowTypesMotoWorks(true);
    else if (typeWorkshops.auto) setIsShowTypesAutoWorks(true);
  };

  const onSubmitMotoTypeWorks = () => {
    setIsShowTypesMotoWorks(false);
    if (typeWorkshops.auto) setIsShowTypesAutoWorks(true);
  };

  const onSubmitAutoTypeWorks = () => {
    setIsShowTypesAutoWorks(false);
  };

  const onSaveWorkshop = async () => {
    const isError = checkEnterData();
    if (
      userData &&
      place &&
      (selectMotoTypesWorks.length || selectAutoTypesWorks.length) &&
      !isError
    ) {
      const clearPhoneNumber = getClearValue(phoneNumber);
      const currentImages = images.map((image) => ({
        id: image.id || "",
        url: image.url || "",
        width: image.width,
        height: image.height,
        image,
      }));
      const newWorkshop = {
        userId: userData.id,
        title,
        description,
        phoneNumber: clearPhoneNumber,
        place,
        motoTypesWorks: selectMotoTypesWorks,
        autoTypesWorks: selectAutoTypesWorks,
        images: currentImages,
        comments: [],
        dataCreate: new Date().getTime(),
        rating: null,
      };
      const isCreate = await addWorkshop(newWorkshop);
      if (isCreate) {
        navigation.goBack();
        success(i18n._("Workshop created successfully"));
      } else bug(i18n._("Error creating workshop"));
    }
  };

  return (
    <>
      <View style={containerStyles}>
        <Header title={i18n._("Add workshop")} />
        <ScrollView>
          <View style={styles.containerInputs}>
            <Input
              placeholder={i18n._("Enter the name of the workshop")}
              label={i18n._("Workshop name")}
              value={title}
              onChange={(value) => {
                clearKeyError("title");
                setTitle(value);
              }}
              errorMessage={errorMessage?.title ? errorMessage.title.title : ""}
            />
            <InputButton
              label={i18n._("Workshop address")}
              placeholder={i18n._("Enter the address")}
              value={showTitlePlace}
              onPress={() => {
                setIsShowSelectPlace(true);
              }}
              containerStyle={styles.containerStyleInputButton}
              inputWrapperStyle={styles.inputWrapperStyleInputButton}
              errorMessage={errorMessage?.place ? errorMessage.place.title : ""}
            />
            <Input
              placeholder={i18n._("Add a description about the workshop")}
              label={i18n._("Workshop description")}
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
            <View>
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
                  errorMessage?.phoneNumber
                    ? errorMessage.phoneNumber.title
                    : ""
                }
              />
              <InputButton
                isSelect
                value={valueTypesWorkshops}
                label={i18n._("Type workshop")}
                placeholder={i18n._("Select type")}
                onPress={() => {
                  setIsShowTypeWorkshops(true);
                }}
                containerStyle={styles.containerStyleInputButton}
                inputWrapperStyle={styles.inputWrapperStyleInputButton}
                rightElementInput={
                  <IconArrowRightEvent
                    width={15}
                    height={20}
                    fill={colors.blackCoffee}
                  />
                }
                errorMessage={
                  errorMessage?.types ? errorMessage.types.title : ""
                }
              />
            </View>
            <InputButton
              isSelect
              isMultiLines
              disabled={!(typeWorkshops.auto || typeWorkshops.moto)}
              value={valueTypesWork}
              label={i18n._("Types of work")}
              placeholder={i18n._("Select types of work")}
              onPress={onPressSelectTypesWork}
              containerStyle={styles.containerStyleInputButton}
              inputWrapperStyle={styles.inputWrapperStyleInputButton}
              rightElementInput={
                <IconArrowRightEvent
                  width={15}
                  height={20}
                  fill={colors.blackCoffee}
                />
              }
              errorMessage={
                errorMessage?.types && valueTypesWork.length === 0
                  ? errorMessage.types.title
                  : ""
              }
            />
            <View style={styles.containerImages}>
              <Text style={styles.titleContainerImages}>
                {i18n._("Add a photo")}:
              </Text>
              <Text style={styles.subtitleContainerImages}>
                {i18n._(
                  "The first photo will be on the cover of the advertisement."
                )}
              </Text>
              <ImagesSelect images={images} setImages={setImages} />
            </View>
            <View style={styles.containerSubmit}>
              <Text style={styles.errorMessage}>
                {errorMessage?.errorMessage?.title || ""}
              </Text>
              <ButtonCustom
                disabled={
                  errorMessage ? Object.values(errorMessage).length > 1 : false
                }
                title={i18n._("Publish")}
                onSubmit={onSaveWorkshop}
              />
            </View>
          </View>
          <View style={styles.containerEmpty} />
        </ScrollView>
      </View>
      <Modal
        visible={
          isShowTypeWorkshops || isShowTypesMotoWorks || isShowTypesAutoWorks
        }
        transparent
      >
        <ModalSheetTypeWorkshops
          isShowTypeWorkshops={isShowTypeWorkshops}
          onClose={onSubmitTypeWorkshop}
          typeWorkshops={typeWorkshops}
          setTypeWorkshops={(value) => {
            clearKeyError("types");
            setTypeWorkshops(value);
          }}
          onSubmit={onSubmitTypeWorkshop}
        />
        <ModalSheetTypesMotoWorks
          isShow={isShowTypesMotoWorks}
          onClose={onSubmitMotoTypeWorks}
          selectMotoTypesWorks={selectMotoTypesWorks}
          setSelectMotoTypesWorks={(value) => {
            clearKeyError("types");
            setSelectMotoTypesWorks(value);
          }}
          onSubmit={onSubmitMotoTypeWorks}
        />
        <ModalSheetTypesAutoWorks
          isShow={isShowTypesAutoWorks}
          onClose={onSubmitAutoTypeWorks}
          selectAutoTypesWorks={selectAutoTypesWorks}
          setSelectAutoTypesWorks={(value) => {
            clearKeyError("types");
            setSelectAutoTypesWorks(value);
          }}
          onSubmit={onSubmitAutoTypeWorks}
        />
      </Modal>
      <ModalSheetPlace
        isOpen={isShowSelectPlace}
        title={i18n._("Workshop address")}
        onClose={() => {
          setIsShowSelectPlace(false);
        }}
        onSubmit={onSubmitPlace}
      />
    </>
  );
};
