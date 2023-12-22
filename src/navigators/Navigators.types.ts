import {
  PATHS_FORGET_SCREENS,
  PATHS_MAIN_SCREENS,
  PATHS_MAIN_TABS,
  PATHS_NEWS_SCREENS,
  PATHS_REGISTRATION_SCREENS,
  PATHS_WORKSHOP_SCREENS,
} from "./useNavigator.constants";

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
  [PATHS_MAIN_SCREENS.forget]: {
    phoneNumber?: string;
  };
  [PATHS_MAIN_SCREENS.main]: undefined;
  [PATHS_MAIN_SCREENS.mainMap]: undefined;
};

export type RootMainTabsParamList = {
  [PATHS_MAIN_TABS.workshops]: undefined;
  [PATHS_MAIN_TABS.map]: undefined;
  [PATHS_MAIN_TABS.news]: undefined;
  [PATHS_MAIN_TABS.market]: undefined;
  [PATHS_MAIN_TABS.settings]: undefined;
};

export type RootForgetScreensParamList = {
  [PATHS_FORGET_SCREENS.forgetPhone]: {
    phoneNumber?: string;
  };
  [PATHS_FORGET_SCREENS.forgetCode]: {
    phoneNumber: string;
  };
  [PATHS_FORGET_SCREENS.forgetPassword]: undefined;
};

export type RootRegistrationScreensParamList = {
  [PATHS_REGISTRATION_SCREENS.registrationPhone]: undefined;
  [PATHS_REGISTRATION_SCREENS.registrationPassword]: undefined;
  [PATHS_REGISTRATION_SCREENS.registrationTouchId]: undefined;
  [PATHS_REGISTRATION_SCREENS.registrationFaceId]: undefined;
  [PATHS_REGISTRATION_SCREENS.registrationPrivacyPolicy]: undefined;
  [PATHS_REGISTRATION_SCREENS.registrationTermsOfUse]: undefined;
};

export type RootNewsScreensParamList = {
  [PATHS_NEWS_SCREENS.newsMain]: undefined;
  [PATHS_NEWS_SCREENS.newItem]:
    | {
        newId?: number;
      }
    | undefined;
  [PATHS_NEWS_SCREENS.newsList]: undefined;
  [PATHS_NEWS_SCREENS.eventItem]:
    | {
        eventId?: number;
      }
    | undefined;
  [PATHS_NEWS_SCREENS.eventsList]: undefined;
  [PATHS_NEWS_SCREENS.addEvent]: undefined;
  [PATHS_NEWS_SCREENS.locationEventInput]: undefined;
  [PATHS_NEWS_SCREENS.locationEventMap]: undefined;
};

export type RootWorkshopsScreensParamList = {
  [PATHS_WORKSHOP_SCREENS.workshopMain]: undefined;
  [PATHS_WORKSHOP_SCREENS.workshopItem]:
    | {
        workshopId?: number;
      }
    | undefined;
};

export type RootAllScreensParamList = RootMainScreensParamList &
  RootForgetScreensParamList &
  RootRegistrationScreensParamList &
  RootWorkshopsScreensParamList;
