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
  const [height, setHeight] = useState(0);
  const scrollY = new Animated.Value(0);
  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 0],
    extrapolate: "clamp",
  });

  const containerStyles = useMemo(
    () => [
      styles.containerIndicator,
      {
        transform: [{ translateY }],
      },
    ],
    [translateY, height]
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
        onLayout={(event) => {
          setHeight(event.nativeEvent.layout.height);
        }}
        onScroll={(event) => {
          const current = (height + 30) / event.nativeEvent.contentSize.height;
          scrollY.setValue(event.nativeEvent.contentOffset.y * current);
        }}
        scrollEventThrottle={16}
      >
        {children}
      </ScrollView>
      <Animated.View style={containerStyles}>
        <Animated.View style={indicatorStyle} />
      </Animated.View>
    </>
  );
};
