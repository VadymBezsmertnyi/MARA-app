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

export const TimePicker: FunctionComponent<TimePickerProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const { i18n } = useLocalesProvider();
  const [isShowModal, setIsShowModal] = useState(false);
  const [tempTime, setTempTime] = useState<Date | null>(null);

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
    if (!value) return "00:00";
    return value;
  }, [value]);

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
        is24Hour: true,
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
        <Text style={styles.timeText}>{displayTime}</Text>
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
              is24Hour
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
