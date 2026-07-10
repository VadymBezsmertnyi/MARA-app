// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// constants
import { PATHS_REGISTRATION_SCREENS } from "../useNavigator.constants";

// registration
import { RegistrationLocation } from "../../screens/registrationScreens/RegistrationLocation/RegistrationLocation";
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
      id: PATHS_REGISTRATION_SCREENS.registrationPrivacyPolicy,
      name: PATHS_REGISTRATION_SCREENS.registrationPrivacyPolicy,
      title: i18n._("Privacy Policy"),
      isHeader: true,
      isBackHeader: false,
      component: RegistrationPrivacyPolicy,
    },
    {
      id: PATHS_REGISTRATION_SCREENS.registrationTermsOfUse,
      name: PATHS_REGISTRATION_SCREENS.registrationTermsOfUse,
      title: i18n._("Terms of Use"),
      isHeader: true,
      isBackHeader: false,
      component: RegistrationTermsOfUse,
    },
    {
      id: PATHS_REGISTRATION_SCREENS.registrationInfo,
      name: PATHS_REGISTRATION_SCREENS.registrationInfo,
      title: i18n._("Registration"),
      isHeader: true,
      isBackHeader: false,
      component: RegistrationInfo,
    },
  ] as const;

  return { registrationScreens };
};
