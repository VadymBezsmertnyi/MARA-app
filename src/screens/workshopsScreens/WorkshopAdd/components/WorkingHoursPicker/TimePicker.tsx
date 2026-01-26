import React, { FunctionComponent, useMemo, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// components
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";

// styles
import { styles } from "./WorkingHoursPicker.styles";

type TimePickerProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

const convert24To12 = (time24: string): string => {
  if (!time24) return "12:00 AM";
  const [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export const TimePicker: FunctionComponent<TimePickerProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const { i18n, language } = useLocalesProvider();
  const [isShowModal, setIsShowModal] = useState(false);
  const [tempTime, setTempTime] = useState<Date | null>(null);

  const is12HourFormat = useMemo(() => language === "en", [language]);

  const timeDate = useMemo(() => {
    if (tempTime) return tempTime;
    if (!value) return new Date();
    const [hours, minutes] = value.split(":").map(Number);
    const date = new Date();
    date.setHours(hours || 0);
    date.setMinutes(minutes || 0);
    return date;
  }, [value, tempTime]);

  const displayTime = useMemo(() => {
    if (!value) return is12HourFormat ? "12:00 AM" : "00:00";
    return is12HourFormat ? convert24To12(value) : value;
  }, [value, is12HourFormat]);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      if (event.type === "set" && selectedDate) {
        const hours = selectedDate.getHours().toString().padStart(2, "0");
        const minutes = selectedDate.getMinutes().toString().padStart(2, "0");
        onChange(`${hours}:${minutes}`);
      }
    } else {
      if (selectedDate) setTempTime(selectedDate);
    }
  };

  const openPicker = () => {
    if (disabled) return;
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: timeDate,
        onChange: handleChange,
        mode: "time",
        display: "spinner",
        is24Hour: !is12HourFormat,
      });
    } else {
      setTempTime(null);
      setIsShowModal(true);
    }
  };

  const handleSave = () => {
    if (tempTime) {
      const hours = tempTime.getHours().toString().padStart(2, "0");
      const minutes = tempTime.getMinutes().toString().padStart(2, "0");
      onChange(`${hours}:${minutes}`);
      setTempTime(null);
    }
    setIsShowModal(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={openPicker}
        style={[styles.timePicker, disabled && { opacity: 0.5 }]}
        disabled={disabled}
      >
        <Text style={styles.timeText} numberOfLines={1}>
          {displayTime}
        </Text>
      </TouchableOpacity>
      <Modal
        style={styles.modal}
        animationType="fade"
        transparent
        visible={isShowModal}
      >
        <Pressable
          style={styles.buttonBackground}
          onPress={() => setIsShowModal(false)}
        >
          <BlurView intensity={30} style={styles.containerBlur}>
            <DateTimePicker
              testID="timePicker"
              value={timeDate}
              mode="time"
              display="spinner"
              onChange={handleChange}
              is24Hour={!is12HourFormat}
              minuteInterval={5}
            />
            <ButtonCustom
              styleContainer={styles.button}
              title={i18n._("Save")}
              onSubmit={handleSave}
            />
          </BlurView>
        </Pressable>
      </Modal>
    </>
  );
};
