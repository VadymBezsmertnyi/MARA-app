import React, { FunctionComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// types
import { RootNewsScreensParamList } from '../../../navigators/Navigators.types';

// components
import { ItemListEvents } from './components/ItemListEvents/ItemListEvents';
import { ItemListNews } from './components/ItemListNews/ItemListNews';

// icons
import { ArrowLongRight } from '../../../icons/components';

// constants
import { DEFAULT_LIST_EVENT, DEFAULT_LIST_NEWS } from '../DELETE_newsScreens.constants';
import { PATHS_NEWS_SCREENS } from '../../../navigators/useNavigator.constants';

// styles
import colors from '../../../../styles/colors';
import { styles } from './NewsMain.styles';

type NewsMainProps = {
  navigation: NativeStackNavigationProp<RootNewsScreensParamList>;
};

export const NewsMain: FunctionComponent<NewsMainProps> = ({ navigation }) => {
  const onToEventsList = () => {
    navigation.navigate(PATHS_NEWS_SCREENS.eventsList);
  };
  const onToNewsList = () => {
    navigation.navigate(PATHS_NEWS_SCREENS.newsList);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerPart}>
        <Text style={styles.titleType}>Upcoming events:</Text>
        <View style={styles.containerEvents}>
          {DEFAULT_LIST_EVENT.slice(0, 3).map(eventItem => (
            <ItemListEvents key={`event-${eventItem.id}`} item={eventItem} />
          ))}
        </View>
        <TouchableOpacity style={styles.buttonMore} onPress={onToEventsList}>
          <Text style={styles.titleButtonMore}>More events</Text>
          <ArrowLongRight width={40} height={12} fill={colors.blueTufts} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerPart}>
        <Text style={styles.titleType}>Latest news:</Text>
        <View style={styles.containerEvents}>
          {DEFAULT_LIST_NEWS.map(newItem => (
            <ItemListNews key={`new-${newItem.id}`} title={newItem.title} date={newItem.data} />
          ))}
        </View>
        <TouchableOpacity style={styles.buttonMore} onPress={onToNewsList}>
          <Text style={styles.titleButtonMore}>More news</Text>
          <ArrowLongRight width={40} height={12} fill={colors.blueTufts} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
