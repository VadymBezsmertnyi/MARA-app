import React, { FunctionComponent, useMemo, useState } from "react";
import { Animated, ScrollView, StyleProp, ViewStyle } from "react-native";

// styles
import { styles } from "./ScrollViewCustom.styles";

type ScrollViewCustomProps = {
  children: JSX.Element;
  style?: StyleProp<ViewStyle>;
};

export const ScrollViewCustom: FunctionComponent<ScrollViewCustomProps> = ({
  children,
  style,
}) => {
  const [heightLineIndicator, setHeightLineIndicator] = useState(0);
  const scrollY = new Animated.Value(0);
  const opacity = new Animated.Value(0);
  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 0],
    extrapolate: "clamp",
  });

  const startOpacity = () => {
    opacity.setValue(1);
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const containerIndicatorStyles = useMemo(
    () => [
      styles.containerIndicator,
      {
        transform: [{ translateY }],
        opacity,
      },
    ],
    [translateY, heightLineIndicator, opacity]
  );

  const indicatorStyle = useMemo(
    () => [
      styles.indicator,
      {
        top: scrollY,
      },
    ],
    [scrollY]
  );

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={style}
        onScroll={(event) => {
          startOpacity();
          const current =
            (heightLineIndicator /
              (event.nativeEvent.contentSize.height - heightLineIndicator)) *
            0.9;
          scrollY.setValue(event.nativeEvent.contentOffset.y * current);
        }}
        scrollEventThrottle={16}
      >
        {children}
      </ScrollView>
      <Animated.View
        onLayout={(event) => {
          setHeightLineIndicator(event.nativeEvent.layout.height);
        }}
        style={containerIndicatorStyles}
      >
        <Animated.View style={indicatorStyle} />
      </Animated.View>
    </>
  );
};
