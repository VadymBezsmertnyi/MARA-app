export type BiometricAuthenticatorContextT = {
  isFaceId: boolean;
  isTouchId: boolean;
  isIrisId: boolean;
  checkBiometric: () => Promise<boolean>;
};

export type PropsT = {
  children: React.ReactNode;
};
