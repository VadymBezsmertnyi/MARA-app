import appsFlyer from "react-native-appsflyer";
import * as Linking from "expo-linking";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootAllScreensParamList } from "../navigators/Navigators.types";
import { CommonActions } from "@react-navigation/native";
import { TUserData } from "../storeRedux/apis/user/user.types";
import {
  PATHS_MAIN_SCREENS,
  PATHS_MAIN_TABS,
  PATHS_REGISTRATION_SCREENS,
  PATHS_WORKSHOP_SCREENS,
} from "../navigators/useNavigator.constants";

export const redirectToScreen = (
  navigation: NativeStackNavigationProp<RootAllScreensParamList>,
  user: TUserData
) => {
  if (user?.isNewUser && user.place_id === null)
    navigation.navigate(PATHS_MAIN_SCREENS.registration, {
      screen: PATHS_REGISTRATION_SCREENS.registrationLocation,
    });
  else if (user?.isNewUser)
    navigation.navigate(PATHS_MAIN_SCREENS.registration, {
      screen: PATHS_REGISTRATION_SCREENS.registrationInfo,
    });
  else {
    navigation.navigate(PATHS_MAIN_SCREENS.main);
    redirectToWorkshopFromLink(navigation);
  }
};

const navigateToWorkshop = (
  navigation: NativeStackNavigationProp<RootAllScreensParamList>,
  workshopId: string
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: PATHS_MAIN_SCREENS.main,
          state: {
            routes: [
              {
                name: PATHS_MAIN_TABS.workshops,
                state: {
                  index: 0,
                  routes: [
                    {
                      name: PATHS_WORKSHOP_SCREENS.workshopItem,
                      params: { workshopId },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    })
  );
};

const getWorkshopIdFromUrl = (url: string): string | null => {
  const parsed = Linking.parse(url);
  const workshopId = parsed.queryParams?.workshopId;
  if (typeof workshopId === "string" && workshopId.length) return workshopId;

  if (parsed.path?.startsWith("share/")) {
    const [, shortLink] = parsed.path.split("/");
    if (shortLink) return shortLink;
  }

  return null;
};

export const redirectToWorkshopFromLink = (
  navigation: NativeStackNavigationProp<RootAllScreensParamList>
) => {
  const onDeepLinkCanceller = appsFlyer.onDeepLink((res: any) => {
    const workshopId = res?.data?.workshopId;
    if (typeof workshopId === "string" && workshopId.length) {
      navigateToWorkshop(navigation, workshopId);
    }
  });

  Linking.getInitialURL().then((initialUrl) => {
    if (!initialUrl) return;
    const workshopId = getWorkshopIdFromUrl(initialUrl);
    if (workshopId) navigateToWorkshop(navigation, workshopId);
  });

  return () => {
    onDeepLinkCanceller();
  };
};
