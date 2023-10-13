// hooks
import { useAuthorizationRegistration } from './useAuthorizationRegistration';

// types
import { PasswordsT } from '../screens/AuthorizationRegistration.types';

export const useRegistration = () => {
  const { verifyPassword, verifyConfirmPassword } = useAuthorizationRegistration();
  const defaultDataRegistration: PasswordsT = {
    password: '',
    confirmPassword: '',
  };

  const verifyErrors = (dataRegistration: PasswordsT): PasswordsT => {
    const { password, confirmPassword } = dataRegistration;
    const result: PasswordsT = {
      password: verifyPassword(password) || verifyConfirmPassword(password, confirmPassword),
      confirmPassword: verifyPassword(password) || verifyConfirmPassword(password, confirmPassword),
    };

    return result;
  };

  return { defaultDataRegistration, verifyErrors };
};
