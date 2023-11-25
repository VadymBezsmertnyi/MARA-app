import React, { FunctionComponent, useContext } from 'react';
import { TextInput, View } from 'react-native';
import { t } from '@lingui/macro';

// providers
import { localesContext } from '../../../localization/localization.provider';

// components
import { IconSearchInput } from '../../icons/components';

// styles
import { styles } from './InputSearch.styles';

type InputSearchProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export const InputSearch: FunctionComponent<InputSearchProps> = ({
  value,
  onChangeText,
  placeholder,
}) => {
  const { i18n } = useContext(localesContext);
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder ? placeholder : t(i18n)`Enter the text to search`}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
      <IconSearchInput width={26} height={26} />
    </View>
  );
};
