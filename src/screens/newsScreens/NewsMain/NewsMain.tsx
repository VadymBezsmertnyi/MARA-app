import React, { FunctionComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// components
import { ItemListEvents } from './components/ItemListEvents/ItemListEvents';

// icons
import { ArrowLongRight } from '../../../icons/components';

// styles
import colors from '../../../../styles/colors';
import { styles } from './NewsMain.styles';

const DEFAULT_LIST_EVENT = [
  {
    id: 1,
    title: 'Гонки-1',
    address: 'Автодром ім. Вадима-1',
    startData: 1699877491000,
    endData: 1700136691000,
    location: [49.48149391021346, 31.999342627823353],
    image: null,
  },
  {
    id: 2,
    title: 'Гонки-2',
    address: 'Автодром ім. Вадима-2',
    startData: 1699877491000,
    endData: 1700136691000,
    location: [49.47944629585574, 31.991484761238095],
    image: null,
  },
  {
    id: 3,
    title: 'Гонки-3',
    address: 'Автодром ім. Вадима-3',
    startData: 1699877491000,
    endData: 1700136691000,
    location: [49.47944629585574, 31.991484761238095],
    image: null,
  },
  {
    id: 4,
    title: 'Гонки-4',
    address: 'Автодром ім. Вадима-4',
    startData: 1699877491000,
    endData: 1700136691000,
    location: [49.47944629585574, 31.991484761238095],
    image: null,
  },
] as const;

export const NewsMain: FunctionComponent = () => {
  console.log('new-main');
  return (
    <View style={styles.container}>
      <View style={styles.containerPart}>
        <Text style={styles.titleType}>Upcoming events:</Text>
        <View style={styles.containerEvents}>
          {DEFAULT_LIST_EVENT.slice(0, 3).map(eventItem => (
            <ItemListEvents key={`event-${eventItem.id}`} item={eventItem} />
          ))}
        </View>
        <TouchableOpacity style={styles.buttonMore}>
          <Text style={styles.titleButtonMore}>More events</Text>
          <ArrowLongRight width={40} height={12} fill={colors.blueTufts} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerPart}>
        <Text style={styles.titleType}>Latest news:</Text>

        <View style={styles.containerEvents}></View>
        <TouchableOpacity style={styles.buttonMore}>
          <Text style={styles.titleButtonMore}>More news</Text>
          <ArrowLongRight width={40} height={12} fill={colors.blueTufts} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
