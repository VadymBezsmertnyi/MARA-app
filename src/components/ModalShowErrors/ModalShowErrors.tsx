import React, { FunctionComponent } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// hooks
import { useErrors } from "../../helps/useErrors";

// components
import { ModalWindow } from "../ModalWindow/ModalWindow";

// icons
import { IconClose, IconWarningGradient } from "../../icons/components";

// styles
import { styles } from "./ModalShowErrors.styles";
import colors from "../../../styles/colors";

type ModalErrors = {
  isOpen: boolean;
  onClose: () => void;
  errors: Record<string, { name: string; title: string }> | null;
};

export const ModalShowErrors: FunctionComponent<ModalErrors> = ({
  isOpen,
  onClose,
  errors,
}) => {
  const { i18n } = useLocalesProvider();
  const { getErrorText } = useErrors(i18n);
  const isError = errors ? Object.keys(errors).length > 0 : false;
  const errorMessage = getErrorText("errorMessage", {});
  const onlyErrors =
    errors && isError
      ? Object.values(errors).map(
          (errorObject) => `${errorObject.name}: ${errorObject.title}`
        )
      : [];

  if (!isOpen || !errors) return null;
  return (
    <Modal visible={isOpen} transparent>
      <ModalWindow onClose={onClose}>
        <View style={styles.containerModal}>
          <View style={styles.containerClose}>
            <TouchableOpacity
              accessibilityLabel={i18n._("Button for closing the modal window")}
              onPress={onClose}
            >
              <IconClose width={24} height={24} fill={colors.blackCoffee} />
            </TouchableOpacity>
          </View>
          <IconWarningGradient width={130} height={130} />
          <Text style={styles.titleModal}>
            {`${errorMessage.title}:\n\n${onlyErrors.join("\n\n")}`}
          </Text>
        </View>
      </ModalWindow>
    </Modal>
  );
};
