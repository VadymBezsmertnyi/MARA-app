import { UserDataT } from "./UserProvider.types";

export const DEFAULT_USER_DATA: Omit<UserDataT, "_id"> = {
  isGeoLocation: false,
  isGeoLocationBackground: false,
  avatarFile: null,
  eventsIds: [],
  workshopsIds: [],
  isCheckBiometric: null,
  email: null,
  languageLocal: "en",
  isNewUser: true,
  googleDate: null,
  facebookDate: null,
  place_id: null,
  region_place_id: null,
  country_place_id: null,
  firstName: null,
  lastName: null,
  phoneNumber: null,
  isDeleteUser: false,
  subscriptionAdvertIds: [],
  subscriptionEventIds: [],
  subscriptionWorkshopIds: [],
  defaultAmount: {
    advertAmount: 3,
    advertBusinessAmount: 5,
    eventSmallAmount: 1,
    eventBigAmount: 0,
    workshopAmount: 1,
  },
};

export const NUMBER_TWO = 2;

export const TOKEN_KEY_ASYNC_STORAGE = "user_tokens";
