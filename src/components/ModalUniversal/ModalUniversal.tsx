import React, { FunctionComponent } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";

// styles
import { styles } from "./ModalUniversal.styles";

type ModalUniversalProps = {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  styleContainer?: StyleProp<ViewStyle>;
  transparent?: boolean;
  animationType?: "none" | "slide" | "fade";
};

export const ModalUniversal: FunctionComponent<ModalUniversalProps> = ({
  children,
  visible,
  onClose,
  styleContainer,
  transparent = true,
  animationType = "fade",
}) => {
  return (
    <Modal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={onClose}
    >
      <View style={[styles.container, styleContainer]}>
        <TouchableOpacity
          style={styles.backgroundButton}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.contentWrapper}>{children}</View>
      </View>
    </Modal>
  );
};
