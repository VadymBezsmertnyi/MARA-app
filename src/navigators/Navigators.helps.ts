import {
  NavigationState,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";

// types
import {
  RootAllScreensParamList,
  RootMainTabsParamList,
  RootRegistrationScreensParamList,
} from "./Navigators.types";

export const useAllNavigation = useNavigation<
  NativeStackNavigationProp<RootAllScreensParamList>
>;
export const useRegistrationNavigation = useNavigation<
  NativeStackNavigationProp<RootRegistrationScreensParamList>
>;
export const useMainTabsNavigation = useNavigation<
  NativeStackNavigationProp<RootMainTabsParamList> & DrawerNavigationHelpers
>;

export const useMainRoute = <T extends keyof RootAllScreensParamList>(
  _routeName: T
) => useRoute<RouteProp<RootAllScreensParamList, T>>();

export const useMainTabsRoute = <T extends keyof RootMainTabsParamList>(
  _routeName: T
) => useRoute<RouteProp<RootMainTabsParamList, T>>();

export function getActiveRouteName(navigationState: NavigationState) {
  if (!navigationState) {
    return null;
  }

  const route = (navigationState.routes[navigationState.index].state ||
    navigationState.routes[navigationState.index]) as NavigationState & {
    name: string;
  };

  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.name;
}
