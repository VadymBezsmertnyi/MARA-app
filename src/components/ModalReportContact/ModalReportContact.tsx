import React, { FunctionComponent, useMemo } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// components
import { ModalUniversal } from "../ModalUniversal/ModalUniversal";

// icons
import { IconClose } from "../../icons/components";

// styles
import { styles } from "./ModalReportContact.styles";
import colors from "../../../styles/colors";

type ModalReportContactProps = {
  visible: boolean;
  onClose: () => void;
  type: "event" | "workshop" | "telegram-channel";
};

export const ModalReportContact: FunctionComponent<ModalReportContactProps> = ({
  visible,
  onClose,
  type,
}) => {
  const { i18n } = useLocalesProvider();
  const title = useMemo(() => {
    switch (type) {
      case "event":
        return i18n._("Report on event");
      case "workshop":
        return i18n._("Report on workshop");
      case "telegram-channel":
        return i18n._("Report on telegram channel");
      default:
        return i18n._("Report on business");
    }
  }, [type, i18n]);

  const onPressTelegram = async () => {
    const telegram = "VadymBezsmertnyi";
    await Linking.openURL(`https://t.me/${telegram}`);
  };

  const onPressEmail = async () => {
    const email = "vadym.bezsmertnyi@gmail.com";
    await Linking.openURL(`mailto:${email}`);
  };

  if (!visible) return null;
  return (
    <ModalUniversal
      visible={visible}
      onClose={onClose}
      styleContainer={styles.modalOverlay}
      animationType="fade"
    >
      <Shadow stretch>
        <View style={styles.containerModal}>
          <View style={styles.containerClose}>
            <TouchableOpacity
              accessibilityLabel={i18n._("Button for closing the modal window")}
              onPress={onClose}
            >
              <IconClose width={24} height={24} fill={colors.blackCoffee} />
            </TouchableOpacity>
          </View>
          <Text style={styles.titleModal}>{title}</Text>
          <Text style={styles.subtitleModal}>{i18n._("Contact us via:")}</Text>
          <View style={styles.containerButtons}>
            <TouchableOpacity
              style={styles.buttonContact}
              onPress={onPressTelegram}
            >
              <Text style={styles.buttonText}>Telegram: VadymBezsmertnyi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContact}
              onPress={onPressEmail}
            >
              <Text style={styles.buttonText}>
                Email: vadym.bezsmertnyi@gmail.com
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Shadow>
    </ModalUniversal>
  );
};
