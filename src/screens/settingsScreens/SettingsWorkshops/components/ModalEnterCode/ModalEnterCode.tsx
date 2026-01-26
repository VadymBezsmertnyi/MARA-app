import React, { FunctionComponent, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// components
import { ModalUniversal } from "../../../../../components/ModalUniversal/ModalUniversal";
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";

// icons
import { IconClose } from "../../../../../icons/components";

// styles
import { styles } from "./ModalEnterCode.styles";
import colors from "../../../../../../styles/colors";

type ModalEnterCodeProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (code: string) => void;
  isLoading?: boolean;
  error?: string | null;
};

export const ModalEnterCode: FunctionComponent<ModalEnterCodeProps> = ({
  visible,
  onClose,
  onConfirm,
  isLoading = false,
  error = null,
}) => {
  const { i18n } = useLocalesProvider();
  const [code, setCode] = useState("");

  const handleConfirm = () => {
    if (code.length === 6) onConfirm(code);
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
          <Text style={styles.titleModal}>
            {i18n._("Enter verification code")}
          </Text>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            value={code}
            onChangeText={setCode}
            placeholder={i18n._("Enter 6-digit code")}
            keyboardType="number-pad"
            maxLength={6}
            autoFocus
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
          <ButtonCustom
            title={i18n._("Confirm")}
            onSubmit={handleConfirm}
            disabled={code.length !== 6 || isLoading}
            styleContainer={styles.buttonContainer}
          />
        </View>
      </Shadow>
    </ModalUniversal>
  );
};
