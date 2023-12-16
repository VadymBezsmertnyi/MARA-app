import React, { FunctionComponent, useContext, useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BlurView } from 'expo-blur';

// providers
import { localesContext } from '../../../localization/localization.provider';

// components
import { ButtonCustom } from '../ButtonCustom/ButtonCustom';

// styles
import { styles } from './SelectPicker.styles';

type SelectPickerProps<T = { title: string; key: string }> = {
  value: string;
  label?: string;
  onChange: (value: T) => void;
  data: T[];
};

export const SelectPicker: FunctionComponent<SelectPickerProps<{ title: string; key: string }>> = ({
  value,
  label,
  onChange,
  data,
}) => {
  const { i18n } = useContext(localesContext);
  const [isShowModal, setIsShowModal] = useState(false);

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
          <Text style={styles.input}>{value}</Text>
        </View>
      </TouchableOpacity>

      <Modal style={styles.modal} animationType="fade" transparent visible={isShowModal}>
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
            {data.map(item => (
              <Picker.Item
                key={`select-language-${item.key}`}
                label={item.title}
                value={item.key}
              />
            ))}
          </Picker>
          <ButtonCustom
            styleContainer={styles.button}
            title={i18n._('Confirm')}
            onSubmit={() => {
              setIsShowModal(false);
            }}
          />
        </BlurView>
      </Modal>
    </>
  );
};
