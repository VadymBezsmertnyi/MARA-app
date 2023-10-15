import { Link, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  RootAllScreensParamList,
  RootForgetScreensParamList,
  RootMainTabsParamList,
  RootRegistrationScreensParamList,
} from './Navigators.types';

export const useAllNavigation = useNavigation<NativeStackNavigationProp<RootAllScreensParamList>>;

export const useForgetNavigation = useNavigation<
  NativeStackNavigationProp<RootForgetScreensParamList>
>;
export const useRegistrationNavigation = useNavigation<
  NativeStackNavigationProp<RootRegistrationScreensParamList>
>;
export const useMainTabsNavigation = useNavigation<
  NativeStackNavigationProp<RootMainTabsParamList>
>;

export const useMainRoute = <T extends keyof RootAllScreensParamList>(_routeName: T) =>
  useRoute<RouteProp<RootAllScreensParamList, T>>();

export const useMainTabsRoute = <T extends keyof RootMainTabsParamList>(_routeName: T) =>
  useRoute<RouteProp<RootMainTabsParamList, T>>();
