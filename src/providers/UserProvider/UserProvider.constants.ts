import { UserDataT } from "./UserProvider.types";

export const DEFAULT_USER_DATA: UserDataT = {
  id: 0,
  isGeoLocation: false,
  avatar: null,
  eventsIds: [],
  isCheckBiometric: null,
  email: null,
  verifyToken: null,
  timeToken: 1,
  languageLocal: "en",
  isNewUser: true,
  googleDate: null,
  cityUser: null,
  firstName: null,
  lastName: null,
  phoneNumber: null,
  isDeleteUser: false,
};

export const NUMBER_TWO = 2;

export const TOKEN_NAME = "token";
