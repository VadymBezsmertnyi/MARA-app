import React, { FunctionComponent, useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { BlurView } from "expo-blur";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// components
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";

// styles
import { styles } from "./SelectPicker.styles";

type SelectPickerProps<T = { title: string; key: string }> = {
  value: string;
  onChange: (value: T) => void;
  data: T[];
  otherTitle?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
};

export const SelectPicker: FunctionComponent<
  SelectPickerProps<{ title: string; key: string }>
> = ({
  value,
  onChange,
  data,
  otherTitle = "",
  containerStyle,
  inputStyle,
}) => {
  const { i18n } = useLocalesProvider();
  const [isShowModal, setIsShowModal] = useState(false);
  const showTitle = useMemo(
    () => otherTitle || data.find((item) => item.key === value)?.title,
    [data, value, otherTitle]
  );
  const containerStyles = useMemo(
    () => [styles.container, containerStyle],
    [containerStyle]
  );
  const containerInput = useMemo(
    () => [styles.input, inputStyle],
    [inputStyle]
  );

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsShowModal(true);
        }}
        style={containerStyles}
      >
        <View style={styles.wrapper}>
          <Text style={containerInput}>{showTitle}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        style={styles.modal}
        animationType="fade"
        transparent
        visible={isShowModal}
      >
        <BlurView intensity={30} style={styles.containerBlur}>
          <Pressable
            style={styles.buttonBackground}
            onPress={() => {
              setIsShowModal(false);
            }}
          />
          <Picker
            selectedValue={value}
            onValueChange={(_itemValue, itemIndex) => {
              onChange(data[itemIndex]);
            }}
          >
            {data.map((item) => (
              <Picker.Item
                key={`select-language-${item.key}`}
                label={item.title}
                value={item.key}
              />
            ))}
          </Picker>
          <ButtonCustom
            styleContainer={styles.button}
            title={i18n._("Select")}
            onSubmit={() => {
              setIsShowModal(false);
            }}
          />
        </BlurView>
      </Modal>
    </>
  );
};
