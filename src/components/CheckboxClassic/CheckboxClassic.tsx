import React, { FunctionComponent, useMemo } from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";

// components
import { LinearGradientCustom } from "../LinearGradientCustom/LinearGradientCustom";

// icons
import { IconCheck } from "../../icons/components";

// styles
import { styles } from "./CheckboxClassic.styles";

type CheckboxClassicProps = {
  check: boolean;
  setCheck: (value: boolean) => void;
  isGradient?: boolean;
  accessibilityLabel?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export const CheckboxClassic: FunctionComponent<CheckboxClassicProps> = ({
  check,
  setCheck,
  isGradient = false,
  accessibilityLabel,
  containerStyle,
}) => {
  const containerStyles = useMemo(
    () => [styles.container, containerStyle],
    [containerStyle]
  );
  const body = useMemo(() => (check ? <IconCheck /> : <View />), [check]);

  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      onPress={() => {
        setCheck(!check);
      }}
    >
      <View style={containerStyles}>
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
