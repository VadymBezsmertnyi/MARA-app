import React, { FunctionComponent, useContext, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Trans } from '@lingui/macro';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// constants
import { DEFAULT_LIST_NEWS } from '../DELETE_newsScreens.constants';

// components
import { Input } from '../../../components/Input/Input';
import { ItemListNews } from '../NewsMain/components/ItemListNews/ItemListNews';

import { localesContext } from '../../../../localization/localization.provider';
import { RootNewsScreensParamList } from '../../../navigators/Navigators.types';

// styles
import { styles } from './NewsList.styles';

type NewsListProps = {
  navigation: NativeStackNavigationProp<RootNewsScreensParamList>;
};

export const NewsList: FunctionComponent<NewsListProps> = ({ navigation }) => {
  const { i18n } = useContext(localesContext);
  const [valueSearch, setValueSearch] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Trans>Upcoming events:</Trans>
      </Text>
      <Input
        value={valueSearch}
        onChange={setValueSearch}
        placeholder={i18n._('Enter the text to search')}
      />
      <ScrollView contentContainerStyle={styles.containerList}>
        {DEFAULT_LIST_NEWS.map(newItem => (
          <ItemListNews
            key={`new-${newItem.id}`}
            title={newItem.title}
            date={newItem.data}
            newId={newItem.id}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
};
