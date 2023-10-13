import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  RootAllScreensParamList,
  RootForgetScreensParamList,
  RootRegistrationScreensParamList,
} from './Navigators.types';

export const useAllNavigation = useNavigation<NativeStackNavigationProp<RootAllScreensParamList>>;

export const useForgetNavigation = useNavigation<
  NativeStackNavigationProp<RootForgetScreensParamList>
>;
export const useRegistrationNavigation = useNavigation<
  NativeStackNavigationProp<RootRegistrationScreensParamList>
>;

export const useMainRoute = <T extends keyof RootRegistrationScreensParamList>(_routeName: T) =>
  useRoute<RouteProp<RootRegistrationScreensParamList, T>>();
