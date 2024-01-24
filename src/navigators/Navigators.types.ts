import {
  PATHS_FORGET_SCREENS,
  PATHS_MAIN_SCREENS,
  PATHS_MAIN_TABS,
  PATHS_NEWS_SCREENS,
  PATHS_REGISTRATION_SCREENS,
  PATHS_SETTINGS_SCREENS,
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
  [PATHS_MAIN_SCREENS.splash]?: Record<string, string | number>;
  [PATHS_MAIN_SCREENS.welcome]?: Record<string, string | number>;
  [PATHS_MAIN_SCREENS.registration]?: Record<string, string | number> & {
    screen: keyof RootRegistrationScreensParamList;
  };
  [PATHS_MAIN_SCREENS.forget]?: Record<string, string | number>;
  [PATHS_MAIN_SCREENS.main]?: Record<string, string | number>;
  [PATHS_MAIN_SCREENS.mainMap]?: Record<string, string | number>;
};

export type RootMainTabsParamList = {
  [PATHS_MAIN_TABS.workshops]?: Record<string, string | number>;
  [PATHS_MAIN_TABS.map]?: Record<string, string | number>;
  [PATHS_MAIN_TABS.news]?: Record<string, string | number>;
  [PATHS_MAIN_TABS.market]?: Record<string, string | number>;
  [PATHS_MAIN_TABS.settings]?: Record<string, string | number>;
};

export type RootForgetScreensParamList = {
  [PATHS_FORGET_SCREENS.forgetPhone]?: Record<string, string | number>;
  [PATHS_FORGET_SCREENS.forgetCode]?: Record<string, string | number>;
  [PATHS_FORGET_SCREENS.forgetPassword]?: Record<string, string | number>;
};

export type RootRegistrationScreensParamList = {
  [PATHS_REGISTRATION_SCREENS.registrationLocation]?: Record<
    string,
    string | number
  >;
  [PATHS_REGISTRATION_SCREENS.registrationTouchId]?: Record<
    string,
    string | number
  >;
  [PATHS_REGISTRATION_SCREENS.registrationFaceId]?: Record<
    string,
    string | number
  >;
  [PATHS_REGISTRATION_SCREENS.registrationPrivacyPolicy]?: Record<
    string,
    string | number
  >;
  [PATHS_REGISTRATION_SCREENS.registrationTermsOfUse]?: Record<
    string,
    string | number
  >;
  [PATHS_REGISTRATION_SCREENS.registrationInfo]?: Record<
    string,
    string | number
  >;
};

export type RootNewsScreensParamList = {
  [PATHS_NEWS_SCREENS.newsMain]?: Record<string, string | number>;
  [PATHS_NEWS_SCREENS.newItem]?: Record<string, string | number> & {
    newId?: number;
  };
  [PATHS_NEWS_SCREENS.newsList]?: Record<string, string | number>;
  [PATHS_NEWS_SCREENS.eventItem]?: Record<string, string | number> & {
    eventId?: number;
  };
  [PATHS_NEWS_SCREENS.eventsList]?: Record<string, string | number>;
  [PATHS_NEWS_SCREENS.addEvent]?: Record<string, string | number> & {
    from: string;
    screenFrom?: string;
  };
  [PATHS_NEWS_SCREENS.locationEventInput]?: Record<string, string | number>;
  [PATHS_NEWS_SCREENS.locationEventMap]?: Record<string, string | number>;
};

export type RootSettingsScreensParamList = {
  [PATHS_SETTINGS_SCREENS.settingsMain]?: Record<string, string | number>;
  [PATHS_SETTINGS_SCREENS.settingsAds]?: Record<string, string | number>;
  [PATHS_SETTINGS_SCREENS.settingsWorkshops]?: Record<string, string | number>;
  [PATHS_SETTINGS_SCREENS.settingsEvents]?: Record<string, string | number>;
  [PATHS_SETTINGS_SCREENS.settingsAddEvent]?: Record<string, string | number>;
  [PATHS_SETTINGS_SCREENS.settingsChangeEvent]?: Record<
    string,
    string | number
  > & {
    eventId: number;
  };
  [PATHS_SETTINGS_SCREENS.settingsProfile]?: Record<string, string | number>;
};

export type RootWorkshopsScreensParamList = {
  [PATHS_WORKSHOP_SCREENS.workshopMain]?: Record<string, string | number>;
  [PATHS_WORKSHOP_SCREENS.workshopItem]?: Record<string, string | number> & {
    workshopId?: number;
  };
};

export type RootAllScreensParamList = RootMainScreensParamList &
  RootForgetScreensParamList &
  RootRegistrationScreensParamList &
  RootWorkshopsScreensParamList &
  RootSettingsScreensParamList &
  RootNewsScreensParamList &
  RootMainTabsParamList;
