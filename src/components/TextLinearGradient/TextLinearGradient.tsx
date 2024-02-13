import React, { FunctionComponent, useMemo, useState } from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

// styles
import colors from "../../../styles/colors";
import { styles } from "./TextLinearGradient.styles";

type TextLinearGradientProps = {
  title: string;
  style?: StyleProp<TextStyle>;
};

export const TextLinearGradient: FunctionComponent<TextLinearGradientProps> = ({
  title,
  style,
}) => {
  const [height, setHeight] = useState(25);
  const colorsGradient = useMemo(
    () => [colors.californiaOrange, colors.blazeOrange],
    []
  );
  const startGradient = useMemo(() => ({ x: 0.5, y: 0.5 }), []);
  const endGradient = useMemo(() => ({ x: 0, y: 0.5 }), []);
  const locationsGradient = useMemo(() => [0, 1], []);

  const containerStyle = useMemo(() => [{ height }], [height]);
  const textStyle = useMemo(() => [styles.title, style], [style]);

  return (
    <MaskedView
      style={containerStyle}
      maskElement={
        <Text
          onLayout={(event) => {
            setHeight(event.nativeEvent.layout.height);
          }}
          style={textStyle}
        >
          {title}
        </Text>
      }
    >
      <LinearGradient
        colors={colorsGradient}
        start={startGradient}
        end={endGradient}
        locations={locationsGradient}
        style={styles.gradient}
      />
    </MaskedView>
  );
};
