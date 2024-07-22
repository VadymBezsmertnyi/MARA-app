import { t } from "@lingui/macro";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// constants
import { PATHS_MARKET_SCREENS } from "../useNavigator.constants";

// screens
import { MarketMain } from "../../screens/marketScreens/MarketMain/MarketMain";
import { MarketItem } from "../../screens/marketScreens/MarketItem/MarketItem";
import { MarketAdd } from "../../screens/marketScreens/MarketAdd/MarketAdd";

export const useMarketStack = () => {
  const { i18n } = useLocalesProvider();

  const marketScreens = [
    {
      id: PATHS_MARKET_SCREENS.marketMain,
      name: PATHS_MARKET_SCREENS.marketMain,
      title: t(i18n)`Market`,
      headerShown: false,
      component: MarketMain,
    },
    {
      id: PATHS_MARKET_SCREENS.marketItem,
      name: PATHS_MARKET_SCREENS.marketItem,
      title: t(i18n)`Market`,
      headerShown: false,
      component: MarketItem,
    },
    {
      id: PATHS_MARKET_SCREENS.marketAdd,
      name: PATHS_MARKET_SCREENS.marketAdd,
      title: t(i18n)`Add advert`,
      headerShown: false,
      component: MarketAdd,
    },
  ] as const;

  return { marketScreens };
};
