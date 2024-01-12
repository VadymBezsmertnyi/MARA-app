import React, { FunctionComponent, useEffect, useMemo } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withSpring,
} from "react-native-reanimated";

// icons
import { IconLoaderIn, IconLoaderOut } from "../../../../icons/components";

// styles
import { styles } from "./Loader.styles";

export const Loader: FunctionComponent = () => {
  const rotationValue = useSharedValue(0);

  useEffect(() => {
    // Опціонально, можна додати анімаційні ефекти
    rotationValue.value = withRepeat(
      withSequence(
        withSpring(1, { damping: 2, stiffness: 8 }), // Анімація в одному напрямку
        withSpring(-1, { damping: 2, stiffness: 8 }) // Анімація в іншому напрямку
      ),
      -1 // Безкінечно повторюємо анімацію
    );
  }, []);

  const animatedStyleOut = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationValue.value * 360}deg` }],
  }));

  const animatedStyleIn = useAnimatedStyle(() => ({
    transform: [{ rotate: `-${rotationValue.value * 360}deg` }],
  }));

  const stylesIconOut = useMemo(() => [animatedStyleOut], []);
  const stylesIconIn = useMemo(() => [styles.iconIn, animatedStyleIn], []);

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
