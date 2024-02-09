import React, { FunctionComponent, useContext, useMemo, useState } from "react";
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

// components
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";
import { dateToNMY } from "../../../../../helps/helps";

// styles
import { styles } from "./DatePicker.styles";
import colors from "../../../../../../styles/colors";

type DatePickerProps = {
  value: Date;
  label?: string;
  onChange: (k: DateTimePickerEvent, d: Date | undefined) => void;
  mode: "date" | "time" | "datetime" | "countdown";
  errorMessage?: string;
  isRegular?: boolean;
};

export const DatePicker: FunctionComponent<DatePickerProps> = ({
  value,
  label,
  mode = "date",
  onChange,
  errorMessage,
  isRegular = false,
}) => {
  const { i18n } = useContext(localesContext);
  const [isShowModal, setIsShowModal] = useState(false);

  const inputWrapperStyles = useMemo(
    () => ({
      ...styles.wrapper,
      ...(errorMessage && { borderColor: colors.errorRed }),
    }),
    [errorMessage]
  );

  const parseDate =
    mode === "date"
      ? dateToNMY(value)
      : value.toLocaleTimeString("ua-UA", {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        });
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === "android")
            DateTimePickerAndroid.open({
              value: value ? value : new Date(0),
              onChange,
              mode:
                mode === "datetime"
                  ? "time"
                  : mode === "countdown"
                  ? "date"
                  : mode,
              display: "spinner",
              is24Hour: true,
            });
          else setIsShowModal(true);
        }}
        style={styles.container}
      >
        {label && (
          <Text style={styles.label}>
            {label}
            {isRegular ? (
              <>
                :<Text style={styles.labelRegular}>*</Text>
              </>
            ) : null}
          </Text>
        )}
        <View style={inputWrapperStyles}>
          <Text style={styles.input}>{parseDate}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        style={styles.modal}
        animationType="fade"
        transparent
        visible={isShowModal}
      >
        <Pressable
          style={styles.buttonBackground}
          onPress={() => {
            setIsShowModal(false);
          }}
        >
          <BlurView intensity={30} style={styles.containerBlur}>
            <DateTimePicker
              testID="dateTimePicker"
              value={value ? value : new Date(0)}
              mode={mode}
              display="spinner"
              onChange={onChange}
              minimumDate={new Date(0)}
              minuteInterval={5}
            />
            <ButtonCustom
              styleContainer={styles.button}
              title={i18n._("Confirm")}
              onSubmit={() => {
                setIsShowModal(false);
              }}
            />
          </BlurView>
        </Pressable>
      </Modal>
    </>
  );
};
