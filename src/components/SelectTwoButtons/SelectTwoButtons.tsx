import React, { FunctionComponent, useMemo } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

// components
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";

// styles
import { styles } from "./SelectTwoButtons.styles";

type SelectTwoButtonsProps = {
  isSelectFirst: boolean | null;
  titleFirst: string;
  titleSecond: string;
  label: string;
  onPressFirst: () => void;
  onPressSecond: () => void;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
};

export const SelectTwoButtons: FunctionComponent<SelectTwoButtonsProps> = ({
  isSelectFirst,
  titleFirst,
  titleSecond,
  label,
  onPressFirst,
  onPressSecond,
  containerStyle,
  labelStyle,
}) => {
  const typeFirst = isSelectFirst ? "full" : "transparent";
  const typeSecond = !isSelectFirst ? "full" : "transparent";

  const containerStyles = useMemo(
    () => [styles.container, containerStyle],
    [containerStyle]
  );

  const titleStyles = useMemo(() => [styles.title, labelStyle], [labelStyle]);

  return (
    <View style={containerStyles}>
      <Text style={titleStyles}>{label}</Text>
      <View style={styles.containerSelectType}>
        <ButtonCustom
          title={titleFirst}
          type={isSelectFirst === null ? "transparent" : typeFirst}
          onSubmit={onPressFirst}
          styleContainer={styles.buttonSelectType}
        />
        <ButtonCustom
          title={titleSecond}
          type={isSelectFirst === null ? "transparent" : typeSecond}
          onSubmit={onPressSecond}
          styleContainer={styles.buttonSelectType}
        />
      </View>
    </View>
  );
};
