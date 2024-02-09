import React, { FunctionComponent, useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Trans } from "@lingui/macro";

// providers
import { localesContext } from "../../../localization/localization.provider";

// components
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";
import { ModalWindow } from "../ModalWindow/ModalWindow";

// helps
import { useAllNavigation } from "../../navigators/Navigators.helps";

// icons
import { IconClose, IconWarningGradient } from "../../icons/components";

// styles
import { styles } from "./ModalDelete.styles";
import colors from "../../../styles/colors";

type ModalDeleteProps = {
  onClose: () => void;
  onSubmit: () => Promise<void>;
  isGoBack?: boolean;
};

export const ModalDelete: FunctionComponent<ModalDeleteProps> = ({
  onClose,
  onSubmit,
  isGoBack = true,
}) => {
  const { i18n } = useContext(localesContext);
  const navigation = useAllNavigation();

  const onDelete = async () => {
    await onSubmit();
    if (isGoBack) navigation.goBack();
  };

  return (
    <ModalWindow onClose={onClose}>
      <View style={styles.containerModal}>
        <View style={styles.containerClose}>
          <TouchableOpacity onPress={onClose}>
            <IconClose width={24} height={24} fill={colors.blackCoffee} />
          </TouchableOpacity>
        </View>
        <IconWarningGradient width={130} height={130} />
        <Text style={styles.titleModal}>
          <Trans>Are you sure you want to delete?</Trans>
        </Text>
        <View style={styles.containerButtons}>
          <ButtonCustom
            title={i18n._("Yes")}
            onSubmit={onDelete}
            type="transparent"
            styleContainer={styles.buttonModal}
          />
          <ButtonCustom
            title={i18n._("No")}
            onSubmit={onClose}
            styleContainer={styles.buttonModal}
          />
        </View>
      </View>
    </ModalWindow>
  );
};
