import React, { FunctionComponent, useEffect, useMemo, useRef } from "react";
import { View, Animated, Easing } from "react-native";

// icons
import { IconLoaderIn, IconLoaderOut } from "../../../../icons/components";

// styles
import { styles } from "./Loader.styles";

export const Loader: FunctionComponent = () => {
  const rotationValue = useRef(new Animated.Value(0)).current;

  const rotateOut = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const rotateIn = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-360deg"],
  });

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotationValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(rotationValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    ).start();
  };

  const stylesIconOut = useMemo(
    () => [{ transform: [{ rotate: rotateOut }] }],
    []
  );
  const stylesIconIn = useMemo(
    () => [styles.iconIn, { transform: [{ rotate: rotateIn }] }],
    []
  );

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={stylesIconOut}>
        <IconLoaderOut width={128} height={128} />
      </Animated.View>
      <Animated.View style={stylesIconIn}>
        <IconLoaderIn width={78} height={78} />
      </Animated.View>
    </View>
  );
};
