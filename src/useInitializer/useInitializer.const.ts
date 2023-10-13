export const IS_WEB = typeof document !== 'undefined';
export const IS_REACT_NATIVE =
  typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
export const IS_NODE = !IS_WEB && !IS_REACT_NATIVE;
