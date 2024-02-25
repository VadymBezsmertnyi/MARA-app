import React, { FunctionComponent } from "react";
import { TouchableOpacity, View } from "react-native";
import { LinearGradientCustom } from "../LinearGradientCustom/LinearGradientCustom";
import { styles } from "./CheckboxClassic.styles";
import { IconCheck } from "../../icons/components";

type CheckboxClassicProps = {
  check: boolean;
  setCheck: (value: boolean) => void;
  isGradient?: boolean;
  accessibilityLabel?: string;
};

export const CheckboxClassic: FunctionComponent<CheckboxClassicProps> = ({
  check,
  setCheck,
  isGradient = false,
  accessibilityLabel,
}) => {
  const body = check ? <IconCheck /> : <View />;

  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      onPress={() => {
        setCheck(!check);
      }}
    >
      <View style={styles.container}>
        {isGradient && check ? (
          <LinearGradientCustom style={styles.containerLinearGradient}>
            {body}
          </LinearGradientCustom>
        ) : check ? (
          <View style={styles.containerLinearGradient}>{body}</View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
