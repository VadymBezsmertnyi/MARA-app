import React, { FunctionComponent, useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Trans } from "@lingui/macro";

// providers
import { localesContext } from "../../../../../localization/localization.provider";

// components
import { ButtonCustom } from "../../../../components/ButtonCustom/ButtonCustom";
import { ModalWindow } from "../../../../components/ModalWindow/ModalWindow";

// helps
import showErrors from "../../../../helps/errors/showError";
import { useAllNavigation } from "../../../../navigators/Navigators.helps";

// icons
import { IconClose, IconWarningGradient } from "../../../../icons/components";

// styles
import { styles } from "./ModalDeleteEvent.styles";
import colors from "../../../../../styles/colors";

type ModalDeleteEventProps = {
  idDeleteEvent: number;
  deleteEvent: (idEvent: number, type?: "all" | "user") => Promise<boolean>;
  onClose: () => void;
};

export const ModalDeleteEvent: FunctionComponent<ModalDeleteEventProps> = ({
  idDeleteEvent,
  onClose,
  deleteEvent,
}) => {
  const { i18n } = useContext(localesContext);
  const navigation = useAllNavigation();
  const { success } = showErrors;

  const onDeleteEvent = async () => {
    await deleteEvent(idDeleteEvent, "user");
    success(i18n._("Event delete"));
    onClose();
    navigation.goBack();
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
            onSubmit={onDeleteEvent}
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
