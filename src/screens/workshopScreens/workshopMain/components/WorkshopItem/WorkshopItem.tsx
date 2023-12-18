import React, { FunctionComponent, useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ImageSource } from 'expo-image';

// types
import { RootWorkshopsScreensParamList } from '../../../../../navigators/Navigators.types';

// constants
import { PATHS_WORKSHOP_SCREENS } from '../../../../../navigators/useNavigator.constants';

// components
import {
  IconChat,
  IconLocationMarker,
  IconStar,
  IconAutoService,
  IconMotoService,
} from '../../../../../icons/components';

// image
import WorkshopPlaceholder from '../../../../../../assets/default/workshop-placeholder.png';

// styles
import { styles } from './WorkshopItem.styles';
import colors from '../../../../../../styles/colors';

type WorkshopItemProps = {
  workshopId: number;
  title: string;
  description: string;
  range: number;
  comments: number;
  rate: number;
  navigation: NativeStackNavigationProp<RootWorkshopsScreensParamList>;
  isMotoService: boolean;
  isAutoService: boolean;
  image: ImageSource | null;
};

export const WorkshopItem: FunctionComponent<WorkshopItemProps> = ({
  workshopId,
  title,
  description,
  range,
  comments,
  rate,
  navigation,
  isMotoService,
  isAutoService,
  image,
}) => {
  const selectNew = () => {
    navigation.navigate(PATHS_WORKSHOP_SCREENS.workshopItem, { workshopId });
  };

  const autoServiceStyles = useMemo(
    () => ({ ...styles.auto, right: isMotoService ? 0 : -8 }),
    [isMotoService],
  );

  const checkImage = image || WorkshopPlaceholder;

  return (
    <TouchableOpacity style={styles.container} onPress={selectNew}>
      <View>
        <Image source={checkImage} style={styles.image} />
        {isAutoService && (
          <View style={autoServiceStyles}>
            <IconAutoService width={25} height={25} />
          </View>
        )}
        {isMotoService && (
          <View style={styles.moto}>
            <IconMotoService width={25} height={25} />
          </View>
        )}
      </View>
      <View style={styles.fitContent}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <View style={styles.wrapper}>
          <View style={styles.inner}>
            <IconLocationMarker fill={colors.californiaOrange} width={12} height={12} />
            <Text style={styles.infoText}>{range}</Text>
          </View>
          <View style={styles.comment}>
            <View style={styles.inner}>
              <IconChat width={12} height={12} fill={colors.californiaOrange} />
              <Text style={styles.infoText}>{comments}</Text>
            </View>
            <View style={styles.inner}>
              <IconStar width={12} height={12} fill={colors.yellow} />
              <Text style={styles.infoText}>{rate}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
