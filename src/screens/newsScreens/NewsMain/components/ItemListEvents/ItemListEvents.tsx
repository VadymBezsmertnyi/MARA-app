import React, { FunctionComponent, useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { getDistance } from 'geolib';
import { ImageSource } from 'expo-image';

// provider
import { mapContext } from '../../../../../providers/map/map.provider';
import { localesContext } from '../../../../../../localization/localization.provider';

// hooks
import { formatDateFromUnixTimestamp } from '../../../../../helps/helps';

// components
import { ImageCache } from '../../../../../components/ImageCache/ImageCache';

// icons
import { IconLocationMarker } from '../../../../../icons/components';

// styles
import { styles } from './ItemListEvents.styles';
import colors from '../../../../../../styles/colors';

type ItemListEventsProps = {
  item: {
    id: number;
    title: string;
    address: string;
    startData: number;
    endData: number;
    location: [number, number];
    image: ImageSource | null;
  };
};

export const ItemListEvents: FunctionComponent<ItemListEventsProps> = ({ item }) => {
  const { location } = useContext(mapContext);
  const { i18n } = useContext(localesContext);
  const { title, address, image, startData, location: locationItem } = item;
  const distance = location
    ? getDistance(location, { longitude: locationItem[0], latitude: locationItem[1] })
    : null;

  const selectEvent = () => {};

  return (
    <TouchableOpacity style={styles.container} onPress={selectEvent}>
      <View style={styles.containerImage}>
        {image ? <ImageCache style={styles.image} contentFit="contain" imageSrc={image} /> : null}
      </View>
      <View style={styles.part}>
        <Text>{title}</Text>
        <Text>{address}</Text>
      </View>
      <View style={styles.part}>
        <Text>{formatDateFromUnixTimestamp(startData)}</Text>
        <View style={styles.containerLocation}>
          <IconLocationMarker width={15} height={15} fill={colors.californiaOrange} />
          <Text>{distance ? `${distance / 1000} км` : i18n._(`Not enabled location`)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
