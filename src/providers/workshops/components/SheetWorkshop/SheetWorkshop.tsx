import React, { FunctionComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// types
import { WorkshopT } from '../../workshops.types';

// components
import { IconRepair, IconStar } from '../../../../icons/components';

// styles
import colors from '../../../../../styles/colors';
import { styles } from './SheetWorkshop.styles';

type SheetWorkshopProps = {
  workshop: WorkshopT;
  isEndList: boolean;
};

export const SheetWorkshop: FunctionComponent<SheetWorkshopProps> = ({ workshop, isEndList }) => {
  const rating = workshop.rating.toFixed(1);
  const selectWorkshop = () => {
    console.log('selectWorkshop', workshop.id, workshop.title);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectWorkshop} style={styles.containerWorkshop}>
        <View style={styles.containerLeft}>
          <IconRepair width={24} height={24} fill={colors.grayFuscous} />
          <View style={styles.containerTitles}>
            <Text style={styles.title}>{workshop.title}</Text>
            <Text style={styles.subTitle}>{workshop.address}</Text>
          </View>
        </View>
        <View style={styles.containerRight}>
          <Text style={styles.title}>{rating}</Text>
          <IconStar width={20} height={20} fill={colors.grayFuscous} />
        </View>
      </TouchableOpacity>
      {!isEndList ? <View style={styles.line} /> : null}
    </View>
  );
};
