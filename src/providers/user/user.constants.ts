import { UserDataT } from './user.types';

export const DEFAULT_USER_DATA: UserDataT = {
  id: 0,
  phone_number: '',
  is_password: false,
  time_token: 1,
  is_verified: false,
  verify_code: '',
  verify_token: '',
  nick: '',
  first_name: '',
  family_name: '',
  photo_url: '',
  locale: 'en',
  googleId: '',
  motoIds: [],
  autoIds: [],
  location_end: null,
  location_sos: null,
  accessLocations: false,
  city_user_id: null,
};

export const NUMBER_TWO = 2;

export const TOKEN_NAME = 'token';
