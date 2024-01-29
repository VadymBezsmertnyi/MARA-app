export type BiometricContextType = {
  isFaceId: boolean;
  isTouchId: boolean;
  isIrisId: boolean;
  checkBiometric: () => Promise<boolean>;
};

export type BiometricProviderType = {
  children: React.ReactNode;
};
