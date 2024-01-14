import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { styles } from "./Checkbox.styles";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../../styles/colors";

type CheckboxProps = {
  check: boolean;
  setCheck: (value: boolean) => void;
};

export const Checkbox: FunctionComponent<CheckboxProps> = ({
  check,
  setCheck,
}) => {
  const [value, setValue] = useState(false);
  const colorsGradient = useMemo(
    () =>
      value
        ? [colors.californiaOrange, colors.blazeOrange]
        : [colors.grayCheckbox, colors.grayCheckbox],
    [value]
  );
  const startGradient = useMemo(() => ({ x: 0.9, y: 0.5 }), []);
  const endGradient = useMemo(() => ({ x: 0.1, y: 0.5 }), []);
  const locationsGradient = useMemo(() => [0, 1], []);
  const containerStyles = useMemo(
    () => [styles.container, value ? styles.containerSelect : {}],
    [value]
  );

  const onToggleCheck = () => {
    setValue(!check);
    setCheck(!check);
  };

  useEffect(() => {
    if (check !== value) setValue(check);
  }, [check]);

  return (
    <Pressable onPress={onToggleCheck}>
      <LinearGradient
        colors={colorsGradient}
        start={startGradient}
        end={endGradient}
        locations={locationsGradient}
        style={containerStyles}
      >
        <View style={styles.containerIn} />
      </LinearGradient>
    </Pressable>
  );
};
