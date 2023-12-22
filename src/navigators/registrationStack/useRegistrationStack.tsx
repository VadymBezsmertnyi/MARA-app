import { useContext } from "react";
import { t } from "@lingui/macro";

// providers
import { localesContext } from "../../../localization/localization.provider";

// constants
import { PATHS_REGISTRATION_SCREENS } from "../useNavigator.constants";

// registration
import { RegistrationPhone } from "../../screens/registrationScreens/RegistrationPhone/RegistrationPhone";
import { RegistrationPassword } from "../../screens/registrationScreens/RegistrationPassword/RegistrationPassword";
import { RegistrationTouchId } from "../../screens/registrationScreens/RegistrationTouchId/RegistrationTouchId";
import { RegistrationFaceId } from "../../screens/registrationScreens/RegistrationFaceId/RegistrationFaceId";
import { RegistrationPrivacyPolicy } from "../../screens/registrationScreens/RegistrationPrivacyPolicy/RegistrationPrivacyPolicy";
import { RegistrationTermsOfUse } from "../../screens/registrationScreens/RegistrationTermsOfUse/RegistrationTermsOfUse";

export const useRegistrationStack = () => {
  const { i18n } = useContext(localesContext);

  const registrationScreens = [
    {
      id: PATHS_REGISTRATION_SCREENS.registrationPhone,
      name: PATHS_REGISTRATION_SCREENS.registrationPhone,
      title: t(i18n)`Registration`,
      component: RegistrationPhone,
    },
    {
      id: PATHS_REGISTRATION_SCREENS.registrationPassword,
      name: PATHS_REGISTRATION_SCREENS.registrationPassword,
      title: t(i18n)`Registration`,
      component: RegistrationPassword,
    },
    {
      id: PATHS_REGISTRATION_SCREENS.registrationTouchId,
      name: PATHS_REGISTRATION_SCREENS.registrationTouchId,
      title: null,
      component: RegistrationTouchId,
    },
    {
      id: PATHS_REGISTRATION_SCREENS.registrationFaceId,
      name: PATHS_REGISTRATION_SCREENS.registrationFaceId,
      title: null,
      component: RegistrationFaceId,
    },
    {
      id: PATHS_REGISTRATION_SCREENS.registrationPrivacyPolicy,
      name: PATHS_REGISTRATION_SCREENS.registrationPrivacyPolicy,
      title: t(i18n)`Privacy Policy`,
      component: RegistrationPrivacyPolicy,
    },
    {
      id: PATHS_REGISTRATION_SCREENS.registrationTermsOfUse,
      name: PATHS_REGISTRATION_SCREENS.registrationTermsOfUse,
      title: t(i18n)`Terms of Use`,
      component: RegistrationTermsOfUse,
    },
  ] as const;

  return { registrationScreens };
};
