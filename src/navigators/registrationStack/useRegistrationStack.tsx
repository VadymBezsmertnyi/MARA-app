import { useContext } from "react";
import { t } from "@lingui/macro";

// providers
import { localesContext } from "../../../localization/localization.provider";

// constants
import { PATHS_REGISTRATION_SCREENS } from "../useNavigator.constants";

// registration
import { RegistrationLocation } from "../../screens/registrationScreens/RegistrationLocation/RegistrationLocation";
import { RegistrationTouchId } from "../../screens/registrationScreens/RegistrationTouchId/RegistrationTouchId";
import { RegistrationFaceId } from "../../screens/registrationScreens/RegistrationFaceId/RegistrationFaceId";
import { RegistrationPrivacyPolicy } from "../../screens/registrationScreens/RegistrationPrivacyPolicy/RegistrationPrivacyPolicy";
import { RegistrationTermsOfUse } from "../../screens/registrationScreens/RegistrationTermsOfUse/RegistrationTermsOfUse";

export const useRegistrationStack = () => {
  const { i18n } = useContext(localesContext);

  const registrationScreens = [
    {
      id: PATHS_REGISTRATION_SCREENS.registrationLocation,
      name: PATHS_REGISTRATION_SCREENS.registrationLocation,
      title: null,
      isHeader: false,
      component: RegistrationLocation,
    },
    {
      id: PATHS_REGISTRATION_SCREENS.registrationTouchId,
      name: PATHS_REGISTRATION_SCREENS.registrationTouchId,
      title: null,
      isHeader: true,
      component: RegistrationTouchId,
    },
    {
      id: PATHS_REGISTRATION_SCREENS.registrationFaceId,
      name: PATHS_REGISTRATION_SCREENS.registrationFaceId,
      title: null,
      isHeader: true,
      component: RegistrationFaceId,
    },
    {
      id: PATHS_REGISTRATION_SCREENS.registrationPrivacyPolicy,
      name: PATHS_REGISTRATION_SCREENS.registrationPrivacyPolicy,
      title: t(i18n)`Privacy Policy`,
      isHeader: true,
      component: RegistrationPrivacyPolicy,
    },
    {
      id: PATHS_REGISTRATION_SCREENS.registrationTermsOfUse,
      name: PATHS_REGISTRATION_SCREENS.registrationTermsOfUse,
      title: t(i18n)`Terms of Use`,
      isHeader: true,
      component: RegistrationTermsOfUse,
    },
  ] as const;

  return { registrationScreens };
};
