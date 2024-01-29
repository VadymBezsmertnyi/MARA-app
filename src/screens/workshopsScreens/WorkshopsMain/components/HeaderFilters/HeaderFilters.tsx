import React, { FunctionComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { IconFilter, IconSort } from '../../../../../icons/components';
import { styles } from './HeaderFilters.styles';

type HeaderFiltersProps = {
  onPressFilter: () => void;
  onPressSort: () => void;
};

export const HeaderFilters: FunctionComponent<HeaderFiltersProps> = ({
  onPressFilter,
  onPressSort,
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPressSort}>
      <IconSort width={20} height={20} />
    </TouchableOpacity>
    <TouchableOpacity onPress={onPressFilter}>
      <IconFilter width={20} height={20} />
    </TouchableOpacity>
  </View>
);
