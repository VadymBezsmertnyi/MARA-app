import React, { FunctionComponent } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// types
import { RootNewsScreensParamList } from '../../../navigators/Navigators.types';

// components

// icons
import { ArrowLongRight, IconSearchInput } from '../../../icons/components';

// constants
import { PATHS_NEWS_SCREENS } from '../../../navigators/useNavigator.constants';

// styles
import colors from '../../../../styles/colors';
import { styles } from './WorkshopMain.styles';
import { Input } from '../../../components/Input/Input';

type WorkshopMainProps = {
  navigation: NativeStackNavigationProp<RootNewsScreensParamList>;
};

export const WorkshopMain: FunctionComponent<WorkshopMainProps> = ({ navigation }) => {
  const onToEventsList = () => {
    navigation.navigate(PATHS_NEWS_SCREENS.eventsList);
  };
  const onToNewsList = () => {
    navigation.navigate(PATHS_NEWS_SCREENS.newsList);
  };
  return (
    <View style={{}}>
      <Input
        value=""
        placeholder="dsds"
        onChange={() => null}
        InputIcon={<IconSearchInput width={26} height={26} />}
      />
      <ScrollView style={styles.container}>
        <View style={styles.containerPart}>
          <Text style={styles.titleType}>Upcoming events:</Text>
          <View style={styles.containerEvents}></View>
          <TouchableOpacity style={styles.buttonMore} onPress={onToEventsList}>
            <Text style={styles.titleButtonMore}>More events</Text>
            <ArrowLongRight width={40} height={12} fill={colors.blueTufts} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerPart}>
          <Text style={styles.titleType}>Latest news:</Text>
          <View style={styles.containerEvents}></View>
          <TouchableOpacity style={styles.buttonMore} onPress={onToNewsList}>
            <Text style={styles.titleButtonMore}>More news</Text>
            <ArrowLongRight width={40} height={12} fill={colors.blueTufts} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
