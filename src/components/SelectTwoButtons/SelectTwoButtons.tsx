import React, { FunctionComponent, useMemo } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

// components
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";

// styles
import { styles } from "./SelectTwoButtons.styles";

type SelectTwoButtonsProps = {
  isRegular?: boolean;
  isSelectFirst: boolean | null;
  titleFirst: string;
  titleSecond: string;
  label: string;
  onPressFirst: () => void;
  onPressSecond: () => void;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  disabledFirst?: boolean;
  disabledSecond?: boolean;
};

export const SelectTwoButtons: FunctionComponent<SelectTwoButtonsProps> = ({
  isRegular = false,
  isSelectFirst,
  titleFirst,
  titleSecond,
  label,
  onPressFirst,
  onPressSecond,
  containerStyle,
  labelStyle,
  disabledFirst,
  disabledSecond,
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
      <Text style={titleStyles}>
        {label}
        {isRegular ? (
          <>
            :<Text style={styles.labelRegular}>*</Text>
          </>
        ) : null}
      </Text>
      <View style={styles.containerSelectType}>
        <ButtonCustom
          disabled={disabledFirst}
          title={titleFirst}
          type={isSelectFirst === null ? "transparent" : typeFirst}
          onSubmit={onPressFirst}
          styleContainer={[
            styles.buttonSelectType,
            {
              opacity: disabledFirst ? 0.5 : 1,
            },
          ]}
        />
        <ButtonCustom
          disabled={disabledSecond}
          title={titleSecond}
          type={isSelectFirst === null ? "transparent" : typeSecond}
          onSubmit={onPressSecond}
          styleContainer={[
            styles.buttonSelectType,
            {
              opacity: disabledSecond ? 0.5 : 1,
            },
          ]}
        />
      </View>
    </View>
  );
};
