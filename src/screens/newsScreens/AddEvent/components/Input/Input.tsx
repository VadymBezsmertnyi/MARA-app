import React, { FunctionComponent, useMemo, useState } from 'react';
import { KeyboardTypeOptions, Text, TextInput, View, ViewStyle } from 'react-native';
import colors from '../../../../../../styles/colors';
import { styles } from './Input.styles';

type InputProps = {
  placeholder: string;
  value: string;
  label: string;
  onChange: (k: string) => void;
  InputIcon?: React.ReactNode;
  customStyles?: ViewStyle;
  keyboardType?: KeyboardTypeOptions;
};

export const Input: FunctionComponent<InputProps> = ({
  placeholder,
  value,
  label,
  InputIcon,
  onChange,
  customStyles,
  keyboardType = 'default',
}) => {
  const [borderColor, setBorderColor] = useState(colors.platinumGray);

  const onFocus = () => {
    setBorderColor(colors.californiaOrange);
  };

  const onBlur = () => {
    setBorderColor(colors.platinumGray);
  };

  const inputWrapperStyles = useMemo(
    () => ({ ...styles.inputWrapper, borderColor }),
    [borderColor],
  );
  const inputStyles = useMemo(() => ({ ...styles.input, ...customStyles }), [customStyles]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={inputWrapperStyles}>
        <TextInput
          style={inputStyles}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          multiline={customStyles ? true : false}
          keyboardType={keyboardType}
        />
        {InputIcon}
      </View>
    </View>
  );
};
