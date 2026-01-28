import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";

//types
import { ImageFileType } from "../../../storeRedux/types";
import {
  RootAllScreensParamList,
  RootSettingsScreensParamList,
  RootWorkshopsScreensParamList,
} from "../../../navigators/Navigators.types";
import {
  TWorkingHours,
  TContact,
} from "../../../storeRedux/apis/workshops/workshops.types";

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
import useWorkshopHelpers from "./useWorkshopHelpers";

// components
import { Header } from "../../../components/Header/Header";
import { InputButton } from "../../../components/InputButton/InputButton";
import { Input } from "../../../components/Input/Input";
import { InputPhone } from "../../../components/InputPhone/InputPhone";
import { IconArrowRightEvent } from "../../../icons/components";
import { ModalSheetTypeWorkshops } from "../../../components/ModalSheetTypeWorkshops/ModalSheetTypeWorkshops";
import { ModalSheetContactType } from "../../../components/ModalSheetContactType/ModalSheetContactType";
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

type WorkshopAddProps = {
  navigation: NativeStackNavigationProp<RootAllScreensParamList>;
};

type NamesErrorsType = "types" | "title" | "description" | "place" | "contacts";
type FormStateType = {
  title: string;
  description: string;
  contacts: TContact[];
  selectCountryIso: string;
  place: ItemSearchPlaceAddressType | null;
  images: ImageFileType[];
};

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
  const { workshopsList: workshops, workshopsUserList: workshopsUser } =
    useWorkshopsSelector();
  const [addWorkshopMutation] = useAddWorkshopMutation();
  const [changeWorkshopMutation] = useChangeWorkshopMutation();
  const [deleteWorkshopMutation] = useDeleteWorkshopMutation();
  const { placesDB, getPlace } = usePlacesProvider();
  const { typesWorkServices } = useWorkshopsState();
  const { verifyPhone } = useAuthorizationRegistration();
  const { getContactTypeTitle } = useWorkshopHelpers(i18n);
  const [form, setForm] = useState<FormStateType>({
    title: "",
    description: "",
    contacts: [{ type: "phone", value: `+${DEFAULT_CODE_COUNTRY}` }],
    selectCountryIso: DEFAULT_COUNTRY,
    place: null,
    images: [],
  });
  const [isShowContactTypeModal, setIsShowContactTypeModal] = useState(false);
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
      workshops.find((workshop) => workshop._id === params?.workshopId) ||
      workshopsUser.find((workshop) => workshop._id === params?.workshopId) ||
      null,
    [workshops, params]
  );
  const showTitlePlace = useMemo(() => {
    const currentPlace = form.place;
    if (!currentPlace || currentPlace.placeId.length === 0) return "";
    const findPlace =
      placesDB.find(
        (placeDB) =>
          placeDB._id === currentPlace.placeId ||
          placeDB.place_id === currentPlace.placeId
      ) || null;
    if (!findPlace) {
      getPlace(currentPlace.placeId);
      return currentPlace.title;
    }
    return findPlace[language].formatted_address;
  }, [placesDB, form.place, language]);

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

  const firstContact = useMemo(() => form.contacts[0], [form.contacts]);
  const phoneContact = useMemo(
    () => form.contacts.find((contact) => contact.type === "phone"),
    [form.contacts]
  );

  const errorsObject = useMemo(() => {
    const isFirstContactPhone = firstContact?.type === "phone";
    const isPhone =
      isFirstContactPhone &&
      firstContact &&
      verifyPhone(firstContact.value, form.selectCountryIso).length === 0;
    return {
      ...((form.title.length < 5 || form.title.length > 40) && {
        title: getErrorText("title", {
          min: 5,
          max: 40,
          otherName: i18n._("workshop"),
        }),
      }),
      ...(form.place === null && {
        place: getErrorText("place", {
          otherName: i18n._("workshop"),
        }),
      }),
      ...((form.description.length < 50 || form.description.length > 9000) && {
        description: getErrorText("description", {
          min: 50,
          max: 9000,
          otherName: i18n._("workshop"),
        }),
      }),
      ...(!isPhone && {
        contacts: getErrorText("phoneNumber", {
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
    form.title,
    form.place,
    form.description,
    phoneContact,
    form.selectCountryIso,
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
    setForm((prev) => ({ ...prev, place: data }));
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
      form.place &&
      (selectMotoTypesWorks.length || selectAutoTypesWorks.length) &&
      !isError
    ) {
      const currentImageFiles = form.images.map((image) => {
        if (
          image._id &&
          image.url &&
          !image.url.includes("file://") &&
          !image.url.startsWith("file://") &&
          !image.url.includes("data:image")
        ) {
          return {
            _id: image._id,
            url: image.url,
            width: image.width,
            height: image.height,
          };
        }
        return {
          _id: image._id || "",
          uri: image.url,
          width: image.width,
          height: image.height,
        };
      });
      const currentPlace =
        selectWorkshop &&
        form.place?.placeId === selectWorkshop.place_id?._id &&
        form.place.address === selectWorkshop.place_address
          ? {
              place_id: selectWorkshop.place_id,
              region_place_id: selectWorkshop.region_place_id,
              country_place_id: selectWorkshop.country_place_id,
              place_address: selectWorkshop.place_address,
              coordinates: selectWorkshop.coordinates,
            }
          : { place: form.place };
      const processedContacts = form.contacts.map((contact) => {
        if (contact.type === "phone")
          return {
            ...contact,
            value: getClearValue(contact.value),
          };

        return contact;
      });
      const newWorkshop = {
        ...DEFAULT_WORKSHOP_DATA,
        userId: userData._id,
        title: form.title,
        description: form.description,
        contacts: processedContacts,
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
              likeUserIds:
                newWorkshop.likeUserIds || selectWorkshop.likeUserIds || [],
              imageFiles: currentImageFiles,
              phoneNumber: undefined,
            },
          })
        : await addWorkshopMutation({
            body: {
              ...newWorkshop,
              imageFiles: currentImageFiles,
              likeUserIds: newWorkshop.likeUserIds || [],
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

    const placeDB = await getPlace(selectWorkshop.place_id?.place_id || "");
    setForm((prev) => ({
      ...prev,
      title: selectWorkshop.title,
      description: selectWorkshop.description,
      place: {
        placeId: selectWorkshop.place_id?.place_id || "",
        title: placeDB ? placeDB[language].formatted_address : "",
        address: selectWorkshop.place_address,
        coordinates: selectWorkshop.coordinates,
      },
    }));
    if (selectWorkshop.contacts && selectWorkshop.contacts.length > 0) {
      const phoneContact = selectWorkshop.contacts.find(
        (c) => c.type === "phone"
      );
      const otherContacts = selectWorkshop.contacts.filter(
        (c) => c.type !== "phone"
      );
      if (phoneContact)
        setForm((prev) => ({
          ...prev,
          contacts: [phoneContact, ...otherContacts],
        }));
      else
        setForm((prev) => ({
          ...prev,
          contacts: [
            { type: "phone", value: `+${DEFAULT_CODE_COUNTRY}` },
            ...otherContacts,
          ],
        }));
    } else if (selectWorkshop.phoneNumber)
      setForm((prev) => ({
        ...prev,
        contacts: [{ type: "phone", value: selectWorkshop.phoneNumber }],
      }));
    else
      setForm((prev) => ({
        ...prev,
        contacts: [{ type: "phone", value: `+${DEFAULT_CODE_COUNTRY}` }],
      }));

    setTypeWorkshops((state) => ({
      ...state,
      moto: selectWorkshop.motoTypesWorks.length > 0,
      auto: selectWorkshop.autoTypesWorks.length > 0,
    }));
    setSelectAutoTypesWorks(selectWorkshop.autoTypesWorks);
    setSelectMotoTypesWorks(selectWorkshop.motoTypesWorks);
    setForm((prev) => ({
      ...prev,
      images: selectWorkshop.imageFiles || [],
    }));
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
    if (selectWorkshop) {
      getChangeWorkshop();
      return;
    }
    if (!userData?.phoneNumber) return;

    setForm((prev) => {
      const currentValue = prev.contacts[0]?.value || "";
      if (currentValue.length >= 5) return prev;
      return {
        ...prev,
        contacts: [{ type: "phone", value: userData.phoneNumber || "" }],
      };
    });
  }, [selectWorkshop, userData?.phoneNumber]);

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
              images={form.images}
              setImages={(value) =>
                setForm((prev) => ({
                  ...prev,
                  images:
                    typeof value === "function" ? value(prev.images) : value,
                }))
              }
            />
            <Input
              isRegular
              placeholder={i18n._("Enter the name of the workshop")}
              label={i18n._("Workshop name")}
              value={form.title}
              onChange={(value) => {
                clearKeyError("title");
                setForm((prev) => ({ ...prev, title: value }));
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
              value={form.description}
              onChange={(value) => {
                clearKeyError("description");
                setForm((prev) => ({ ...prev, description: value }));
              }}
              containerStyle={styles.containerStyle}
              customStyles={styles.customStylesInput}
              maxLength={9000}
              errorMessage={
                errorMessage?.description ? errorMessage.description.title : ""
              }
            />
            <View style={styles.contactsContainer}>
              <Text style={styles.labelContacts}>{i18n._("Contacts")}</Text>
              <View style={styles.contactsListContainer}>
                {form.contacts.map((contact, index) => {
                  const isFirstContact = index === 0;
                  const canDelete = !isFirstContact;
                  return (
                    <View key={`contact-${index}`} style={styles.contactRow}>
                      <View style={styles.contactInputContainer}>
                        {contact.type === "phone" ? (
                          <InputPhone
                            isRegular
                            label={i18n._("Phone number")}
                            phoneNumber={contact.value}
                            onBlurProp={() => checkValueOnBlur("contacts")}
                            setPhoneNumber={(value) => {
                              clearKeyError("contacts");
                              setForm((prev) => ({
                                ...prev,
                                contacts: prev.contacts.map((c, i) =>
                                  i === index ? { ...c, value } : c
                                ),
                              }));
                            }}
                            selectCountryIso={form.selectCountryIso}
                            setSelectCountryIso={(value) =>
                              setForm((prev) => ({
                                ...prev,
                                selectCountryIso: value,
                              }))
                            }
                            labelStyle={styles.labelInput}
                            errorMessage={
                              errorMessage?.contacts && index === 0
                                ? errorMessage.contacts.title
                                : ""
                            }
                            isErrorMessage={index === 0}
                          />
                        ) : (
                          <Input
                            isRegular
                            placeholder={getContactTypeTitle(contact.type)}
                            label={getContactTypeTitle(contact.type)}
                            value={contact.value}
                            onChange={(value) => {
                              setForm((prev) => ({
                                ...prev,
                                contacts: prev.contacts.map((c, i) =>
                                  i === index ? { ...c, value } : c
                                ),
                              }));
                            }}
                            labelStyle={styles.labelInput}
                          />
                        )}
                      </View>
                      {canDelete && (
                        <TouchableOpacity
                          style={styles.deleteContactIconButton}
                          onPress={() => {
                            setForm((prev) => ({
                              ...prev,
                              contacts: prev.contacts.filter(
                                (_, i) => i !== index
                              ),
                            }));
                          }}
                        >
                          <MaterialIcons
                            name="delete"
                            size={24}
                            color={colors.errorRed}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
              </View>
              <ButtonCustom
                type="transparent"
                title={i18n._("Add contact type")}
                onSubmit={() => setIsShowContactTypeModal(true)}
                styleContainer={styles.addContactButtonContainer}
                styleButton={styles.addContactButton}
                styleTitle={styles.addContactText}
              />
            </View>
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
              errorMessage={errorMessage?.types ? errorMessage.types.title : ""}
            />
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
        statePlace={form.place || undefined}
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
      <ModalSheetContactType
        isShow={isShowContactTypeModal}
        onClose={() => setIsShowContactTypeModal(false)}
        onSelect={(type) => {
          if (type === "phone") {
            const phoneCount = form.contacts.filter(
              (c) => c.type === "phone"
            ).length;
            if (phoneCount < 5)
              setForm((prev) => ({
                ...prev,
                contacts: [
                  ...prev.contacts,
                  { type, value: `+${DEFAULT_CODE_COUNTRY}` },
                ],
              }));
            else
              Toast.show({
                type: "error",
                text1: i18n._("Error"),
                text2: i18n._("You can add up to 5 phone numbers"),
              });
          } else {
            const existingTypes = form.contacts.map((c) => c.type);
            if (!existingTypes.includes(type))
              setForm((prev) => ({
                ...prev,
                contacts: [...prev.contacts, { type, value: "" }],
              }));
            else
              Toast.show({
                type: "error",
                text1: i18n._("Error"),
                text2: i18n._("This contact type has already been added"),
              });
          }
        }}
      />
    </>
  );
};
