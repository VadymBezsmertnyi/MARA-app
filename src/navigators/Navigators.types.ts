import {
  PATHS_FORGET_SCREENS,
  PATHS_MAIN_SCREENS,
  PATHS_REGISTRATION_SCREENS,
} from './useNavigator.constants';

export type MainScreenT = {
  id: string;
  name: string;
  title: string;
  component: () => JSX.Element | null;
};

export type MainScreensT = MainScreenT[];

export type RootMainScreensParamList = {
  [PATHS_MAIN_SCREENS.splash]: undefined;
  [PATHS_MAIN_SCREENS.welcome]: undefined;
  [PATHS_MAIN_SCREENS.authorization]: {
    phoneNumber?: string;
  };
  [PATHS_MAIN_SCREENS.registration]: undefined;
  [PATHS_MAIN_SCREENS.forget]: undefined;
  [PATHS_MAIN_SCREENS.main]: undefined;
  [PATHS_MAIN_SCREENS.mainMap]: undefined;
};

export type RootForgetScreensParamList = {
  [PATHS_FORGET_SCREENS.forgetPhone]: undefined;
  [PATHS_FORGET_SCREENS.forgetCode]: {
    phoneNumber: string;
  };
  [PATHS_FORGET_SCREENS.forgetPassword]: undefined;
};

export type RootRegistrationScreensParamList = {
  [PATHS_REGISTRATION_SCREENS.registrationPhone]: undefined;
  [PATHS_REGISTRATION_SCREENS.registrationCode]: {
    phoneNumber: string;
  };
  [PATHS_REGISTRATION_SCREENS.registrationPassword]: undefined;
  [PATHS_REGISTRATION_SCREENS.registrationTouchId]: undefined;
  [PATHS_REGISTRATION_SCREENS.registrationFaceId]: undefined;
  [PATHS_REGISTRATION_SCREENS.registrationPrivacyPolicy]: undefined;
  [PATHS_REGISTRATION_SCREENS.registrationTermsOfUse]: undefined;
};

export type RootAllScreensParamList = RootMainScreensParamList &
  RootForgetScreensParamList &
  RootRegistrationScreensParamList;
