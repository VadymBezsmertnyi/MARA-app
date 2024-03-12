import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootAllScreensParamList } from "../navigators/Navigators.types";
import { UserDataT } from "../providers/UserProvider/UserProvider.types";
import {
  PATHS_MAIN_SCREENS,
  PATHS_REGISTRATION_SCREENS,
} from "../navigators/useNavigator.constants";

export const redirectToScreen = (
  navigation: NativeStackNavigationProp<RootAllScreensParamList>,
  user: UserDataT,
  isFaceId: boolean,
  isTouchId: boolean
) => {
  if (user?.isCheckBiometric === null && (isFaceId || isTouchId)) {
    if (isTouchId)
      navigation.navigate(PATHS_MAIN_SCREENS.registration, {
        screen: PATHS_REGISTRATION_SCREENS.registrationTouchId,
      });
    else if (isFaceId)
      navigation.navigate(PATHS_MAIN_SCREENS.registration, {
        screen: PATHS_REGISTRATION_SCREENS.registrationFaceId,
      });
    else if (user.isNewUser && user.place_id === null)
      navigation.navigate(PATHS_MAIN_SCREENS.registration, {
        screen: PATHS_REGISTRATION_SCREENS.registrationLocation,
      });
    else if (user.isNewUser)
      navigation.navigate(PATHS_MAIN_SCREENS.registration, {
        screen: PATHS_REGISTRATION_SCREENS.registrationInfo,
      });
    else navigation.navigate(PATHS_MAIN_SCREENS.main);
  } else if (user?.isNewUser && user.place_id === null)
    navigation.navigate(PATHS_MAIN_SCREENS.registration, {
      screen: PATHS_REGISTRATION_SCREENS.registrationLocation,
    });
  else if (user?.isNewUser)
    navigation.navigate(PATHS_MAIN_SCREENS.registration, {
      screen: PATHS_REGISTRATION_SCREENS.registrationInfo,
    });
  else navigation.navigate(PATHS_MAIN_SCREENS.main);
};
