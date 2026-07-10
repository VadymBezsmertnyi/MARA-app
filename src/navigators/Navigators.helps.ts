import {
  CommonActions,
  NavigationState,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationOptions } from "@react-navigation/drawer";

// types
import {
  RootAllScreensParamList,
  RootMainTabsParamList,
  RootRegistrationScreensParamList,
} from "./Navigators.types";
import { PATHS_MAIN_SCREENS, PATHS_MAIN_TABS } from "./useNavigator.constants";

export const useAllNavigation = useNavigation<
  NativeStackNavigationProp<RootAllScreensParamList>
>;
export const useRegistrationNavigation = useNavigation<
  NativeStackNavigationProp<RootRegistrationScreensParamList>
>;
export const useMainTabsNavigation = useNavigation<
  NativeStackNavigationProp<RootMainTabsParamList> & DrawerNavigationOptions
>;

export const useMainRoute = <T extends keyof RootAllScreensParamList>(
  _routeName: T
) => useRoute<RouteProp<RootAllScreensParamList, T>>();

export const useMainTabsRoute = <T extends keyof RootMainTabsParamList>(
  _routeName: T
) => useRoute<RouteProp<RootMainTabsParamList, T>>();

export function getActiveRouteName(
  navigationState: NavigationState | undefined
) {
  if (!navigationState) return null;

  const route = (navigationState.routes[navigationState.index].state ||
    navigationState.routes[navigationState.index]) as NavigationState & {
    name: string;
  };
  if (route.routes) return getActiveRouteName(route);

  return route.name;
}

export const resetNavigationToMap = (
  navigation: NativeStackNavigationProp<any>
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: PATHS_MAIN_SCREENS.main,
          state: {
            index: 1,
            routes: [{ name: PATHS_MAIN_TABS.map }],
          },
        },
      ],
    })
  );
};
