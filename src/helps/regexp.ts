import { REGEX_FORMAT } from '../constants/regexp';

export const getClearValue = (value: string): string => value.replaceAll(REGEX_FORMAT, '');
