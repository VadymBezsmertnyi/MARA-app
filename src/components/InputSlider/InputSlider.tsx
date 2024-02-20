import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";

// components
import { LinearGradientCustom } from "../LinearGradientCustom/LinearGradientCustom";

// styles
import { styles } from "./InputSlider.styles";

type InputSliderProps = {
  min: number;
  max: number;
  value: number;
  onChange: (value: React.SetStateAction<number>) => void;
};

export const InputSlider: FunctionComponent<InputSliderProps> = ({
  min,
  max,
  value,
  onChange,
}) => (
  <View style={styles.container}>
    <View style={styles.track}>
      <TouchableOpacity
        style={styles.containerIcon}
        onPress={() => {
          if (value > min) onChange((state) => state - 1);
        }}
      >
        <View style={styles.lineMinusIcon} />
      </TouchableOpacity>
      <Slider
        value={value}
        onValueChange={(values) => {
          onChange(Number(values[0].toFixed()));
        }}
        minimumValue={1}
        maximumValue={200}
        trackStyle={styles.trackStyle}
        renderThumbComponent={() => (
          <View style={styles.containerThumb}>
            <LinearGradientCustom style={styles.thumbLinerGradientStyle}>
              <View style={styles.thumbStyle} />
            </LinearGradientCustom>
            <Text style={styles.numberThumb}>{value}</Text>
          </View>
        )}
        renderMinimumTrackComponent={() => (
          <LinearGradientCustom style={styles.minimumTrackStyle} />
        )}
        maximumTrackStyle={styles.maximumTrackStyle}
      />
      <TouchableOpacity
        style={styles.containerIcon}
        onPress={() => {
          if (value < max) onChange((state) => state + 1);
        }}
      >
        <View style={styles.lineMinusIcon} />
        <View style={styles.linePlusIcon} />
      </TouchableOpacity>
    </View>
    <View style={styles.containerPointers}>
      <Text style={styles.numbersThumb}>1</Text>
      <Text style={styles.numbersThumb}>200</Text>
    </View>
  </View>
);
