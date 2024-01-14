import React, { FunctionComponent, useContext, useMemo } from "react";
import { Text, View } from "react-native";
import { Trans } from "@lingui/macro";

// providers
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";

// constants
import { THEME_DARK } from "../../../providers/ThemeProvider/ThemeProvider.const";

// styles
import { styles } from "./RegistrationTermsOfUse.styles";

export const RegistrationTermsOfUse: FunctionComponent = () => {
  const { theme } = useContext(themeContext);

  const firstTitleStyle = useMemo(
    () => [styles.firstTitle, theme === THEME_DARK && styles.colorWhite],
    [theme]
  );
  const secondTitleStyle = useMemo(
    () => [styles.secondTitle, theme === THEME_DARK && styles.colorWhite],
    [theme]
  );
  const firstSubTitleStyle = useMemo(
    () => [styles.firstSubTitle, theme === THEME_DARK && styles.colorWhite],
    [theme]
  );
  const secondSubTitleStyle = useMemo(
    () => [styles.secondSubTitle, theme === THEME_DARK && styles.colorWhite],
    [theme]
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={firstTitleStyle}>
          <Trans>Terms of Service</Trans>
        </Text>
        <Text style={secondTitleStyle}>
          <Trans>
            Privacy Policy is a legal statement that defines what a business
            owner does with the personal data collected from users, as well as
            how this data is processed and for what purposes.
          </Trans>
        </Text>
      </View>
      <View style={styles.containerSubTitle}>
        <Text style={firstSubTitleStyle}>
          <Trans>Terms of Service</Trans>
        </Text>
        <Text style={secondSubTitleStyle}>
          <Trans>
            Privacy Policy is a legal statement that defines what a business
            owner does with personal data collected from users, as well as how
            this data is processed and for what purposes.
          </Trans>
        </Text>
        <Text style={secondSubTitleStyle}>
          <Trans>
            In 1968, the Council of Europe conducted research into the potential
            expansion of the Internet, as they were concerned about the impact
            of technology on human rights. This led to the development of
            policies aimed at protecting personal data.
          </Trans>
        </Text>
      </View>
    </View>
  );
};
