import React, { FunctionComponent, useMemo } from 'react';
import { Platform, Text, View } from 'react-native';

// styles
import { styles } from './EventContainer.styles';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../../../../../styles/colors';
import { BlurView } from 'expo-blur';

export const EventContainer: FunctionComponent = () => {
  const titleEvent = 'Назва найближчої події';
  const dataEvent = '01.01.2023';

  const colorsLinearGradient = useMemo(() => [colors.californiaOrange70, colors.blazeOrange70], []);
  const startLinearGradient = useMemo(() => ({ x: 0.9, y: 0.5 }), []);
  const endLinearGradient = useMemo(() => ({ x: 0.1, y: 0.5 }), []);
  const locationsLinearGradient = useMemo(() => [0, 1], []);

  return (
    <LinearGradient
      colors={colorsLinearGradient}
      start={startLinearGradient}
      end={endLinearGradient}
      locations={locationsLinearGradient}
      style={styles.linearGradientContainer}
    >
      {Platform.OS !== 'android' ? (
        <BlurView intensity={5} tint="dark" style={styles.blurViewContainer} />
      ) : null}
      <View style={styles.container}>
        <Text style={styles.title}>{titleEvent}</Text>
        <Text style={styles.subTitle}>{dataEvent}</Text>
      </View>
    </LinearGradient>
  );
};
