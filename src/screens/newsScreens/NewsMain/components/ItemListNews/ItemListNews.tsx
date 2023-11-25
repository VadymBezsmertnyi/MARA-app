import React, { FunctionComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { formatDateFromUnixTimestamp } from '../../../../../helps/helps';
import { styles } from './ItemListNews.styles';
import { IconArrowRightNew } from '../../../../../icons/components';

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
