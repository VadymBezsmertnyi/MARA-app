import { t } from "@lingui/macro";
import infoPhoneCountries from "country-telephone-data";

// provider
import { useLocalesProvider } from "../../localization/localization.provider";

// helps
import { getClearValue } from "./regexp";

export const useAuthorizationRegistration = () => {
  const { i18n } = useLocalesProvider();

  const errorPhone = t(
    i18n
  )`Incorrect phone number entered or country code of the phone number selected incorrectly`;
  const errorPassword = t(i18n)`Password must contain at least 8 characters`;
  const errorConfirmPassword = t(i18n)`Passwords do not match`;

  const isLoginError = (phoneNumber: string, selectCountryIso: string) => {
    const selectCountry =
      infoPhoneCountries.allCountries.find(
        (country) => country.iso2 === selectCountryIso
      ) || null;
    const clearPhoneNumber = getClearValue(phoneNumber);
    const clearFormat = getClearValue(selectCountry?.format || "");

    return clearPhoneNumber.length === clearFormat.length;
  };

  const isPasswordError = (value: string) => value?.length >= 8;
  const verifyPhone = (phone: string, isoCountry: string) =>
    isLoginError(phone, isoCountry) ? "" : errorPhone;
  const verifyPassword = (password: string) =>
    isPasswordError(password) ? "" : errorPassword;
  const verifyConfirmPassword = (password: string, confirmPassword: string) =>
    password === confirmPassword ? "" : errorConfirmPassword;
  return { verifyPhone, verifyPassword, verifyConfirmPassword };
};
