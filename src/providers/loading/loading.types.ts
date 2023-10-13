export type typeLoadingT = 'full' | 'opacity';

export type LoadingContext = {
  isLoading: boolean;
  setLoading: (state: boolean, type?: typeLoadingT) => void;
};
