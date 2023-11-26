import React, { FunctionComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// hooks
import { formatDateFromUnixTimestamp } from '../../../../../helps/helps';

// components
import { IconArrowRightNew } from '../../../../../icons/components';

// styles
import { styles } from './ItemListNews.styles';

type ItemListNewsProps = {
  title: string;
  date: number;
};

export const ItemListNews: FunctionComponent<ItemListNewsProps> = ({ title, date }) => {
  const selectNew = () => {};
  return (
    <TouchableOpacity style={styles.container} onPress={selectNew}>
      <View style={styles.containerTitles}>
        <Text>{title}</Text>
        <Text>{formatDateFromUnixTimestamp(date)}</Text>
      </View>
      <View>
        <IconArrowRightNew width={12} height={20} />
      </View>
    </TouchableOpacity>
  );
};
