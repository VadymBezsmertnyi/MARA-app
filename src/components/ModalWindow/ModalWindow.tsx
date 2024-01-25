import React, { FunctionComponent } from "react";
import { TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";

// styles
import { styles } from "./ModalWindow.styles";

type ModalWindowProps = {
  onClose: () => void;
  children: JSX.Element;
};

export const ModalWindow: FunctionComponent<ModalWindowProps> = ({
  onClose,
  children,
}) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.footerButton} onPress={onClose}>
      <BlurView intensity={15} style={styles.footerButtonBlurView} />
    </TouchableOpacity>
    {children}
  </View>
);
