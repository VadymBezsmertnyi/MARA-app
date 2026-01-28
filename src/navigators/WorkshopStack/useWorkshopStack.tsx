// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// constants
import { PATHS_WORKSHOP_SCREENS } from "../useNavigator.constants";

// screens
import { WorkshopMain } from "../../screens/workshopsScreens/WorkshopsMain/WorkshopMain";
import { WorkshopDetailsScreen } from "../../screens/workshopsScreens/WorkshopsItem/WorkshopsItem";
import { WorkshopAdd } from "../../screens/workshopsScreens/WorkshopAdd/WorkshopAdd";

export const useWorkshopStack = () => {
  const { i18n } = useLocalesProvider();

  const workshopsScreens = [
    {
      id: PATHS_WORKSHOP_SCREENS.workshopMain,
      name: PATHS_WORKSHOP_SCREENS.workshopMain,
      title: i18n._("Workshops"),
      headerShown: false,
      component: WorkshopMain,
    },
    {
      id: PATHS_WORKSHOP_SCREENS.workshopItem,
      name: PATHS_WORKSHOP_SCREENS.workshopItem,
      title: i18n._("Workshop"),
      headerShown: false,
      component: WorkshopDetailsScreen,
    },
    {
      id: PATHS_WORKSHOP_SCREENS.workshopAdd,
      name: PATHS_WORKSHOP_SCREENS.workshopAdd,
      title: i18n._("Add workshop"),
      headerShown: false,
      component: WorkshopAdd,
    },
  ] as const;

  return { workshopsScreens };
};
