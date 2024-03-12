import { UserDataT } from "./UserProvider.types";

export const DEFAULT_USER_DATA: UserDataT = {
  id: 0,
  isGeoLocation: false,
  avatar: null,
  eventsIds: [],
  workshopsIds: [],
  productsIds: [],
  isCheckBiometric: null,
  email: null,
  verifyToken: null,
  timeToken: 1,
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
  subscriptionId: null,
  settingsSos: {
    isEnable: false,
    radiusKm: 5,
  },
};

export const NUMBER_TWO = 2;

export const TOKEN_NAME = "token";
