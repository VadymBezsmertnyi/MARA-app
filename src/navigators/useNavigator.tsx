import { useContext } from 'react';
import { t } from '@lingui/macro';

// context
import { localesContext } from '../../localization/localization.provider';

// constants
import { PATHS_MAIN_SCREENS } from './useNavigator.constants';

// stacks
import { RegistrationStack } from './registrationStack/registrationStack';

// screens
import { Welcome } from '../screens/Welcome/Welcome';
import { Splash } from '../screens/Splash/Splash';

// authorization
import { Authorization } from '../screens/Authorization/Authorization';

// registration
import { ForgetStack } from './forgetStack/forgetStack';
import { MainTabs } from './mainTabs/mainTabs';

export const useNavigators = () => {
  const { i18n } = useContext(localesContext);

  const mainScreens = [
    {
      id: PATHS_MAIN_SCREENS.splash,
      name: PATHS_MAIN_SCREENS.splash,
      title: null,
      component: Splash,
      headerShown: false,
    },
    {
      id: 'welcome',
      name: PATHS_MAIN_SCREENS.welcome,
      title: t(i18n)`Welcome`,
      component: Welcome,
      headerShown: false,
    },
    {
      id: 'authorization',
      name: PATHS_MAIN_SCREENS.authorization,
      title: t(i18n)`Authorization`,
      component: Authorization,
      headerShown: true,
    },
    {
      id: 'registration',
      name: PATHS_MAIN_SCREENS.registration,
      title: t(i18n)`Registration`,
      component: RegistrationStack,
      headerShown: false,
    },
    {
      id: 'forget',
      name: PATHS_MAIN_SCREENS.forget,
      title: t(i18n)`Password`,
      component: ForgetStack,
      headerShown: false,
    },
    {
      id: 'main',
      name: PATHS_MAIN_SCREENS.main,
      title: t(i18n)`Main`,
      component: MainTabs,
      headerShown: false,
    },
  ] as const;

  return { mainScreens };
};
