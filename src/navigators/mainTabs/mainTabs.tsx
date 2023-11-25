import React, { FunctionComponent, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// helps
import { useMainTabs } from './useMainTabs';

// constants
import { PATHS_MAIN_TABS } from '../useNavigator.constants';
import { PATHS_NEWS_SCREENS_HIDE_MAIN_HEADER } from '../NewsStack/newsStack.constants';

// types
import { RootMainTabsParamList } from '../Navigators.types';

// hooks
import colors from '../../../styles/colors';
import { styles } from './mainTabs.styles';

const Tab = createBottomTabNavigator<RootMainTabsParamList>();

export const MainTabs: FunctionComponent = () => {
  const { mainTabs } = useMainTabs();

  const colorsGradient = useMemo(() => [colors.californiaOrange, colors.blazeOrange], []);
  const startGradient = useMemo(() => ({ x: 0.9, y: 0.5 }), []);
  const endGradient = useMemo(() => ({ x: 0.1, y: 0.5 }), []);
  const locationsGradient = useMemo(() => [0, 1], []);

  const tabBar = ({ state: { index }, navigation }: BottomTabBarProps) => (
    <View style={styles.mainContainer}>
      <View style={styles.absoluteContainer}>
        <LinearGradient
          colors={colorsGradient}
          start={startGradient}
          end={endGradient}
          locations={locationsGradient}
          style={styles.container}
        >
          {mainTabs.map((screen, indexScreen) => {
            const isActive = indexScreen === index;
            const Icon = isActive
              ? mainTabs[indexScreen].tabBarIconSelect
              : mainTabs[indexScreen].tabBarIcon;
            return (
              <View key={`tab-button-${screen.id}`}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(screen.name);
                  }}
                >
                  <Icon width={32} height={32} />
                </TouchableOpacity>
              </View>
            );
          })}
        </LinearGradient>
      </View>
    </View>
  );

  const headerLeft = () => (
    <TouchableOpacity>
      <View style={styles.menu}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </View>
    </TouchableOpacity>
  );

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
    }),
    [],
  );

  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBar={tabBar}
      initialRouteName={PATHS_MAIN_TABS.map}
    >
      {mainTabs.map(screen => (
        <Tab.Screen
          key={`tab-screen-${screen.id}`}
          name={screen.name}
          component={screen.component}
          options={({ route }) => {
            const routeName = getFocusedRouteNameFromRoute(route);
            const isHideHeader = routeName
              ? PATHS_NEWS_SCREENS_HIDE_MAIN_HEADER.includes(routeName)
              : false;
            return {
              headerShown: screen.headerShown && !isHideHeader,
              headerTitle: screen.title,
              headerTitleAlign: 'center',
              headerLeft,
              headerLeftContainerStyle: styles.headerLeftContainerStyle,
              headerRightContainerStyle: { paddingRight: 16 },
              headerShadowVisible: false,
            };
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
