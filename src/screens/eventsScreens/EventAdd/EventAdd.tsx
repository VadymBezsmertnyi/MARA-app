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
type FormStateType = {
  eventName: string;
  placeAddress: ItemSearchPlaceAddressType | null;
  aboutEvent: string;
  images: ImageFileType[];
  contacts: TContact[];
  selectCountryIso: string;
};

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
  const [form, setForm] = useState<FormStateType>({
    eventName: "",
    placeAddress: null,
    aboutEvent: "",
    images: [],
    contacts: [{ type: "phone", value: `+${DEFAULT_CODE_COUNTRY}` }],
    selectCountryIso: DEFAULT_COUNTRY,
  });
  const [isModalPlace, setIsModalPlace] = useState(false);
  const [eventDates, setEventDates] = useState({
    beginDate: CURRENT_DEFAULT_DATE,
    beginTime: CURRENT_DEFAULT_DATE,
    finishDate: CURRENT_DEFAULT_DATE_HOUR,
    finishTime: CURRENT_DEFAULT_DATE_HOUR,
  });
  const [prices, setPrices] = useState({ start: "", finish: "" });
  const [timelineItems, setTimelineItems] = useState<TimelineItemDraft[]>([]);
  const [isShowContactTypeModal, setIsShowContactTypeModal] = useState(false);
  const [isShowErrors, setIsShowErrors] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Record<
    string,
    { name: string; title: string }
  > | null>(null);
  const [needCheck, setNeedCheck] = useState<NamesErrorsType | null>(null);

  const showTitlePlace = useMemo(() => {
    const currentPlaceAddress = form.placeAddress;
    if (!currentPlaceAddress) return "";
    const findPlace =
      placesDB.find(
        (placeDB) =>
          placeDB._id === currentPlaceAddress.placeId ||
          placeDB.place_id === currentPlaceAddress.placeId
      ) || null;
    if (!findPlace) {
      getPlace(currentPlaceAddress.placeId);
      return currentPlaceAddress.title;
    }
    return findPlace[language].formatted_address;
  }, [placesDB, form.placeAddress]);
  const eventUser = useMemo(
    () =>
      params?.eventId
        ? eventsUserList.find((eventUser) => eventUser._id === params?.eventId)
        : null,
    [params?.eventId]
  );
  const start = useMemo(
    () =>
      combineDateAndTime(eventDates.beginDate, eventDates.beginTime).getTime(),
    [eventDates.beginDate, eventDates.beginTime]
  );
  const finish = useMemo(
    () =>
      combineDateAndTime(
        eventDates.finishDate,
        eventDates.finishTime
      ).getTime(),
    [eventDates.finishDate, eventDates.finishTime]
  );
  const eventRange = useMemo(() => {
    const min = Math.min(start, finish);
    const max = Math.max(start, finish);
    return { min, max };
  }, [start, finish]);
  const errorsObject = useMemo(
    () => ({
      ...((form.eventName.length < 5 || form.eventName.length > 40) && {
        eventName: getErrorText("eventName", {
          min: 5,
          max: 40,
          otherName: i18n._("event"),
        }),
      }),
      ...(form.placeAddress === null && {
        location: getErrorText("location", { otherName: i18n._("event") }),
      }),
      ...(start > finish && {
        finish: getErrorText("finish", {}),
      }),
      ...((form.aboutEvent.length < 20 || form.aboutEvent.length > 2000) && {
        aboutEvent: getErrorText("aboutEvent", {
          min: 20,
          max: 2000,
          otherName: i18n._("event"),
        }),
      }),
    }),
    [form.eventName, form.placeAddress, start, finish, form.aboutEvent]
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
      setEventDates((prev) => {
        const isAfterFinish = dayjs(selectedDate)
          .startOf("day")
          .isAfter(dayjs(prev.finishDate).startOf("day"));
        return {
          ...prev,
          beginDate: selectedDate,
          ...(isAfterFinish ? { finishDate: selectedDate } : {}),
        };
      });
    }
  };

  const onChangeBeginTime = (
    _event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    if (selectedDate) {
      setEventDates((prev) => {
        const isAfterFinish = dayjs(selectedDate).isAfter(
          dayjs(prev.finishTime)
        );
        return {
          ...prev,
          beginTime: selectedDate,
          ...(isAfterFinish
            ? { finishTime: dayjs(selectedDate).add(1, "hour").toDate() }
            : {}),
        };
      });
    }
  };

  const onChangeFinishDate = (
    _event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    if (selectedDate)
      setEventDates((prev) => ({ ...prev, finishDate: selectedDate }));
  };
  const onChangeFinishTime = (
    _event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    if (selectedDate)
      setEventDates((prev) => ({ ...prev, finishTime: selectedDate }));
  };

  const onSaveEvent = async () => {
    const isError = checkEnterData();
    if (userData?._id && !isError && form.placeAddress) {
      if (!validateTimelineItems(timelineItems, eventRange, i18n)) return;
      setLoading(true);
      try {
        const currentPlace =
          eventUser &&
          form.placeAddress?.placeId === eventUser.place_id?._id &&
          form.placeAddress.address === eventUser.place_address
            ? {
                place_id: eventUser.place_id,
                region_place_id: eventUser.region_place_id,
                country_place_id: eventUser.country_place_id,
                place_address: eventUser.place_address,
                coordinates: eventUser.coordinates,
              }
            : { place: form.placeAddress };
        const currentImageFiles = form.images.map((image) => {
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
        const processedContacts = form.contacts.map((contact) => {
          if (contact.type === "phone")
            return {
              ...contact,
              value: getClearValue(contact.value),
            };
          return contact;
        });
        const timelinePayload = timelineItems
          .map((item) => ({
            start: item.start,
            finish: item.finish,
            title: item.title.trim(),
            description: item.description.trim()
              ? item.description.trim()
              : null,
          }))
          .sort((a, b) => a.start - b.start);
        const newEvent = {
          ...DEFAULT_EVENT_DATA,
          title: form.eventName,
          ...currentPlace,
          date: { start, finish },
          price:
            Number(prices.start) > 0
              ? {
                  start: Number(prices.start),
                  finish: Number(prices.finish) > 0 ? Number(prices.finish) : 0,
                }
              : null,
          currency: "UAH" as const,
          description: form.aboutEvent,
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
        setForm((prev) => ({ ...prev, eventName: eventUser.title }));
        const eventPlaceId = eventUser.place_id?.place_id;
        if (eventPlaceId) {
          try {
            const placeDB = await getPlace(eventPlaceId);
            setForm((prev) => ({
              ...prev,
              placeAddress: {
                placeId: eventPlaceId,
                title: placeDB ? placeDB[language].formatted_address : "",
                address: eventUser.place_address,
                coordinates: eventUser.coordinates,
              },
            }));
          } catch (error) {
            console.warn("error getEventUser getPlace:", error);
          }
        }
        setEventDates({
          beginDate: new Date(eventUser.date.start),
          beginTime: new Date(eventUser.date.start),
          finishDate: new Date(eventUser.date.finish),
          finishTime: new Date(eventUser.date.finish),
        });
        setPrices({
          start: eventUser.price?.start.toString() || "",
          finish: eventUser.price?.finish.toString() || "",
        });
        setForm((prev) => ({
          ...prev,
          aboutEvent: eventUser.description,
          images: eventUser.imageFiles || [],
        }));
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
        } else
          setForm((prev) => ({
            ...prev,
            contacts: [{ type: "phone", value: `+${DEFAULT_CODE_COUNTRY}` }],
          }));
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
    if (
      !eventUser &&
      userData?.phoneNumber &&
      form.contacts[0]?.value.length < 5
    )
      setForm((prev) => ({
        ...prev,
        contacts: [{ type: "phone", value: userData.phoneNumber || "" }],
      }));
  }, [userData, eventUser, form.contacts]);

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
            placeholder={i18n._("Enter the name of the event")}
            label={i18n._("Name of the event")}
            value={form.eventName}
            onBlurProp={() => checkValueOnBlur("eventName")}
            onChange={(value) => {
              setForm((prev) => ({ ...prev, eventName: value }));
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
                          setPhoneNumber={(value) => {
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
                          isErrorMessage={false}
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
          <Text style={styles.subtitle}>{i18n._("Date of the event")}</Text>
          <View style={styles.wrapper}>
            <View style={styles.inner}>
              <DatePicker
                isRegular
                value={eventDates.beginDate}
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
                value={eventDates.beginTime}
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
                value={eventDates.finishDate}
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
                value={eventDates.finishTime}
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
                value={prices.start}
                onChange={(value) => {
                  if (!isNaN(Number(value))) {
                    setPrices((prev) => ({ ...prev, start: value }));
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
                value={prices.finish}
                onChange={(value) => {
                  if (!isNaN(Number(value))) {
                    setPrices((prev) => ({ ...prev, finish: value }));
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
            value={form.aboutEvent}
            onBlurProp={() => checkValueOnBlur("aboutEvent")}
            customStyles={styles.multipleInput}
            onChange={(value) => {
              setErrorMessage(null);
              setForm((prev) => ({ ...prev, aboutEvent: value }));
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
          setForm((prev) => ({ ...prev, placeAddress: data }));
          setIsModalPlace(false);
          setNeedCheck("location");
        }}
        statePlace={form.placeAddress || undefined}
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
