export const PATHS = {
  addPhone: '/user/registration/addPhone',
  sendCodeToUser: '/user/verify/sendCodePhone',
  verifyCodePhone: '/user/verify/verifyCodePhone',
  verifyCodePhoneRecoveryPassword: '/user/verify/verifyCodePhone/recoveryPassword',
  editUser: '/user/registration/editUser',
  editUserChangePassword: '/user/registration/editUser/changePassword',
  login: '/user/authorization/login',
  me: '/user/authorization/me',
} as const;
