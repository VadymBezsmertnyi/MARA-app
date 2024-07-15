import React, { FunctionComponent } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// components
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { styles } from "./ModalWindowBuy.styles";
import { Shadow } from "react-native-shadow-2";
import {
  IconFontistoEmail,
  IconLogoTelegram,
  IconLogoViber,
} from "../../icons/components";
import colors from "../../../styles/colors";

type ModalWindowBuyProps = {
  onClose: () => void;
};

const ModalWindowBuy: FunctionComponent<ModalWindowBuyProps> = ({
  onClose,
}) => {
  const { i18n } = useLocalesProvider();

  const onPressViber = async () => {
    console.log("Viber");
    const viberNumber = "380938150664";
    await Linking.openURL(`viber://chat?number=${viberNumber}`);
  };

  const onPressTelegram = async () => {
    console.log("Telegram");
    const telegram = "VadymBezsmertnyi";
    await Linking.openURL(`https://t.me/${telegram}`);
  };

  const onPressEmail = async () => {
    const email = "vadym.bezsmertnyy@gmail.com";
    await Linking.openURL(`mailto:${email}`);
  };

  const onToFeedbackLinkBrowser = async () => {
    const link =
      "https://docs.google.com/forms/d/e/1FAIpQLSfQ4j74qeOKiau4qRwPLNN5sN2pqTjX4K8vPEfwY35TuyoI3g/viewform?usp=sf_link";
    await Linking.openURL(link);
  };

  return (
    <ModalWindow onClose={onClose}>
      <Shadow stretch containerStyle={styles.containerShadow}>
        <View style={styles.container}>
          <Text style={styles.title}>{i18n._("Attention!")}</Text>
          <Text style={styles.subtitle}>
            {i18n._(
              "Unfortunately, it is currently impossible to increase the number of available ads, workshops or events, as the application is in test mode. If you have any questions, please contact the administration or leave feedback."
            )}
          </Text>
          <View style={styles.containerButtons}>
            <TouchableOpacity onPress={onPressViber}>
              <IconLogoViber width={40} height={40} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressTelegram}>
              <IconLogoTelegram width={40} height={40} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressEmail}>
              <IconFontistoEmail
                width={40}
                height={40}
                fill={colors.blueTufts}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.titleOr}>{i18n._("-- or --")}</Text>
          <Text style={styles.titleFeedback}>
            {i18n._("Report an error/improvement")}
          </Text>
          <Text style={styles.titleThanks}>
            {i18n._("Thank you for understanding!")}
          </Text>
        </View>
      </Shadow>
    </ModalWindow>
  );
};

export default ModalWindowBuy;
