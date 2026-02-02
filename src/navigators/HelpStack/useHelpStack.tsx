// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// constants
import { PATHS_HELP_SCREENS } from "../useNavigator.constants";

// screens
import { HelpMain } from "../../screens/helpScreens/HelpMain/HelpMain";
import { AddTelegramChannel } from "../../screens/helpScreens/AddTelegramChannel/AddTelegramChannel";

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
    {
      id: PATHS_HELP_SCREENS.addTelegramChannel,
      name: PATHS_HELP_SCREENS.addTelegramChannel,
      title: i18n._("Add Telegram Channel"),
      headerShown: false,
      component: AddTelegramChannel,
    },
  ] as const;

  return { helpScreens };
};
