export const PATHS_MAIN_SCREENS = {
  splash: "splash",
  welcome: "welcome",
  registration: "registration",
  forget: "forget",
  main: "main",
  mainMap: "mainMap",
} as const;

export const PATHS_MAIN_TABS = {
  workshops: "workshops",
  map: "map",
  news: "news",
  market: "market",
  settings: "settings",
} as const;

export const PATHS_REGISTRATION_SCREENS = {
  registrationLocation: "registrationLocation",
  registrationTouchId: "registrationTouchId",
  registrationFaceId: "registrationFaceId",
  registrationPrivacyPolicy: "registrationPrivacyPolicy",
  registrationTermsOfUse: "registrationTermsOfUse",
  registrationInfo: "registrationInfo",
} as const;

export const PATHS_FORGET_SCREENS = {
  forgetPhone: "forgetPhone",
  forgetCode: "forgetCode",
  forgetPassword: "forgetPassword",
} as const;

export const PATHS_NEWS_SCREENS = {
  newsMain: "newsMain",
  newsList: "newsList",
  newItem: "newItem",
  eventsList: "eventsList",
  eventItem: "eventItem",
  addEvent: "addEvent",
  locationEventInput: "locationEventInput",
  locationEventMap: "locationEventMap",
} as const;

export const PATHS_SETTINGS_SCREENS = {
  settingsMain: "settingsMain",
  settingsAds: "settingsAds",
  settingsWorkshops: "settingsWorkshops",
  settingsEvents: "settingsEvents",
  settingsAddEvent: "settingsAddEvent",
  settingsChangeEvent: "settingsChangeEvent",
  settingsProfile: "settingsProfile",
} as const;

export const PATHS_WORKSHOP_SCREENS = {
  workshopMain: "workshopMain",
  workshopItem: "workshopItem",
} as const;
