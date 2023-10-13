export const PATHS_MAIN_SCREENS = {
  welcome: 'welcome',
  authorization: 'authorization',
  registration: 'registration',
  forget: 'forget',
  main: 'main',
  mainMap: 'mainMap',
} as const;

export const PATHS_REGISTRATION_SCREENS = {
  registrationPhone: 'registrationPhone',
  registrationCode: 'registrationCode',
  registrationPassword: 'registrationPassword',
  registrationTouchId: 'registrationTouchId',
  registrationFaceId: 'registrationFaceId',
  registrationPrivacyPolicy: 'registrationPrivacyPolicy',
  registrationTermsOfUse: 'registrationTermsOfUse',
} as const;

export const PATHS_FORGET_SCREENS = {
  forgetPhone: 'forgetPhone',
  forgetCode: 'forgetCode',
  forgetPassword: 'forgetPassword',
} as const;
