import React, { FunctionComponent, useContext, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootNewsScreensParamList } from "../../../navigators/Navigators.types";

// providers
import { localesContext } from "../../../../localization/localization.provider";
import { eventsContext } from "../../../providers/EventsProvider/EventsProvider";
import { userContext } from "../../../providers/user/user.provider";
import { modalsSheetContext } from "../../../providers/ModalsSheetProvider/ModalsSheetProvider";

// components
import { Input } from "../../../components/Input/Input";
import { IconTabMap } from "../../../icons/components";
import { DatePicker } from "./components/DatePicker/DatePicker";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { ImagesEvent } from "./components/ImagesEvent/ImagesEvent";
import { InputButton } from "../../../components/InputButton/InputButton";

// helps
import { combineDateAndTime } from "../../../helps/helps";

// constants
import { PATHS_NEWS_SCREENS } from "../../../navigators/useNavigator.constants";

// styles
import { styles } from "./AddEvent.styles";

type AddEventProps = {
  navigation: NativeStackNavigationProp<RootNewsScreensParamList>;
};

export const AddEvent: FunctionComponent<AddEventProps> = ({ navigation }) => {
  const { i18n } = useContext(localesContext);
  const { addEvent } = useContext(eventsContext);
  const { userData } = useContext(userContext);
  const { setModalType } = useContext(modalsSheetContext);
  const [eventName, setEventName] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [beginDate, setBeginDate] = useState<Date>(new Date());
  const [beginTime, setBeginTime] = useState<Date>(new Date());
  const [finishDate, setFinishDate] = useState<Date>(new Date());
  const [finishTime, setFinishTime] = useState<Date>(new Date());
  const [price, setPrice] = useState("");
  const [aboutEvent, setAboutEvent] = useState("");
  const [images, setImages] = useState<string[]>([]);

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
    const start = combineDateAndTime(beginDate, beginTime).getTime();
    const finish = combineDateAndTime(finishDate, finishTime).getTime();

    if (userData?.id) {
      const currentImages = images.map((image) => ({ id: "", url: "", image }));
      await addEvent({
        id: 0,
        userId: userData.id,
        title: eventName,
        location: null, // TODO
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
  };

  const onMapLocationModal = () => {
    setModalType("map-location");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>{i18n._("You can create an event")}:</Text>
        <Input
          placeholder={i18n._("Enter the name of the event")}
          label={i18n._("Name of the event")}
          value={eventName}
          onChange={setEventName}
        />
        <View style={styles.containerLocation}>
          <InputButton
            placeholder={i18n._("Enter the address")}
            label={i18n._("The place of the event")}
            value={placeName}
            customStyles={styles.buttonLocation}
            onPress={onInputLocationModal}
          />
          <TouchableOpacity
            style={styles.buttonMap}
            onPress={onMapLocationModal}
          >
            <IconTabMap width={41} height={32} />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>{i18n._("Date of the event")}</Text>
        <View style={styles.wrapper}>
          <View style={styles.inner}>
            <DatePicker
              value={beginDate}
              label={`${i18n._("The beginning")}:`}
              onChange={onChangeBeginDate}
              mode="date"
            />
          </View>
          <View style={styles.inner}>
            <DatePicker
              value={beginTime}
              onChange={onChangeBeginTime}
              mode="time"
            />
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.inner}>
            <DatePicker
              value={finishDate}
              label={`${i18n._("Conclusion")}:`}
              onChange={onChangeFinishDate}
              mode="date"
            />
          </View>
          <View style={styles.inner}>
            <DatePicker
              value={finishTime}
              onChange={onChangeFinishTime}
              mode="time"
            />
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.inner}>
            <Input
              placeholder={i18n._("100 uah")}
              label={`${i18n._("Participation fee")}:`}
              value={price}
              onChange={setPrice}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inner} />
        </View>
        <View style={styles.wrapper}>
          <Input
            placeholder={i18n._("Briefly describe what will happen")}
            label={i18n._("Tell us about the event:")}
            value={aboutEvent}
            customStyles={styles.multipleInput}
            onChange={setAboutEvent}
          />
        </View>
        <View style={styles.containerImages}>
          <Text style={styles.subtitle}>{i18n._("Add a photo")}:</Text>
          <ImagesEvent images={images} setImages={setImages} />
        </View>
        <ButtonCustom title={i18n._("Confirm")} onSubmit={onSaveEvent} />
      </ScrollView>
    </View>
  );
};
