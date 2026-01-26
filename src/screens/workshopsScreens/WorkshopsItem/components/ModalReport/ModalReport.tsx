import React, { FunctionComponent } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import { ModalUniversal } from "../../../../../components/ModalUniversal/ModalUniversal";
import { IconClose } from "../../../../../icons/components";
import { styles } from "./ModalReport.styles";
import colors from "../../../../../../styles/colors";

type ModalReportProps = {
  visible: boolean;
  onClose: () => void;
};

export const ModalReport: FunctionComponent<ModalReportProps> = ({
  visible,
  onClose,
}) => {
  const { i18n } = useLocalesProvider();

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
          <Text style={styles.titleModal}>{i18n._("Report on business")}</Text>
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
