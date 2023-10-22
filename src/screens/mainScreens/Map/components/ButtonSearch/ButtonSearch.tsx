import React, { FunctionComponent } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';

// components
import { IconSearchMap } from '../../../../../icons/components';

// styles
import { styles } from './ButtonSearch.styles';
import colors from '../../../../../../styles/colors';

export const ButtonSearch: FunctionComponent = () => {
  const toggleSearch = () => {
    console.log('toggleSearch');
  };

  return (
    <TouchableOpacity onPress={toggleSearch} style={styles.container}>
      {Platform.OS !== 'android' ? (
        <BlurView intensity={5} tint="dark" style={styles.blurViewContainer} />
      ) : null}
      <IconSearchMap width={26} height={26} fill={colors.chileanFireOrange} />
    </TouchableOpacity>
  );
};
