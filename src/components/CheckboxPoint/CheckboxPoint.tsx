import React, { FunctionComponent, useMemo } from "react";
import { View } from "react-native";

// styles
import { styles } from "./CheckboxPoint.styles";

type CheckboxPointProps = {
  isSelect: boolean;
};

export const CheckboxPoint: FunctionComponent<CheckboxPointProps> = ({
  isSelect,
}) => {
  const selectPointStyle = useMemo(
    () =>
      isSelect ? [styles.container, styles.selectContainer] : styles.container,
    [isSelect]
  );
  const inSelectPointStyle = useMemo(
    () => (isSelect ? styles.inSelectContainer : {}),
    [isSelect]
  );

  return (
    <View style={selectPointStyle}>
      <View style={inSelectPointStyle} />
    </View>
  );
};
