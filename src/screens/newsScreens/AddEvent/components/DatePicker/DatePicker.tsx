import React, { FunctionComponent, useContext, useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker, {
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

type DatePickerProps = {
  value: Date;
  label?: string;
  onChange: (k: DateTimePickerEvent, d: Date | undefined) => void;
  mode: "date" | "time" | "datetime" | "countdown";
};

export const DatePicker: FunctionComponent<DatePickerProps> = ({
  value,
  label,
  mode = "date",
  onChange,
}) => {
  const { i18n } = useContext(localesContext);
  const [isShowModal, setIsShowModal] = useState(false);

  const parseDate =
    mode === "date" ? dateToNMY(value) : value.toLocaleTimeString("ua-UA");
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsShowModal(true);
        }}
        style={styles.container}
      >
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.wrapper}>
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
