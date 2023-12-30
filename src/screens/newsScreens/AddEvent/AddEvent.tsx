import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootNewsScreensParamList } from "../../../navigators/Navigators.types";

// schemas
import { locationSchema } from "../../../providers/EventsProvider/EventsProvider.schemas";

// providers
import { localesContext } from "../../../../localization/localization.provider";
import { eventsContext } from "../../../providers/EventsProvider/EventsProvider";
import { userContext } from "../../../providers/user/user.provider";
import { modalsSheetContext } from "../../../providers/ModalsSheetProvider/ModalsSheetProvider";

// components
import { Input } from "../../../components/Input/Input";
import { DatePicker } from "./components/DatePicker/DatePicker";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { ImagesEvent } from "./components/ImagesEvent/ImagesEvent";
import { InputButton } from "../../../components/InputButton/InputButton";

// icons
import { IconMapGradient } from "../../../icons/components";

// helps
import { combineDateAndTime } from "../../../helps/helps";
import { getErrorText } from "./AddEvent.helps";

// constants
import { PATHS_NEWS_SCREENS } from "../../../navigators/useNavigator.constants";

// styles
import { styles } from "./AddEvent.styles";
import colors from "../../../../styles/colors";

type AddEventProps = {
  navigation: NativeStackNavigationProp<RootNewsScreensParamList>;
};

export const AddEvent: FunctionComponent<AddEventProps> = ({ navigation }) => {
  const { i18n } = useContext(localesContext);
  const { addEvent } = useContext(eventsContext);
  const { userData } = useContext(userContext);
  const { setModalType, location } = useContext(modalsSheetContext);
  const [eventName, setEventName] = useState("");
  const [beginDate, setBeginDate] = useState<Date>(new Date());
  const [beginTime, setBeginTime] = useState<Date>(new Date());
  const [finishDate, setFinishDate] = useState<Date>(new Date());
  const [finishTime, setFinishTime] = useState<Date>(new Date());
  const [price, setPrice] = useState("");
  const [aboutEvent, setAboutEvent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<Record<
    string,
    { name: string; title: string }
  > | null>(null);
  const start = useMemo(
    () => combineDateAndTime(beginDate, beginTime).getTime(),
    [beginDate, beginTime]
  );
  const finish = useMemo(
    () => combineDateAndTime(finishDate, finishTime).getTime(),
    [finishDate, finishTime]
  );

  const checkEnterData = () => {
    const errorsObject = {
      ...((eventName.length < 5 || eventName.length > 40) && {
        eventName: getErrorText("eventName", i18n),
      }),
      ...(location === null && {
        location: getErrorText("location", i18n),
      }),
      ...(start > finish && {
        finish: getErrorText("finish", i18n),
      }),
      ...((aboutEvent.length < 20 || aboutEvent.length > 2000) && {
        aboutEvent: getErrorText("aboutEvent", i18n),
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
    if (userData?.id && !isError) {
      const currentImages = images.map((image) => ({ id: "", url: "", image }));
      const currentLocation = locationSchema.safeParse(location);
      await addEvent({
        id: 0,
        userId: userData.id,
        title: eventName,
        location: currentLocation.success ? currentLocation.data : null,
        date: {
          start,
          finish,
        },
        price: Number(price),
        currency: "UAH",
        description: aboutEvent,
        images: currentImages,
      });
      navigation.navigate(PATHS_NEWS_SCREENS.eventsList);
    }
  };

  const onInputLocationModal = () => {
    setModalType("input-location");
    setErrorMessage(null);
  };

  const onMapLocationModal = () => {
    setModalType("map-location");
    setErrorMessage(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>{i18n._("You can create an event")}:</Text>
        <Input
          placeholder={i18n._("Enter the name of the event")}
          label={`${i18n._("Name of the event")}:*`}
          value={eventName}
          onChange={(value) => {
            setEventName(value);
            setErrorMessage(null);
          }}
          errorMessage={errorMessage?.eventName?.title}
        />
        <View style={styles.containerLocation}>
          <InputButton
            placeholder={i18n._("Enter the address")}
            label={`${i18n._("The place of the event")}:*`}
            value={location?.formatted_address}
            customStyles={styles.buttonLocation}
            onPress={onInputLocationModal}
            errorMessage={errorMessage?.location?.title}
          />
          <TouchableOpacity
            style={styles.buttonMap}
            onPress={onMapLocationModal}
          >
            <IconMapGradient width={41} height={32} />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>{i18n._("Date of the event")}</Text>
        <View style={styles.wrapper}>
          <View style={styles.inner}>
            <DatePicker
              value={beginDate}
              label={`${i18n._("The beginning")}:*`}
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
              value={finishDate}
              label={`${i18n._("Conclusion")}:*`}
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
        <View style={styles.wrapper}>
          <View style={styles.inner}>
            <Input
              placeholder={i18n._("100 uah")}
              label={`${i18n._("Participation fee")}:`}
              value={price}
              onChange={(value) => {
                if (!isNaN(Number(value))) {
                  setPrice(value);
                  setErrorMessage(null);
                }
              }}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inner} />
        </View>
        <View style={styles.wrapper}>
          <Input
            placeholder={i18n._("Briefly describe what will happen")}
            label={`${i18n._("Tell us about the event:")}*`}
            value={aboutEvent}
            customStyles={styles.multipleInput}
            onChange={(value) => {
              setErrorMessage(null);
              setAboutEvent(value);
            }}
            errorMessage={errorMessage?.aboutEvent?.title}
          />
        </View>
        <View style={styles.containerImages}>
          <Text style={styles.subtitle}>{i18n._("Add a photo")}:</Text>
          <ImagesEvent images={images} setImages={setImages} />
        </View>
        <Text style={{ textAlign: "center", color: colors.errorRed }}>
          {errorMessage?.errorMessage.title || ""}
        </Text>
        <ButtonCustom title={i18n._("Confirm")} onSubmit={onSaveEvent} />
      </ScrollView>
    </View>
  );
};
