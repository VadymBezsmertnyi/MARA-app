import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

export const MainTabs: FunctionComponent = () => {
  console.log('MainTabs');
  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <Text>MainTabs</Text>
      <Text>MainTabs</Text>
      <Text>MainTabs</Text>
    </View>
  );
};
