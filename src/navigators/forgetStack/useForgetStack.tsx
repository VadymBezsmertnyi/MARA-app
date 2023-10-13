import { useContext } from 'react';
import { t } from '@lingui/macro';

// context
import { localesContext } from '../../../localization/localization.provider';

// components
import { ForgetPhone } from '../../screens/forgetScreens/ForgetPhone/ForgetPhone';
import { ForgetCode } from '../../screens/forgetScreens/ForgetCode/ForgetCode';
import { ForgetPassword } from '../../screens/forgetScreens/ForgetPassword/ForgetPassword';

// constants
import { PATHS_FORGET_SCREENS } from '../useNavigator.constants';

export const useForgetStack = () => {
  const { i18n } = useContext(localesContext);

  const forgetScreens = [
    {
      id: PATHS_FORGET_SCREENS.forgetPhone,
      name: PATHS_FORGET_SCREENS.forgetPhone,
      title: t(i18n)`Password`,
      component: ForgetPhone,
    },
    {
      id: PATHS_FORGET_SCREENS.forgetCode,
      name: PATHS_FORGET_SCREENS.forgetCode,
      title: t(i18n)`Password`,
      component: ForgetCode,
    },
    {
      id: PATHS_FORGET_SCREENS.forgetPassword,
      name: PATHS_FORGET_SCREENS.forgetPassword,
      title: t(i18n)`Password`,
      component: ForgetPassword,
    },
  ] as const;
  return { forgetScreens };
};
