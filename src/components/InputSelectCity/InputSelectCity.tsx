import React, { FunctionComponent, useState } from 'react';
import { TextInput, View } from 'react-native';

// components
import { ArrowDown, IconLocationMarker } from '../../icons/components';

// styles
import colors from '../../../styles/colors';
import { styles } from './InputSelectCity.styles';

export const InputSelectCity: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <IconLocationMarker width={16} height={16} fill={colors.californiaOrange} />
      <TextInput style={styles.input} />
      {isOpen ? (
        <View style={styles.arrowToUp}>
          <ArrowDown width={16} height={16} fill={colors.black} />
        </View>
      ) : (
        <ArrowDown width={16} height={16} fill={colors.black} />
      )}
    </View>
  );
};
