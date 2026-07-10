import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// components
import { ModalUniversal } from "../ModalUniversal/ModalUniversal";
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";

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
  subTitle?: string;
};

export const ModalDelete: FunctionComponent<ModalDeleteProps> = ({
  onClose,
  onSubmit,
  isGoBack = true,
  subTitle,
}) => {
  const { i18n } = useLocalesProvider();
  const navigation = useAllNavigation();

  const onDelete = async () => {
    await onSubmit();
    if (isGoBack) navigation.goBack();
  };

  return (
    <ModalUniversal
      visible={true}
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
          <IconWarningGradient width={130} height={130} />
          <Text style={styles.titleModal}>
            {i18n._("Are you sure you want to delete?")}
          </Text>
          {subTitle ? (
            <Text style={styles.subTitleModal}>{subTitle}</Text>
          ) : null}
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
      </Shadow>
    </ModalUniversal>
  );
};
