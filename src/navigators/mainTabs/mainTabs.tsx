import React, { FunctionComponent } from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// types
import { RootMainTabsParamList } from '../Navigators.types';

// hooks
import { useMainTabs } from './useMainTabs';
import { TouchableOpacity, View } from 'react-native';
import { PATHS_MAIN_TABS } from '../useNavigator.constants';

const Tab = createBottomTabNavigator<RootMainTabsParamList>();

export const MainTabs: FunctionComponent = () => {
  const { mainTabs } = useMainTabs();

  const tabBar = ({ state: { _index }, navigation }: BottomTabBarProps) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'blue',
      }}
    >
      {mainTabs.map((screen, indexScreen) => {
        const Icon = mainTabs[indexScreen].tabBarIcon;
        return (
          <View key={`tab-button-${screen.id}`} style={{}}>
            <TouchableOpacity onPress={() => navigation.navigate(screen.name)}>
              <Icon width={24} height={24} />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={tabBar}
      initialRouteName={PATHS_MAIN_TABS.map}
    >
      {mainTabs.map(screen => (
        <Tab.Screen
          key={`tab-screen-${screen.id}`}
          name={screen.name}
          component={screen.component}
          options={{
            tabBarIcon: screen.tabBarIcon,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
