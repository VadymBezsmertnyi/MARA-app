import { useContext } from "react";
import { t } from "@lingui/macro";

// context
import { localesContext } from "../../localization/localization.provider";

// constants
import { PATHS_MAIN_SCREENS } from "./useNavigator.constants";

// stacks
import { RegistrationStack } from "./registrationStack/registrationStack";

// screens
import { Welcome } from "../screens/Welcome/Welcome";
import { Splash } from "../screens/Splash/Splash";

// main stack
import { MenuDrawer } from "./MenuDrawer/MenuDrawer";

export const useNavigators = () => {
  const { i18n } = useContext(localesContext);

  const mainScreens = [
    {
      id: PATHS_MAIN_SCREENS.splash,
      name: PATHS_MAIN_SCREENS.splash,
      title: "",
      component: Splash,
      headerShown: false,
      gestureEnabled: false,
    },
    {
      id: "welcome",
      name: PATHS_MAIN_SCREENS.welcome,
      title: t(i18n)`Welcome`,
      component: Welcome,
      headerShown: false,
      gestureEnabled: false,
    },
    {
      id: "registration",
      name: PATHS_MAIN_SCREENS.registration,
      title: t(i18n)`Registration`,
      component: RegistrationStack,
      headerShown: false,
      gestureEnabled: false,
    },
    {
      id: "main",
      name: PATHS_MAIN_SCREENS.main,
      title: t(i18n)`Main`,
      component: MenuDrawer,
      headerShown: false,
      gestureEnabled: false,
    },
  ] as const;

  return { mainScreens };
};
