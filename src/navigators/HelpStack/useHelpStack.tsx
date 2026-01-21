// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// constants
import { PATHS_HELP_SCREENS } from "../useNavigator.constants";

// screens
import { HelpMain } from "../../screens/helpScreens/HelpMain/HelpMain";

export const useHelpStack = () => {
  const { i18n } = useLocalesProvider();

  const helpScreens = [
    {
      id: PATHS_HELP_SCREENS.helpMain,
      name: PATHS_HELP_SCREENS.helpMain,
      title: i18n._("Help"),
      headerShown: false,
      component: HelpMain,
    },
  ] as const;

  return { helpScreens };
};
