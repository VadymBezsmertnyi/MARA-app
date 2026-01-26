import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system/legacy";

//types
import { ImageFileType } from "../../../storeRedux/types";
import {
  RootAllScreensParamList,
  RootSettingsScreensParamList,
  RootWorkshopsScreensParamList,
} from "../../../navigators/Navigators.types";
import { TWorkingHours } from "../../../storeRedux/apis/workshops/workshops.types";

// redux
import { useUserSelector } from "../../../storeRedux/apis/user/slice";
import {
  useAddWorkshopMutation,
  useChangeWorkshopMutation,
  useDeleteWorkshopMutation,
} from "../../../storeRedux/api";
import { useWorkshopsSelector } from "../../../storeRedux/apis/workshops/slice";

// providers
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { usePlacesProvider } from "../../../providers/PlacesProvider/PlacesProvider";
import {
  useDropDownAlertProvider,
  DropdownAlertType,
} from "../../../providers/DropDownAlertProvider/DropDownAlertProvider";

// hooks
import { useWorkshopsState } from "../../../storeRedux/apis/workshops/useWorkshops.constants";

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
import { WorkingHoursPicker } from "./components/WorkingHoursPicker/WorkingHoursPicker";

// helps
import { useAuthorizationRegistration } from "../../../helps/useAuthorizationRegistration";
import { useErrors } from "../../../helps/useErrors";
import { getClearValue } from "../../../helps/regexp";

// constants
import {
  DEFAULT_CODE_COUNTRY,
  DEFAULT_COUNTRY,
} from "../../../constants/inputs.const";
import { DEFAULT_WORKSHOP_DATA } from "../../../storeRedux/apis/workshops/workshops.constants";

// styles
import { styles } from "./WorkshopAdd.styles";
import colors from "../../../../styles/colors";
import Toast from "react-native-toast-message";

type WorkshopAddProps = {
  navigation: NativeStackNavigationProp<RootAllScreensParamList>;
};

type NamesErrorsType =
  | "types"
  | "title"
  | "description"
  | "place"
  | "phoneNumber";

export const WorkshopAdd: FunctionComponent<WorkshopAddProps> = ({
  navigation,
}) => {
  const { params } =
    useRoute<
      RouteProp<RootWorkshopsScreensParamList & RootSettingsScreensParamList>
    >();
  const { messageFromServer } = useDropDownAlertProvider();
  const { i18n, language } = useLocalesProvider();
  const { getErrorText } = useErrors(i18n);
  const { userData } = useUserSelector();
  const { heightTabBar } = useThemeProvider();
  const { workshopsList: workshops } = useWorkshopsSelector();
  const [addWorkshopMutation] = useAddWorkshopMutation();
  const [changeWorkshopMutation] = useChangeWorkshopMutation();
  const [deleteWorkshopMutation] = useDeleteWorkshopMutation();
  const { placesDB, getPlace } = usePlacesProvider();
  const { typesWorkServices } = useWorkshopsState();
  const { verifyPhone } = useAuthorizationRegistration();
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
  const [images, setImages] = useState<ImageFileType[]>([]);
  const [workingHours, setWorkingHours] = useState<TWorkingHours>(
    DEFAULT_WORKSHOP_DATA.workingHours
  );
  const [isShowErrors, setIsShowErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Record<
    string,
    { name: string; title: string }
  > | null>(null);
  const [needCheck, setNeedCheck] = useState<NamesErrorsType | null>(null);

  const selectWorkshop = useMemo(
    () =>
      workshops.find((workshop) => workshop._id === params?.workshopId) || null,
    [workshops, params]
  );
  const showTitlePlace = useMemo(() => {
    if (!place || place.placeId.length === 0) return "";
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

  const clearKeyError = (key: string) => {
    if (errorMessage && key in errorMessage) {
      const { [key]: _, ...otherErrorMessage } = errorMessage;
      if (Object.keys(otherErrorMessage).length <= 2) setErrorMessage(null);
      else setErrorMessage(otherErrorMessage);
    }
  };

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

  const errorsObject = useMemo(() => {
    const isPhone = verifyPhone(phoneNumber, selectCountryIso).length === 0;
    return {
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
  }, [
    title,
    place,
    description,
    phoneNumber,
    selectCountryIso,
    selectMotoTypesWorks,
    selectAutoTypesWorks,
  ]);

  const checkEnterData = () => {
    const isError = Object.keys(errorsObject).length > 0;
    if (isError) {
      setIsShowErrors(true);
      setErrorMessage(errorsObject);
    } else setErrorMessage(null);
    return isError;
  };

  const checkValueOnBlur = (key: NamesErrorsType) => {
    const error = errorsObject[key] || null;
    if (error) setErrorMessage({ [key]: error });
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
      const currentImageFiles = images.map((image) => ({
        _id: image._id || "",
        uri: image.url,
        width: image.width,
        height: image.height,
      }));
      const currentPlace =
        selectWorkshop &&
        place?.placeId === selectWorkshop.place_id?._id &&
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
        userId: userData._id,
        title,
        description,
        phoneNumber: clearPhoneNumber,
        ...currentPlace,
        motoTypesWorks: selectMotoTypesWorks,
        autoTypesWorks: selectAutoTypesWorks,
        imageFiles: currentImageFiles,
        dataCreate: new Date().getTime(),
        rating: selectWorkshop?.rating || 0,
        comments: selectWorkshop?.comments || [],
        workingHours,
      };
      const result = selectWorkshop
        ? await changeWorkshopMutation({
            body: {
              ...selectWorkshop,
              ...newWorkshop,
              likeUserIds: [
                ...(newWorkshop.likeUserIds ||
                  selectWorkshop.likeUserIds ||
                  []),
              ].map((item) =>
                typeof item === "string" ? item : item._id.toString()
              ),
              imageFiles: currentImageFiles,
            },
          })
        : await addWorkshopMutation({
            body: {
              ...newWorkshop,
              imageFiles: currentImageFiles,
              likeUserIds: newWorkshop.likeUserIds.map((item) =>
                typeof item === "string" ? item : item._id.toString()
              ),
            },
          });

      if (result.data?.workshop) {
        navigation.goBack();
        messageFromServer(
          selectWorkshop
            ? i18n._("Workshop change successfully")
            : i18n._("Workshop created successfully"),
          i18n._("Success"),
          DropdownAlertType.Success
        );
      } else
        messageFromServer(
          selectWorkshop
            ? i18n._("Error changing workshop")
            : i18n._("Error creating workshop"),
          i18n._("Error"),
          DropdownAlertType.Error
        );
    }
  };

  const getChangeWorkshop = async () => {
    if (!selectWorkshop) return;

    setTitle(selectWorkshop.title);
    const placeDB = await getPlace(selectWorkshop.place_id?.place_id || "");
    setPlace({
      placeId: selectWorkshop.place_id?.place_id || "",
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
    setImages(selectWorkshop.imageFiles || []);
    setWorkingHours(
      selectWorkshop.workingHours || DEFAULT_WORKSHOP_DATA.workingHours
    );
  };

  const onDeleteWorkshop = async () => {
    if (!selectWorkshop?._id) {
      Toast.show({
        type: "error",
        text1: i18n._("Error"),
        text2: i18n._("Unable to delete the workshop"),
      });
      return;
    }

    const result = await deleteWorkshopMutation({
      body: { _id: selectWorkshop._id },
    });
    if (!result.data || result.error || !result.data.result) {
      Toast.show({
        type: "error",
        text1: i18n._("Error"),
        text2: i18n._("Unable to delete the workshop"),
      });
      return;
    }

    setIsShowDeleteModal(false);
    navigation.goBack();
  };

  useEffect(() => {
    if (selectWorkshop) getChangeWorkshop();
    else if (userData?.phoneNumber && phoneNumber.length < 5)
      setPhoneNumber(userData.phoneNumber);
  }, [selectWorkshop, placesDB]);

  useEffect(() => {
    if (needCheck) {
      checkValueOnBlur(needCheck);
      setNeedCheck(null);
    }
  }, [needCheck]);

  return (
    <>
      <View style={[styles.container, { paddingBottom: heightTabBar }]}>
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
            <BoxSelectImages
              isRegular
              isSubTitle
              images={images}
              setImages={setImages}
            />
            <Input
              isRegular
              placeholder={i18n._("Enter the name of the workshop")}
              label={i18n._("Workshop name")}
              value={title}
              onChange={(value) => {
                clearKeyError("title");
                setTitle(value);
              }}
              onBlurProp={() => checkValueOnBlur("title")}
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
              onBlurProp={() => checkValueOnBlur("description")}
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
                onBlurProp={() => checkValueOnBlur("phoneNumber")}
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
            <WorkingHoursPicker
              value={workingHours}
              onChange={setWorkingHours}
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
      <ModalSheetTypeWorkshops
        isShowTypeWorkshops={isShowTypeWorkshops}
        onClose={onSubmitTypeWorkshop}
        typeWorkshops={typeWorkshops}
        setTypeWorkshops={(value) => {
          clearKeyError("types");
          setTypeWorkshops(value);
          setNeedCheck("types");
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
          setNeedCheck("types");
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
          setNeedCheck("types");
        }}
        onSubmit={onSubmitAutoTypeWorks}
      />
      <ModalSheetSearchPlaceAddress
        isOpen={isShowSelectPlace}
        onClose={() => {
          setIsShowSelectPlace(false);
          setNeedCheck("place");
        }}
        onSubmit={onSubmitPlace}
        statePlace={place || undefined}
      />
      {isShowDeleteModal && (
        <ModalDelete
          onClose={() => {
            setIsShowDeleteModal(false);
          }}
          onSubmit={onDeleteWorkshop}
        />
      )}
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
