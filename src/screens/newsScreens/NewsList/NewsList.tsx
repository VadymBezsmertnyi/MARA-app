import React, { FunctionComponent, useState } from 'react';
import { Text, View } from 'react-native';
import { Trans } from '@lingui/macro';

// constants
import { DEFAULT_LIST_NEWS } from '../DELETE_newsScreens.constants';

// components
import { InputSearch } from '../../../components/InputSearch/InputSearch';
import { ItemListNews } from '../NewsMain/components/ItemListNews/ItemListNews';

// styles
import { styles } from './NewsList.styles';

export const NewsList: FunctionComponent = () => {
  const [valueSearch, setValueSearch] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Trans>Upcoming events:</Trans>
      </Text>
      <InputSearch value={valueSearch} onChangeText={setValueSearch} />
      <View style={styles.containerList}>
        {DEFAULT_LIST_NEWS.map(newItem => (
          <ItemListNews key={`new-${newItem.id}`} title={newItem.title} date={newItem.data} />
        ))}
      </View>
    </View>
  );
};
