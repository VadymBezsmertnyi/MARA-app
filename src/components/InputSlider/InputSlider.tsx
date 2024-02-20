import React, { FunctionComponent, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";

// components
import { LinearGradientCustom } from "../LinearGradientCustom/LinearGradientCustom";

// styles
import { styles } from "./InputSlider.styles";

type InputSliderProps = {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: React.SetStateAction<number>) => void;
  disabled?: boolean;
};

export const InputSlider: FunctionComponent<InputSliderProps> = ({
  label,
  min,
  max,
  value,
  onChange,
  disabled = false,
}) => {
  const containerStyle = useMemo(
    () => [styles.container, disabled && { opacity: 0.3 }],
    [disabled]
  );

  return (
    <View style={containerStyle}>
      <Text style={styles.labelSectors}>{label}</Text>
      <View style={styles.containerTrack}>
        <View style={styles.track}>
          <TouchableOpacity
            disabled={disabled}
            style={styles.containerIcon}
            onPress={() => {
              if (value > min) onChange((state) => state - 1);
            }}
          >
            <View style={styles.lineMinusIcon} />
          </TouchableOpacity>
          <Slider
            disabled={disabled}
            value={value}
            onValueChange={(values) => {
              onChange(Number(values[0].toFixed()));
            }}
            minimumValue={min}
            maximumValue={max}
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
            disabled={disabled}
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
    </View>
  );
};
