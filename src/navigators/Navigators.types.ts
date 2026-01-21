import {
  PATHS_MAIN_SCREENS,
  PATHS_MAIN_TABS,
  PATHS_EVENTS_SCREENS,
  PATHS_REGISTRATION_SCREENS,
  PATHS_SETTINGS_SCREENS,
  PATHS_WORKSHOP_SCREENS,
  PATHS_HELP_SCREENS,
} from "./useNavigator.constants";

export type MainScreenT = {
  id: string;
  name: string;
  title: string;
  component: () => React.ReactNode | null;
};

export type MainScreensT = MainScreenT[];

export type RootMainScreensParamList = {
  [PATHS_MAIN_SCREENS.splash]?: Record<string, string | number | boolean>;
  [PATHS_MAIN_SCREENS.welcome]?: Record<string, string | number | boolean>;
  [PATHS_MAIN_SCREENS.registration]?: Record<
    string,
    string | number | boolean
  > & {
    screen: keyof RootRegistrationScreensParamList;
  };
  [PATHS_MAIN_SCREENS.main]?: Record<string, string | number | boolean>;
  [PATHS_MAIN_SCREENS.mainMap]?: Record<string, string | number | boolean>;
};

export type RootMainTabsParamList = {
  [PATHS_MAIN_TABS.workshops]?: Record<string, string | number | boolean>;
  [PATHS_MAIN_TABS.map]?: Record<string, string | number | boolean>;
  [PATHS_MAIN_TABS.events]?: Record<string, string | number | boolean>;
  [PATHS_MAIN_TABS.help]?: Record<string, string | number | boolean>;
  [PATHS_MAIN_TABS.settings]?: Record<string, string | number | boolean>;
};

export type RootRegistrationScreensParamList = {
  [PATHS_REGISTRATION_SCREENS.registrationLocation]?: Record<
    string,
    string | number | boolean
  >;
  [PATHS_REGISTRATION_SCREENS.registrationTouchId]?: Record<
    string,
    string | number | boolean
  >;
  [PATHS_REGISTRATION_SCREENS.registrationFaceId]?: Record<
    string,
    string | number | boolean
  >;
  [PATHS_REGISTRATION_SCREENS.registrationPrivacyPolicy]?: Record<
    string,
    string | number | boolean
  >;
  [PATHS_REGISTRATION_SCREENS.registrationTermsOfUse]?: Record<
    string,
    string | number | boolean
  >;
  [PATHS_REGISTRATION_SCREENS.registrationInfo]?: Record<
    string,
    string | number | boolean
  >;
};

export type RootEventsScreensParamList = {
  [PATHS_EVENTS_SCREENS.eventsMain]?: Record<string, string | number | boolean>;
  [PATHS_EVENTS_SCREENS.eventItem]?: Record<
    string,
    string | number | boolean
  > & {
    eventId?: string;
  };
  [PATHS_EVENTS_SCREENS.eventsList]?: Record<
    string,
    string | number | boolean
  > & {
    isOld: boolean;
  };
  [PATHS_EVENTS_SCREENS.eventAdd]?: Record<
    string,
    string | number | boolean
  > & {
    from: string;
    screenFrom?: string;
  };
};

export type RootSettingsScreensParamList = {
  [PATHS_SETTINGS_SCREENS.settingsMain]?: Record<
    string,
    string | number | boolean
  >;
  [PATHS_SETTINGS_SCREENS.settingsWorkshops]?: Record<
    string,
    string | number | boolean
  >;
  [PATHS_SETTINGS_SCREENS.settingsWorkshopAdd]?: Record<
    string,
    string | number | boolean
  >;
  [PATHS_SETTINGS_SCREENS.settingsWorkshopChange]?: Record<
    string,
    string | number | boolean
  > & {
    workshopId: string;
  };
  [PATHS_SETTINGS_SCREENS.settingsEvents]?: Record<
    string,
    string | number | boolean
  >;
  [PATHS_SETTINGS_SCREENS.settingsEventAdd]?: Record<
    string,
    string | number | boolean
  >;
  [PATHS_SETTINGS_SCREENS.settingsEventChange]?: Record<
    string,
    string | number | boolean
  > & {
    eventId: string;
  };
  [PATHS_SETTINGS_SCREENS.settingsProfile]?: Record<
    string,
    string | number | boolean
  >;
};

export type RootWorkshopsScreensParamList = {
  [PATHS_WORKSHOP_SCREENS.workshopMain]?: Record<
    string,
    string | number | boolean
  >;
  [PATHS_WORKSHOP_SCREENS.workshopItem]?: Record<
    string,
    string | number | boolean
  > & {
    workshopId?: string;
    isMap?: boolean;
  };
  [PATHS_WORKSHOP_SCREENS.workshopAdd]?: Record<
    string,
    string | number | boolean
  >;
};

export type RootHelpScreensParamList = {
  [PATHS_HELP_SCREENS.helpMain]?: Record<string, string | number | boolean>;
};

export type RootAllScreensParamList = RootMainScreensParamList &
  RootRegistrationScreensParamList &
  RootWorkshopsScreensParamList &
  RootSettingsScreensParamList &
  RootEventsScreensParamList &
  RootHelpScreensParamList &
  RootMainTabsParamList;
