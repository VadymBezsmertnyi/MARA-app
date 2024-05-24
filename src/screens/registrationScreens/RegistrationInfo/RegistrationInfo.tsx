import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Trans } from "@lingui/macro";

// providers
import { userContext } from "../../../providers/UserProvider/UserProvider";
import { localesContext } from "../../../../localization/localization.provider";

// helps
import { useAllNavigation } from "../../../navigators/Navigators.helps";
import { useAuthorizationRegistration } from "../../../helps/useAuthorizationRegistration";
import { getClearValue } from "../../../helps/regexp";
import { getNamesUser } from "../../../providers/UserProvider/UserProvider.helps";

// components
import { InputPhone } from "../../../components/InputPhone/InputPhone";
import { Input } from "../../../components/Input/Input";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { Header } from "../../../components/Header/Header";

// constants
import { PATHS_MAIN_SCREENS } from "../../../navigators/useNavigator.constants";
import { DEFAULT_COUNTRY } from "../../../constants/inputs.const";

// styles
import { styles } from "./RegistrationInfo.styles";

export const RegistrationInfo: FunctionComponent = () => {
  const navigation = useAllNavigation();
  const { verifyPhone } = useAuthorizationRegistration();
  const { i18n } = useContext(localesContext);
  const { userData, editUser } = useContext(userContext);
  const [login, setLogin] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+380");
  const [selectCountryIso, setSelectCountryIso] = useState(DEFAULT_COUNTRY);
  const [errorMessageLogin, setErrorMessageLogin] = useState("");
  const [errorMessagePhone, setErrorMessagePhone] = useState("");

  const onSave = async () => {
    const isPhone = verifyPhone(phoneNumber, selectCountryIso).length === 0;
    if (isPhone && login.length >= 2 && login.length <= 20) {
      const clearPhoneNumber = getClearValue(phoneNumber);
      const { firstName, lastName } = getNamesUser(userData);

      const resultSave = await editUser({
        login,
        isNewUser: false,
        firstName: login || firstName,
        lastName,
        ...(isPhone && { phoneNumber: clearPhoneNumber }),
      });
      if (resultSave) navigation.navigate(PATHS_MAIN_SCREENS.main);
    } else if (!isPhone) setErrorMessagePhone(i18n._("Invalid phone number"));
    else
      setErrorMessageLogin(
        i18n._("The length of the name should be between 2 and 20 characters")
      );
  };

  /* const onLater = () => {
    navigation.navigate(PATHS_MAIN_SCREENS.main);
  }; */

  const onChangeLogin = (value: string) => {
    setErrorMessageLogin("");
    setLogin(value);
  };

  const onChangePhone = (value: string) => {
    setErrorMessagePhone("");
    setPhoneNumber(value);
  };

  useEffect(() => {
    if (userData?.googleDate?.given_name)
      setLogin(userData.googleDate.given_name);
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={i18n._("Registration")}
        isShowLeft={false}
        isShowRight={false}
        containerStyle={styles.containerHeader}
      />
      <ScrollView>
        <Text style={styles.title}>
          <Trans>We recommend filling out the profile information</Trans>
        </Text>
        <View style={styles.containerInputs}>
          <Input
            label={`${i18n._("Name:")}*`}
            placeholder={i18n._("Enter your name")}
            value={login}
            onChange={onChangeLogin}
            errorMessage={errorMessageLogin}
          />
          <InputPhone
            isRegular
            label={i18n._("Phone number")}
            phoneNumber={phoneNumber}
            setPhoneNumber={onChangePhone}
            selectCountryIso={selectCountryIso}
            setSelectCountryIso={setSelectCountryIso}
            errorMessage={errorMessagePhone}
          />
        </View>
        <View style={styles.containerButton}>
          <ButtonCustom
            disabled={
              errorMessageLogin.length > 0 || errorMessagePhone.length > 0
            }
            title={i18n._("Save")}
            onSubmit={onSave}
          />
          {/* TODO: add later
          <ButtonCustom
            disabled={errorMessageLogin.length > 0}
            title={i18n._("Fill out later")}
            onSubmit={onLater}
            type="transparent"
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};
