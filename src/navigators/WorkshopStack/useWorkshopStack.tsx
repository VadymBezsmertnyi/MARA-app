import { useContext } from "react";
import { t } from "@lingui/macro";

// providers
import { localesContext } from "../../../localization/localization.provider";

// constants
import { PATHS_WORKSHOP_SCREENS } from "../useNavigator.constants";

// News and events
import { WorkshopMain } from "../../screens/workshopsScreens/WorkshopsMain/WorkshopMain";
import { WorkshopsItem } from "../../screens/workshopsScreens/WorkshopsItem/WorkshopsItem";

export const useWorkshopStack = () => {
  const { i18n } = useContext(localesContext);

  const workshopsScreens = [
    {
      id: PATHS_WORKSHOP_SCREENS.workshopMain,
      name: PATHS_WORKSHOP_SCREENS.workshopMain,
      title: t(i18n)`Workshops`,
      headerShown: false,
      component: WorkshopMain,
    },
    {
      id: PATHS_WORKSHOP_SCREENS.workshopItem,
      name: PATHS_WORKSHOP_SCREENS.workshopItem,
      title: t(i18n)`Workshop`,
      headerShown: false,
      component: WorkshopsItem,
    },
  ] as const;

  return { workshopsScreens };
};
