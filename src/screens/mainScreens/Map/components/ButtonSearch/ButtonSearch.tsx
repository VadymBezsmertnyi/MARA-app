import React, { FunctionComponent, useContext } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';

// providers
import { workshopsContext } from '../../../../../providers/workshops/workshops.provider';

// components
import { IconSearchMap } from '../../../../../icons/components';

// styles
import { styles } from './ButtonSearch.styles';
import colors from '../../../../../../styles/colors';

export const ButtonSearch: FunctionComponent = () => {
  const { isSearchMap, setIsSearchMap } = useContext(workshopsContext);
  const toggleSearch = () => {
    setIsSearchMap(!isSearchMap);
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
