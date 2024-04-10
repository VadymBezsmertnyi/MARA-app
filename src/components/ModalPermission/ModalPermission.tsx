import React, { FunctionComponent } from "react";
import { Modal, Text, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

// components
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";

// styles
import { styles } from "./ModalPermission.styles";

type ModalPermissionProps = {
  isOpen: boolean;
  title: string;
  onCancel: () => void;
  onAccept: () => void;
};

export const ModalPermission: FunctionComponent<ModalPermissionProps> = ({
  isOpen,
  title,
  onCancel,
  onAccept,
}) => {
  if (!isOpen) return null;
  return (
    <Modal visible={isOpen} transparent>
      <View style={styles.container}>
        <Shadow stretch>
          <View style={styles.containerModal}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.containerButtons}>
              <ButtonCustom
                type="transparent"
                title="Cancel"
                onSubmit={onCancel}
                styleContainer={styles.containerButton}
              />
              <ButtonCustom
                title="Accept"
                onSubmit={onAccept}
                styleContainer={styles.containerButton}
              />
            </View>
          </View>
        </Shadow>
      </View>
    </Modal>
  );
};
