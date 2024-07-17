import { t } from "@lingui/macro";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// constants
import { PATHS_REGISTRATION_SCREENS } from "../useNavigator.constants";

// registration
import { RegistrationLocation } from "../../screens/registrationScreens/RegistrationLocation/RegistrationLocation";
import { RegistrationTouchId } from "../../screens/registrationScreens/RegistrationTouchId/RegistrationTouchId";
import { RegistrationFaceId } from "../../screens/registrationScreens/RegistrationFaceId/RegistrationFaceId";
import { RegistrationPrivacyPolicy } from "../../screens/registrationScreens/RegistrationPrivacyPolicy/RegistrationPrivacyPolicy";
import { RegistrationTermsOfUse } from "../../screens/registrationScreens/RegistrationTermsOfUse/RegistrationTermsOfUse";
import { RegistrationInfo } from "../../screens/registrationScreens/RegistrationInfo/RegistrationInfo";

export const useRegistrationStack = () => {
  const { i18n } = useLocalesProvider();

  const registrationScreens = [
    {
      id: PATHS_REGISTRATION_SCREENS.registrationLocation,
      name: PATHS_REGISTRATION_SCREENS.registrationLocation,
      title: null,
      isHeader: false,
      isBackHeader: false,
      component: RegistrationLocation,
    },
    {
      id: PATHS_REGISTRATION_SCREENS.registrationTouchId,
      name: PATHS_REGISTRATION_SCREENS.registrationTouchId,
      title: null,
      isHeader: true,
      isBackHeader: false,
      component: RegistrationTouchId,
    },
    {
      id: PATHS_REGISTRATION_SCREENS.registrationFaceId,
      name: PATHS_REGISTRATION_SCREENS.registrationFaceId,
      title: null,
      isHeader: true,
      isBackHeader: false,
      component: RegistrationFaceId,
    },
    {
      id: PATHS_REGISTRATION_SCREENS.registrationPrivacyPolicy,
      name: PATHS_REGISTRATION_SCREENS.registrationPrivacyPolicy,
      title: t(i18n)`Privacy Policy`,
      isHeader: true,
      isBackHeader: false,
      component: RegistrationPrivacyPolicy,
    },
    {
      id: PATHS_REGISTRATION_SCREENS.registrationTermsOfUse,
      name: PATHS_REGISTRATION_SCREENS.registrationTermsOfUse,
      title: t(i18n)`Terms of Use`,
      isHeader: true,
      isBackHeader: false,
      component: RegistrationTermsOfUse,
    },
    {
      id: PATHS_REGISTRATION_SCREENS.registrationInfo,
      name: PATHS_REGISTRATION_SCREENS.registrationInfo,
      title: t(i18n)`Registration`,
      isHeader: true,
      isBackHeader: false,
      component: RegistrationInfo,
    },
  ] as const;

  return { registrationScreens };
};
