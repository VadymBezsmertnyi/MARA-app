import { t } from "@lingui/macro";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// constants
import { PATHS_WORKSHOP_SCREENS } from "../useNavigator.constants";

// screens
import { WorkshopMain } from "../../screens/workshopsScreens/WorkshopsMain/WorkshopMain";
import { WorkshopsItem } from "../../screens/workshopsScreens/WorkshopsItem/WorkshopsItem";
import { WorkshopAdd } from "../../screens/workshopsScreens/WorkshopAdd/WorkshopAdd";

export const useWorkshopStack = () => {
  const { i18n } = useLocalesProvider();

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
    {
      id: PATHS_WORKSHOP_SCREENS.workshopAdd,
      name: PATHS_WORKSHOP_SCREENS.workshopAdd,
      title: t(i18n)`Add workshop`,
      headerShown: false,
      component: WorkshopAdd,
    },
  ] as const;

  return { workshopsScreens };
};
