import React, { FunctionComponent } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// types
import { RootWorkshopsScreensParamList } from '../../../../../navigators/Navigators.types';

// constants
import { PATHS_WORKSHOP_SCREENS } from '../../../../../navigators/useNavigator.constants';

// components
import { IconArrowRightNew } from '../../../../../icons/components';

// styles
import { styles } from './WorkshopItem.styles';

type WorkshopItemProps = {
  workshopId: number;
  title: string;
  description: string;
  range: number;
  comments: number;
  rate: number;
  navigation: NativeStackNavigationProp<RootWorkshopsScreensParamList>;
};

export const WorkshopItem: FunctionComponent<WorkshopItemProps> = ({
  workshopId,
  title,
  description,
  range,
  comments,
  rate,
  navigation,
}) => {
  const selectNew = () => {
    navigation.navigate(PATHS_WORKSHOP_SCREENS.workshopItem, { workshopId });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={selectNew}>
      <Image source={{}} />
      <View style={{}}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <View>
          <IconArrowRightNew width={12} height={20} />
          <IconArrowRightNew width={12} height={20} />
          <IconArrowRightNew width={12} height={20} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
