import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Modal, ScrollView, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";

//types
import { ImageType } from "../../../components/ImageModal/ImageModal.types";
import {
  RootAllScreensParamList,
  RootSettingsScreensParamList,
  RootWorkshopsScreensParamList,
} from "../../../navigators/Navigators.types";

// providers
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";
import { localesContext } from "../../../../localization/localization.provider";
import { useWorkshopsProvider } from "../../../providers/WorkshopsProvider/useWorkshopsProvider.constants";
import { userContext } from "../../../providers/UserProvider/UserProvider";
import { workshopsContext } from "../../../providers/WorkshopsProvider/WorkshopsProvider";
import { placesContext } from "../../../providers/PlacesProvider/PlacesProvider";
import { loadingContext } from "../../../providers/LoadingProvider/LoadingProvider";

// components
import { Header } from "../../../components/Header/Header";
import { InputButton } from "../../../components/InputButton/InputButton";
import { Input } from "../../../components/Input/Input";
import { InputPhone } from "../../../components/InputPhone/InputPhone";
import { IconArrowRightEvent } from "../../../icons/components";
import { ModalSheetTypeWorkshops } from "../../../components/ModalSheetTypeWorkshops/ModalSheetTypeWorkshops";
import { ModalSheetTypesAutoWorks } from "../../../components/ModalSheetTypesAutoWorks/ModalSheetTypesAutoWorks";
import { ModalSheetTypesMotoWorks } from "../../../components/ModalSheetTypesMotoWorks/ModalSheetTypesMotoWorks";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { ModalSheetSearchPlaceAddress } from "../../../components/ModalSheetSearchPlaceAddress/ModalSheetSearchPlaceAddress";
import { ModalDelete } from "../../../components/ModalDelete/ModalDelete";
import { BoxSelectImages } from "../../../components/BoxSelectImages/BoxSelectImages";
import { ModalShowErrors } from "../../../components/ModalShowErrors/ModalShowErrors";
import { ItemSearchPlaceAddressType } from "../../../components/ModalSheetSearchPlaceAddress/ModalSheetSearchPlaceAddress.types";

// helps
import { useAuthorizationRegistration } from "../../../helps/useAuthorizationRegistration";
import { useErrors } from "../../../helps/useErrors";
import { getClearValue } from "../../../helps/regexp";
import showErrors from "../../../helps/errors/showError";

// constants
import {
  DEFAULT_CODE_COUNTRY,
  DEFAULT_COUNTRY,
} from "../../../constants/inputs.const";
import { DEFAULT_WORKSHOP_DATA } from "../../../providers/WorkshopsProvider/WorkshopsProvider.constants";

// styles
import { styles } from "./WorkshopAdd.styles";
import colors from "../../../../styles/colors";

type WorkshopAddProps = {
  navigation: NativeStackNavigationProp<RootAllScreensParamList>;
};

export const WorkshopAdd: FunctionComponent<WorkshopAddProps> = ({
  navigation,
}) => {
  const { params } =
    useRoute<
      RouteProp<RootWorkshopsScreensParamList & RootSettingsScreensParamList>
    >();
  const { i18n, language } = useContext(localesContext);
  const { getErrorText } = useErrors(i18n);
  const { heightStatusBar } = useContext(themeContext);
  const { workshops, addWorkshop, changeWorkshop, deleteWorkshop } =
    useContext(workshopsContext);
  const { userData } = useContext(userContext);
  const { placesDB, getPlace } = useContext(placesContext);
  const { setLoading } = useContext(loadingContext);
  const { typesWorkServices } = useWorkshopsProvider();
  const { verifyPhone } = useAuthorizationRegistration();
  const { success, bug } = showErrors;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(`+${DEFAULT_CODE_COUNTRY}`);
  const [selectCountryIso, setSelectCountryIso] = useState(DEFAULT_COUNTRY);
  const [place, setPlace] = useState<ItemSearchPlaceAddressType | null>(null);
  const [isShowTypeWorkshops, setIsShowTypeWorkshops] = useState(false);
  const [isShowTypesMotoWorks, setIsShowTypesMotoWorks] = useState(false);
  const [isShowTypesAutoWorks, setIsShowTypesAutoWorks] = useState(false);
  const [isShowSelectPlace, setIsShowSelectPlace] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
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
  const [isShowErrors, setIsShowErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Record<
    string,
    { name: string; title: string }
  > | null>(null);
  const selectWorkshop = useMemo(
    () =>
      workshops.find((workshop) => workshop.id === params?.workshopId) || null,
    [workshops, params]
  );
  const showTitlePlace = useMemo(() => {
    if (!place) return "";
    const placeDB = getPlace(place.placeId);
    if (!placeDB) return place.title;
    return placeDB[language].formatted_address;
  }, [placesDB, place]);

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
      ...((description.length < 50 || description.length > 9000) && {
        description: getErrorText("description", {
          min: 50,
          max: 9000,
          otherName: i18n._("workshop"),
        }),
      }),
      ...(!isPhone && {
        phoneNumber: getErrorText("phoneNumber", {
          otherName: i18n._("workshop"),
        }),
      }),
      ...(selectMotoTypesWorks.length === 0 &&
        selectAutoTypesWorks.length === 0 && {
          types: getErrorText("types", {
            otherName: i18n._("workshop"),
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

  const onSubmitPlace = (data: ItemSearchPlaceAddressType) => {
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
      const currentPlace =
        selectWorkshop &&
        place?.placeId === selectWorkshop.place_id &&
        place.address === selectWorkshop.place_address
          ? {
              place_id: selectWorkshop.place_id,
              region_place_id: selectWorkshop.region_place_id,
              country_place_id: selectWorkshop.country_place_id,
              place_address: selectWorkshop.place_address,
              coordinates: selectWorkshop.coordinates,
            }
          : { place };
      const newWorkshop = {
        ...DEFAULT_WORKSHOP_DATA,
        userId: userData.id,
        title,
        description,
        phoneNumber: clearPhoneNumber,
        ...currentPlace,
        motoTypesWorks: selectMotoTypesWorks,
        autoTypesWorks: selectAutoTypesWorks,
        images: currentImages,
        dataCreate: new Date().getTime(),
      };
      const isCreate = selectWorkshop
        ? await changeWorkshop({ ...selectWorkshop, ...newWorkshop })
        : await addWorkshop(newWorkshop);
      if (isCreate) {
        navigation.goBack();
        success(
          selectWorkshop
            ? i18n._("Workshop change successfully")
            : i18n._("Workshop created successfully")
        );
      } else
        bug(
          selectWorkshop
            ? i18n._("Error changing workshop")
            : i18n._("Error creating workshop")
        );
    }
  };

  const getChangeWorkshop = async () => {
    setLoading(true);
    if (selectWorkshop) {
      const imagesWithBath64 = await Promise.all(
        selectWorkshop.images.map(async (image) => {
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
      setTitle(selectWorkshop.title);
      const placeDB = getPlace(selectWorkshop.place_id);
      setPlace({
        placeId: selectWorkshop.place_id,
        title: placeDB ? placeDB[language].formatted_address : "",
        address: selectWorkshop.place_address,
        coordinates: selectWorkshop.coordinates,
      });
      setDescription(selectWorkshop.description);
      setPhoneNumber(selectWorkshop.phoneNumber);
      setTypeWorkshops((state) => ({
        ...state,
        moto: selectWorkshop.motoTypesWorks.length > 0,
        auto: selectWorkshop.autoTypesWorks.length > 0,
      }));
      setSelectAutoTypesWorks(selectWorkshop.autoTypesWorks);
      setSelectMotoTypesWorks(selectWorkshop.motoTypesWorks);
      setImages(imagesWithBath64);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectWorkshop) getChangeWorkshop();
    else if (userData?.phoneNumber && phoneNumber.length < 5)
      setPhoneNumber(userData.phoneNumber);
  }, [selectWorkshop, placesDB]);

  return (
    <>
      <View style={containerStyles}>
        <Header
          title={
            selectWorkshop ? i18n._("Change workshop") : i18n._("Add workshop")
          }
          onRightDelete={
            selectWorkshop
              ? () => {
                  setIsShowDeleteModal(true);
                }
              : undefined
          }
        />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.containerInputs}>
            <Input
              isRegular
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
              isRegular
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
              isRegular
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
                isRegular
                label={i18n._("Phone number")}
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
                isRegular
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
                    height={15}
                    fill={colors.blackCoffee}
                  />
                }
                errorMessage={
                  errorMessage?.types ? errorMessage.types.title : ""
                }
              />
            </View>
            <InputButton
              isRegular
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
                  height={15}
                  fill={colors.blackCoffee}
                />
              }
              errorMessage={
                errorMessage?.types && valueTypesWork.length === 0
                  ? errorMessage.types.title
                  : ""
              }
            />
            <BoxSelectImages
              isRegular
              isSubTitle
              images={images}
              setImages={setImages}
            />
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
      <ModalSheetSearchPlaceAddress
        isOpen={isShowSelectPlace}
        onClose={() => {
          setIsShowSelectPlace(false);
        }}
        onSubmit={onSubmitPlace}
        statePlace={place || undefined}
      />
      <Modal visible={isShowDeleteModal} transparent>
        <ModalDelete
          onClose={() => {
            setIsShowDeleteModal(false);
          }}
          onSubmit={async () => {
            if (selectWorkshop?.id) {
              await deleteWorkshop(selectWorkshop.id, "user");
              setIsShowDeleteModal(false);
            }
          }}
        />
      </Modal>
      <ModalShowErrors
        isOpen={isShowErrors}
        onClose={() => {
          setIsShowErrors(false);
        }}
        errors={errorMessage}
      />
    </>
  );
};
