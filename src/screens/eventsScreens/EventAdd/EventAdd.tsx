import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import dayjs from "dayjs";

// types
import {
  RootAllScreensParamList,
  RootEventsScreensParamList,
  RootSettingsScreensParamList,
} from "../../../navigators/Navigators.types";
import { ImageFileType } from "../../../storeRedux/types";
import { TContact } from "../../../storeRedux/apis/events/events.types";

// redux
import { useUserSelector } from "../../../storeRedux/apis/user/slice";
import { useEventsSelector } from "../../../storeRedux/apis/events/slice";
import {
  useAddEventMutation,
  useChangeEventMutation,
  useDeleteEventMutation,
} from "../../../storeRedux/api";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useLoadingProvider } from "../../../providers/LoadingProvider/LoadingProvider";
import { usePlacesProvider } from "../../../providers/PlacesProvider/PlacesProvider";
import { useAnalyticsProvider } from "../../../providers/AnalyticsProvider/AnalyticsProvider";

// components
import { Input } from "../../../components/Input/Input";
import { DatePicker } from "./components/DatePicker/DatePicker";
import {
  TimelineSection,
  TimelineItemDraft,
  validateTimelineItems,
} from "./components/TimelineSection/TimelineSection";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { BoxSelectImages } from "../../../components/BoxSelectImages/BoxSelectImages";
import { InputButton } from "../../../components/InputButton/InputButton";
import { InputPhone } from "../../../components/InputPhone/InputPhone";
import { ModalShowErrors } from "../../../components/ModalShowErrors/ModalShowErrors";
import { Header } from "../../../components/Header/Header";
import { ModalDelete } from "../../../components/ModalDelete/ModalDelete";
import { ItemSearchPlaceAddressType } from "../../../components/ModalSheetSearchPlaceAddress/ModalSheetSearchPlaceAddress.types";
import { ModalSheetSearchPlaceAddress } from "../../../components/ModalSheetSearchPlaceAddress/ModalSheetSearchPlaceAddress";
import { ModalSheetContactType } from "../../../components/ModalSheetContactType/ModalSheetContactType";

// helps
import { combineDateAndTime } from "../../../helps/helps";
import { useErrors } from "../../../helps/useErrors";
import { getClearValue } from "../../../helps/regexp";

// constants
import {
  DEFAULT_CODE_COUNTRY,
  DEFAULT_COUNTRY,
} from "../../../constants/inputs.const";
import { DEFAULT_EVENT_DATA } from "../../../storeRedux/apis/events/events.constants";

// icons
import { IconMapGradient } from "../../../icons/components";

// styles
import { styles } from "./EventAdd.styles";
import colors from "../../../../styles/colors";

type AddEventProps = {
  navigation: NativeStackNavigationProp<RootAllScreensParamList>;
};

type NamesErrorsType = "aboutEvent" | "finish" | "location" | "eventName";

const NOW_TIME_JS = dayjs().minute(0);
const NOW_TIME_JS_HOUR = dayjs().minute(0).add(1, "hour");
const CURRENT_DEFAULT_DATE = new Date(NOW_TIME_JS.format());
const CURRENT_DEFAULT_DATE_HOUR = new Date(NOW_TIME_JS_HOUR.format());

export const AddEvent: FunctionComponent<AddEventProps> = ({ navigation }) => {
  const { params } =
    useRoute<
      RouteProp<RootEventsScreensParamList & RootSettingsScreensParamList>
    >();
  const { i18n, language } = useLocalesProvider();
  const { eventsUserList } = useEventsSelector();
  const { userData } = useUserSelector();
  const { setLoading } = useLoadingProvider();
  const { placesDB, getPlace } = usePlacesProvider();
  const { getErrorText } = useErrors(i18n);
  const { onSetUserProperties } = useAnalyticsProvider();
  const [addEventMutation] = useAddEventMutation();
  const [changeEventMutation] = useChangeEventMutation();
  const [deleteEventMutation] = useDeleteEventMutation();
  const [eventName, setEventName] = useState("");
  const [placeAddress, setPlaceAddress] =
    useState<ItemSearchPlaceAddressType | null>(null);
  const [isModalPlace, setIsModalPlace] = useState(false);
  const [beginDate, setBeginDate] = useState<Date>(CURRENT_DEFAULT_DATE);
  const [beginTime, setBeginTime] = useState<Date>(CURRENT_DEFAULT_DATE);
  const [finishDate, setFinishDate] = useState<Date>(CURRENT_DEFAULT_DATE_HOUR);
  const [finishTime, setFinishTime] = useState<Date>(CURRENT_DEFAULT_DATE_HOUR);
  const [priceStart, setPriceStart] = useState("");
  const [priceFinish, setPriceFinish] = useState("");
  const [aboutEvent, setAboutEvent] = useState("");
  const [images, setImages] = useState<ImageFileType[]>([]);
  const [timelineItems, setTimelineItems] = useState<TimelineItemDraft[]>([]);
  const [contacts, setContacts] = useState<TContact[]>([
    { type: "phone", value: `+${DEFAULT_CODE_COUNTRY}` },
  ]);
  const [selectCountryIso, setSelectCountryIso] = useState(DEFAULT_COUNTRY);
  const [isShowContactTypeModal, setIsShowContactTypeModal] = useState(false);
  const [isShowErrors, setIsShowErrors] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Record<
    string,
    { name: string; title: string }
  > | null>(null);
  const [needCheck, setNeedCheck] = useState<NamesErrorsType | null>(null);

  const showTitlePlace = useMemo(() => {
    if (!placeAddress) return "";
    const findPlace =
      placesDB.find(
        (placeDB) =>
          placeDB._id === placeAddress.placeId ||
          placeDB.place_id === placeAddress.placeId
      ) || null;
    if (!findPlace) {
      getPlace(placeAddress.placeId);
      return placeAddress.title;
    }
    return findPlace[language].formatted_address;
  }, [placesDB, placeAddress]);
  const eventUser = useMemo(
    () =>
      params?.eventId
        ? eventsUserList.find((eventUser) => eventUser._id === params?.eventId)
        : null,
    [params?.eventId]
  );
  const start = useMemo(
    () => combineDateAndTime(beginDate, beginTime).getTime(),
    [beginDate, beginTime]
  );
  const finish = useMemo(
    () => combineDateAndTime(finishDate, finishTime).getTime(),
    [finishDate, finishTime]
  );
  const eventRange = useMemo(() => {
    const min = Math.min(start, finish);
    const max = Math.max(start, finish);
    return { min, max };
  }, [start, finish]);
  const errorsObject = useMemo(
    () => ({
      ...((eventName.length < 5 || eventName.length > 40) && {
        eventName: getErrorText("eventName", {
          min: 5,
          max: 40,
          otherName: i18n._("event"),
        }),
      }),
      ...(placeAddress === null && {
        location: getErrorText("location", { otherName: i18n._("event") }),
      }),
      ...(start > finish && {
        finish: getErrorText("finish", {}),
      }),
      ...((aboutEvent.length < 20 || aboutEvent.length > 2000) && {
        aboutEvent: getErrorText("aboutEvent", {
          min: 20,
          max: 2000,
          otherName: i18n._("event"),
        }),
      }),
    }),
    [eventName, placeAddress, start, finish, aboutEvent]
  );

  const checkEnterData = () => {
    const isError = Object.keys(errorsObject).length > 0;
    if (isError) {
      setIsShowErrors(true);
      setErrorMessage(errorsObject);
    } else setErrorMessage(null);
    return isError;
  };
  const checkValueOnBlur = (type: NamesErrorsType) => {
    const error = errorsObject[type] || null;
    if (error) setErrorMessage({ [type]: error });
  };

  const getContactTypeTitle = (type: TContact["type"]) => {
    switch (type) {
      case "phone":
        return i18n._("Phone");
      case "email":
        return i18n._("Email");
      case "viber":
        return i18n._("Viber");
      case "telegram":
        return i18n._("Telegram");
      case "whatsapp":
        return i18n._("WhatsApp");
      case "instagram":
        return i18n._("Instagram");
      case "facebook":
        return i18n._("Facebook");
      default:
        return "";
    }
  };

  const onChangeBeginDate = (
    _event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    if (selectedDate) {
      setBeginDate(selectedDate);
      const isAfterFinish = dayjs(selectedDate)
        .startOf("day")
        .isAfter(dayjs(finishDate).startOf("day"));
      if (isAfterFinish) setFinishDate(selectedDate);
    }
  };

  const onChangeBeginTime = (
    _event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    if (selectedDate) {
      setBeginTime(selectedDate);
      const isAfterFinish = dayjs(selectedDate).isAfter(dayjs(finishTime));
      if (isAfterFinish)
        setFinishTime(dayjs(selectedDate).add(1, "hour").toDate());
    }
  };

  const onChangeFinishDate = (
    _event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    if (selectedDate) setFinishDate(selectedDate);
  };
  const onChangeFinishTime = (
    _event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    if (selectedDate) setFinishTime(selectedDate);
  };

  const onSaveEvent = async () => {
    const isError = checkEnterData();
    if (userData?._id && !isError && placeAddress) {
      if (!validateTimelineItems(timelineItems, eventRange, i18n)) return;
      setLoading(true);
      try {
        const currentPlace =
          eventUser &&
          placeAddress?.placeId === eventUser.place_id?._id &&
          placeAddress.address === eventUser.place_address
            ? {
                place_id: eventUser.place_id,
                region_place_id: eventUser.region_place_id,
                country_place_id: eventUser.country_place_id,
                place_address: eventUser.place_address,
                coordinates: eventUser.coordinates,
              }
            : { place: placeAddress };
        const currentImageFiles = images.map((image) => {
          if (
            image._id &&
            image.url &&
            !image.url.includes("file://") &&
            !image.url.startsWith("file://") &&
            !image.url.includes("data:image")
          )
            return {
              _id: image._id,
              url: image.url,
              width: image.width,
              height: image.height,
            };

          return {
            _id: image._id || "",
            uri: image.url,
            width: image.width,
            height: image.height,
          };
        });
        const processedContacts = contacts.map((contact) => {
          if (contact.type === "phone")
            return {
              ...contact,
              value: getClearValue(contact.value),
            };
          return contact;
        });
        const timelinePayload = timelineItems.map((item) => ({
          start: item.start,
          finish: item.finish,
          title: item.title.trim(),
          description: item.description.trim() ? item.description.trim() : null,
        }));
        const newEvent = {
          ...DEFAULT_EVENT_DATA,
          title: eventName,
          ...currentPlace,
          date: { start, finish },
          price:
            Number(priceStart) > 0
              ? {
                  start: Number(priceStart),
                  finish: Number(priceFinish) > 0 ? Number(priceFinish) : 0,
                }
              : null,
          currency: "UAH" as const,
          description: aboutEvent,
          imageFiles: currentImageFiles || [],
          contacts: processedContacts || [],
          likeUserIds: eventUser?.likeUserIds || [],
          goingUserIds: eventUser?.goingUserIds || [],
          comments: eventUser?.comments || [],
          timeline: timelinePayload || eventUser?.timeline || [],
        };
        if (eventUser && eventUser.userId) {
          const updatedEventResult = await changeEventMutation({
            body: {
              ...eventUser,
              ...newEvent,
              userId: eventUser.userId._id,
            },
          }).unwrap();
          if (updatedEventResult?.event) {
            Toast.show({
              type: "success",
              text1: i18n._(
                "Your event is under review and will appear after verification"
              ),
            });
          }
        } else {
          const result = await addEventMutation({
            body: {
              ...newEvent,
              userId: userData._id,
            },
          }).unwrap();
          if (result?.event) {
            await onSetUserProperties({
              amountEvents: ((userData.eventsIds?.length || 0) + 1).toString(),
            });
            Toast.show({
              type: "success",
              text1: i18n._(
                "Your event is under review and will appear after verification"
              ),
            });
          }
        }
        navigation.goBack();
      } catch (error) {
        console.warn("error onSaveEvent:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getEventUser = async () => {
    setLoading(true);
    if (params) {
      if (eventUser) {
        setEventName(eventUser.title);
        if (eventUser.place_id?.place_id) {
          try {
            const placeDB = await getPlace(eventUser.place_id?.place_id);
            setPlaceAddress({
              placeId: eventUser.place_id.place_id,
              title: placeDB ? placeDB[language].formatted_address : "",
              address: eventUser.place_address,
              coordinates: eventUser.coordinates,
            });
          } catch (error) {
            console.warn("error getEventUser getPlace:", error);
          }
        }
        setBeginDate(new Date(eventUser.date.start));
        setBeginTime(new Date(eventUser.date.start));
        setFinishDate(new Date(eventUser.date.finish));
        setFinishTime(new Date(eventUser.date.finish));
        setPriceStart(eventUser.price?.start.toString() || "");
        setPriceFinish(eventUser.price?.finish.toString() || "");
        setAboutEvent(eventUser.description);
        setImages(eventUser.imageFiles || []);
        const timelineDrafts = (eventUser.timeline || []).map(
          (item, index) => ({
            id: `${item.start}-${index}`,
            title: item.title || "",
            description: item.description || "",
            start: item.start,
            finish: item.finish ?? null,
          })
        );
        setTimelineItems(timelineDrafts);
        if (eventUser.contacts && eventUser.contacts.length > 0) {
          const phoneContact = eventUser.contacts.find(
            (contact) => contact.type === "phone"
          );
          const otherContacts = eventUser.contacts.filter(
            (contact) => contact.type !== "phone"
          );
          if (phoneContact) setContacts([phoneContact, ...otherContacts]);
          else
            setContacts([
              { type: "phone", value: `+${DEFAULT_CODE_COUNTRY}` },
              ...otherContacts,
            ]);
        } else
          setContacts([{ type: "phone", value: `+${DEFAULT_CODE_COUNTRY}` }]);
      }
    }
    setLoading(false);
  };

  const onDeleteEvent = async () => {
    if (!eventUser?._id) return;
    setLoading(true);
    try {
      await deleteEventMutation({
        body: { _id: eventUser._id },
      }).unwrap();
      if (userData && userData.eventsIds.length > 0)
        await onSetUserProperties({
          amountEvents: (userData.eventsIds.length - 1).toString(),
        });
      setIsShowDeleteModal(false);
      navigation.goBack();
    } catch (error) {
      console.warn("error deleteEvent:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventUser();
  }, [params, placesDB]);

  useEffect(() => {
    if (!eventUser && userData?.phoneNumber && contacts[0]?.value.length < 5)
      setContacts([{ type: "phone", value: userData.phoneNumber }]);
  }, [userData, eventUser]);

  useEffect(() => {
    if (needCheck) {
      checkValueOnBlur(needCheck);
      setNeedCheck(null);
    }
  }, [needCheck]);

  return (
    <KeyboardAvoidingView
      contentContainerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
      behavior="padding"
    >
      <Header
        title={eventUser ? i18n._("Change event") : i18n._("Create event")}
        onRightDelete={
          eventUser
            ? () => {
                setIsShowDeleteModal(true);
              }
            : undefined
        }
      />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>{i18n._("You can create an event")}:</Text>
          <BoxSelectImages
            isRegular
            isSubTitle
            images={images}
            setImages={setImages}
          />
          <Input
            isRegular
            placeholder={i18n._("Enter the name of the event")}
            label={i18n._("Name of the event")}
            value={eventName}
            onBlurProp={() => checkValueOnBlur("eventName")}
            onChange={(value) => {
              setEventName(value);
              setErrorMessage(null);
            }}
            errorMessage={errorMessage?.eventName?.title}
          />
          <View style={styles.containerLocation}>
            <InputButton
              isRegular
              placeholder={i18n._("Enter the address")}
              label={i18n._("The place of the event")}
              value={showTitlePlace}
              customStyles={styles.buttonLocation}
              onPress={() => {
                setIsModalPlace(true);
              }}
              errorMessage={errorMessage?.location?.title}
            />
            <TouchableOpacity
              style={styles.buttonMap}
              onPress={() => {
                setIsModalPlace(true);
              }}
            >
              <IconMapGradient width={41} height={32} />
            </TouchableOpacity>
          </View>
          <View style={styles.contactsContainer}>
            <Text style={styles.labelContacts}>{i18n._("Contacts")}</Text>
            <View style={styles.contactsListContainer}>
              {contacts.map((contact, index) => {
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
                          setPhoneNumber={(value) => {
                            setContacts((prev) =>
                              prev.map((c, i) =>
                                i === index ? { ...c, value } : c
                              )
                            );
                          }}
                          selectCountryIso={selectCountryIso}
                          setSelectCountryIso={setSelectCountryIso}
                          labelStyle={styles.labelInput}
                          isErrorMessage={false}
                        />
                      ) : (
                        <Input
                          isRegular
                          placeholder={getContactTypeTitle(contact.type)}
                          label={getContactTypeTitle(contact.type)}
                          value={contact.value}
                          onChange={(value) => {
                            setContacts((prev) =>
                              prev.map((c, i) =>
                                i === index ? { ...c, value } : c
                              )
                            );
                          }}
                          labelStyle={styles.labelInput}
                        />
                      )}
                    </View>
                    {canDelete && (
                      <TouchableOpacity
                        style={styles.deleteContactIconButton}
                        onPress={() => {
                          setContacts((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
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
          <Text style={styles.subtitle}>{i18n._("Date of the event")}</Text>
          <View style={styles.wrapper}>
            <View style={styles.inner}>
              <DatePicker
                isRegular
                value={beginDate}
                label={i18n._("The beginning")}
                onChange={(dataTime, data) => {
                  onChangeBeginDate(dataTime, data);
                  setErrorMessage(null);
                }}
                mode="date"
              />
            </View>
            <View style={styles.inner}>
              <DatePicker
                value={beginTime}
                onChange={(dataTime, data) => {
                  onChangeBeginTime(dataTime, data);
                  setErrorMessage(null);
                }}
                mode="time"
              />
            </View>
          </View>
          <View style={styles.wrapper}>
            <View style={styles.inner}>
              <DatePicker
                isRegular
                value={finishDate}
                label={i18n._("Conclusion")}
                onBlur={() => {
                  checkValueOnBlur("finish");
                }}
                onChange={(dataTime, data) => {
                  onChangeFinishDate(dataTime, data);
                  setErrorMessage(null);
                }}
                mode="date"
                errorMessage={errorMessage?.finish?.title}
              />
            </View>
            <View style={styles.inner}>
              <DatePicker
                value={finishTime}
                onChange={(dataTime, data) => {
                  onChangeFinishTime(dataTime, data);
                  setErrorMessage(null);
                }}
                mode="time"
                errorMessage={errorMessage?.finish?.title}
              />
            </View>
          </View>
          <TimelineSection
            timelineItems={timelineItems}
            setTimelineItems={setTimelineItems}
            eventRange={eventRange}
          />
          <Text style={styles.subtitle}>{i18n._("Participation fee")}:</Text>
          <View style={styles.containerPrices}>
            <View style={styles.inner}>
              <Input
                placeholder={i18n._("100 uah")}
                value={priceStart}
                onChange={(value) => {
                  if (!isNaN(Number(value))) {
                    setPriceStart(value);
                    setErrorMessage(null);
                  }
                }}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.lineInputs} />
            <View style={styles.inner}>
              <Input
                placeholder={i18n._("200 uah")}
                value={priceFinish}
                onChange={(value) => {
                  if (!isNaN(Number(value))) {
                    setPriceFinish(value);
                    setErrorMessage(null);
                    setNeedCheck("finish");
                  }
                }}
                keyboardType="numeric"
              />
            </View>
          </View>
          <Input
            placeholder={i18n._("Briefly describe what will happen")}
            isRegular
            label={`${i18n._("Tell us about the event")}`}
            value={aboutEvent}
            onBlurProp={() => checkValueOnBlur("aboutEvent")}
            customStyles={styles.multipleInput}
            onChange={(value) => {
              setErrorMessage(null);
              setAboutEvent(value);
            }}
            errorMessage={errorMessage?.aboutEvent?.title}
          />
          <Text style={styles.errorMessage}>
            {errorMessage?.errorMessage?.title || ""}
          </Text>
          <ButtonCustom title={i18n._("Confirm")} onSubmit={onSaveEvent} />
          <View style={styles.empty} />
        </ScrollView>
      </View>
      <ModalSheetSearchPlaceAddress
        isOpen={isModalPlace}
        onClose={() => {
          setIsModalPlace(false);
        }}
        onSubmit={(data) => {
          setPlaceAddress(data);
          setIsModalPlace(false);
          setNeedCheck("location");
        }}
        statePlace={placeAddress || undefined}
      />
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
            const phoneCount = contacts.filter(
              (c) => c.type === "phone"
            ).length;
            if (phoneCount < 5)
              setContacts((prev) => [
                ...prev,
                { type, value: `+${DEFAULT_CODE_COUNTRY}` },
              ]);
            else
              Toast.show({
                type: "error",
                text1: i18n._("Error"),
                text2: i18n._("You can add up to 5 phone numbers"),
              });
          } else {
            const existingTypes = contacts.map((c) => c.type);
            if (!existingTypes.includes(type))
              setContacts((prev) => [...prev, { type, value: "" }]);
            else
              Toast.show({
                type: "error",
                text1: i18n._("Error"),
                text2: i18n._("This contact type has already been added"),
              });
          }
        }}
      />
      {isShowDeleteModal && (
        <ModalDelete
          onClose={() => {
            setIsShowDeleteModal(false);
          }}
          onSubmit={onDeleteEvent}
        />
      )}
    </KeyboardAvoidingView>
  );
};
