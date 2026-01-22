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
import * as FileSystem from "expo-file-system/legacy";
import dayjs from "dayjs";

// types
import {
  RootAllScreensParamList,
  RootEventsScreensParamList,
  RootSettingsScreensParamList,
} from "../../../navigators/Navigators.types";
import { ImageFileType } from "../../../storeRedux/types";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useEventsProvider } from "../../../providers/EventsProvider/EventsProvider";
import { useUserProvider } from "../../../providers/UserProvider/UserProvider";
import { useLoadingProvider } from "../../../providers/LoadingProvider/LoadingProvider";
import { usePlacesProvider } from "../../../providers/PlacesProvider/PlacesProvider";
import { DEFAULT_EVENT_DATA } from "../../../providers/EventsProvider/EventsProvider.constants";

// components
import { Input } from "../../../components/Input/Input";
import { DatePicker } from "./components/DatePicker/DatePicker";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { BoxSelectImages } from "../../../components/BoxSelectImages/BoxSelectImages";
import { InputButton } from "../../../components/InputButton/InputButton";
import { ModalShowErrors } from "../../../components/ModalShowErrors/ModalShowErrors";
import { Header } from "../../../components/Header/Header";
import { ModalDelete } from "../../../components/ModalDelete/ModalDelete";
import { ItemSearchPlaceAddressType } from "../../../components/ModalSheetSearchPlaceAddress/ModalSheetSearchPlaceAddress.types";
import { ModalSheetSearchPlaceAddress } from "../../../components/ModalSheetSearchPlaceAddress/ModalSheetSearchPlaceAddress";

// icons
import { IconMapGradient } from "../../../icons/components";

// helps
import { combineDateAndTime } from "../../../helps/helps";
import { useErrors } from "../../../helps/useErrors";

// styles
import { styles } from "./EventAdd.styles";

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
  const { addEvent, changeEvent, eventsUserList, deleteEvent } =
    useEventsProvider();
  const { userData } = useUserProvider();
  const { setLoading } = useLoadingProvider();
  const { placesDB, getPlace } = usePlacesProvider();
  const { getErrorText } = useErrors(i18n);
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

  const onChangeBeginDate = (
    _event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    if (selectedDate) setBeginDate(selectedDate);
  };

  const onChangeBeginTime = (
    _event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    if (selectedDate) setBeginTime(selectedDate);
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
      const currentImageFiles = images.map((image) => ({
        _id: image._id || "",
        url: image.url || "",
        width: image.width,
        height: image.height,
      }));
      const newEvent = {
        ...DEFAULT_EVENT_DATA,
        title: eventName,
        ...currentPlace,
        date: {
          start,
          finish,
        },
        price:
          Number(priceStart) > 0
            ? {
                start: Number(priceStart),
                finish: Number(priceFinish) > 0 ? Number(priceFinish) : 0,
              }
            : null,
        currency: "UAH" as const,
        description: aboutEvent,
        imageFiles: currentImageFiles,
        likeUserIds: eventUser?.likeUserIds.map((item) => item._id) || [],
      };
      if (eventUser && eventUser.userId)
        await changeEvent({
          ...eventUser,
          ...newEvent,
          userId: eventUser.userId._id,
        });
      else
        await addEvent({
          ...newEvent,
          userId: userData._id,
        });
      navigation.goBack();
    }
  };

  const getEventUser = async () => {
    setLoading(true);
    if (params) {
      if (eventUser) {
        const images = await Promise.all(
          eventUser.imageFiles.map(async (image) => {
            const response = await FileSystem.downloadAsync(
              image.url,
              `${FileSystem.documentDirectory}temp.jpg`
            );
            const base64 = await FileSystem.readAsStringAsync(response.uri, {
              encoding: "base64",
            });
            return {
              _id: image._id,
              url: image.url,
              width: image.width,
              height: image.height,
              base64,
            };
          })
        );
        setEventName(eventUser.title);
        if (eventUser.place_id?.place_id) {
          const placeDB = await getPlace(eventUser.place_id?.place_id);
          setPlaceAddress({
            placeId: eventUser.place_id.place_id,
            title: placeDB ? placeDB[language].formatted_address : "",
            address: eventUser.place_address,
            coordinates: eventUser.coordinates,
          });
        }
        setBeginDate(new Date(eventUser.date.start));
        setBeginTime(new Date(eventUser.date.start));
        setFinishDate(new Date(eventUser.date.finish));
        setFinishTime(new Date(eventUser.date.finish));
        setPriceStart(eventUser.price?.start.toString() || "");
        setPriceFinish(eventUser.price?.finish.toString() || "");
        setAboutEvent(eventUser.description);
        setImages(images);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getEventUser();
  }, [params, placesDB]);

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
          <BoxSelectImages
            images={images}
            setImages={setImages}
            containerStyle={styles.containerImages}
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
      {isShowDeleteModal && (
        <ModalDelete
          onClose={() => {
            setIsShowDeleteModal(false);
          }}
          onSubmit={async () => {
            if (eventUser?._id) {
              await deleteEvent(eventUser._id, "user");
              setIsShowDeleteModal(false);
            }
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
};
