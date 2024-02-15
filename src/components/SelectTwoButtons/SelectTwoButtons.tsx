import React, { FunctionComponent, useMemo } from "react";
import { Text, View, ViewStyle } from "react-native";

// components
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";

// styles
import { styles } from "./SelectTwoButtons.styles";

type SelectTwoButtonsProps = {
  isSelectFirst: boolean;
  titleFirst: string;
  titleSecond: string;
  label: string;
  onPressFirst: () => void;
  onPressSecond: () => void;
  containerStyle?: ViewStyle;
};

export const SelectTwoButtons: FunctionComponent<SelectTwoButtonsProps> = ({
  isSelectFirst,
  titleFirst,
  titleSecond,
  label,
  onPressFirst,
  onPressSecond,
  containerStyle,
}) => {
  const typeFirst = isSelectFirst ? "full" : "transparent";
  const typeSecond = !isSelectFirst ? "full" : "transparent";

  const containerStyles = useMemo(
    () => [styles.container, containerStyle],
    [containerStyle]
  );

  return (
    <View style={containerStyles}>
      <Text style={styles.title}>{label}</Text>
      <View style={styles.containerSelectType}>
        <ButtonCustom
          title={titleFirst}
          type={typeFirst}
          onSubmit={onPressFirst}
          styleContainer={styles.buttonSelectType}
        />
        <ButtonCustom
          title={titleSecond}
          type={typeSecond}
          onSubmit={onPressSecond}
          styleContainer={styles.buttonSelectType}
        />
      </View>
    </View>
  );
};
