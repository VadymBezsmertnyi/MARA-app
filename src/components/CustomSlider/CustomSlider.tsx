import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import { Image as ExpoImage } from "expo-image";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { styles } from "./CustomSlider.styles";

type CustomSliderProps = {
  images: Array<{ url: string }> | string[];
  style?: (styleProps: StyleProp<ViewStyle>) => StyleProp<ViewStyle>;
  styleScroll?: (styleProps: StyleProp<ViewStyle>) => StyleProp<ViewStyle>;
  onPress?: ({
    image,
    index,
  }: {
    image: { url: string } | string;
    index: number;
  }) => void;
  customSlide?: ({
    item,
    style,
    index,
    width,
  }: {
    item: { url: string } | string;
    style: StyleProp<ImageStyle>;
    index: number;
    width: number;
  }) => React.ReactNode;
  position?: number;
  onPositionChanged?: (value: number) => void;
  customButtons?: (
    number: number,
    move: (number: number, animated?: boolean) => void
  ) => React.ReactNode;
  loop?: boolean;
};

export const CustomSlider: FunctionComponent<CustomSliderProps> = ({
  images,
  style,
  styleScroll,
  onPress,
  customSlide,
  position,
  onPositionChanged,
  customButtons,
  loop = true,
}) => {
  const { width: windowWidth } = useWindowDimensions();
  const [positionState, setPositionState] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);
  const progressValue = useSharedValue(0);

  const containerStyles = useMemo(
    () => [styles.container, style ? style(styles.container) : {}],
    [style]
  );

  const carouselContainerStyles = useMemo(() => {
    const baseStyle = { width: windowWidth };
    if (styleScroll) {
      const scrollStyles = styleScroll(baseStyle);
      return Array.isArray(scrollStyles) ? scrollStyles : [scrollStyles];
    }
    return [baseStyle];
  }, [styleScroll, windowWidth]);

  const currentPosition =
    typeof position === "number" ? position : positionState;

  const normalizedImages = useMemo(() => {
    return images.map((img) => (typeof img === "string" ? { url: img } : img));
  }, [images]);

  const move = (index: number) => {
    const normalizedIndex = Math.max(0, Math.min(index, images.length - 1));
    setPositionState(normalizedIndex);
    if (carouselRef.current) {
      (carouselRef.current as any).scrollTo({ index: normalizedIndex });
    }
    if (
      onPositionChanged &&
      normalizedIndex >= 0 &&
      normalizedIndex < images.length
    )
      onPositionChanged(normalizedIndex);
  };

  const foldAnimationStyle = (index: number) =>
    useAnimatedStyle(() => {
      const rotation = interpolate(
        progressValue.value,
        [index - 1, index, index + 1],
        [45, 0, -45],
        Extrapolate.CLAMP
      );

      return {
        transform: [{ perspective: 1000 }, { rotateY: `${rotation}deg` }],
      };
    });

  const renderImage = (
    image: { url: string } | string,
    index: number
  ): React.JSX.Element | null => {
    if (customSlide) {
      const customNode = customSlide({
        item: image,
        style: { width: windowWidth, height: "100%" },
        index,
        width: windowWidth,
      }) as React.JSX.Element | null;
      return customNode || null;
    }

    const imageUri = typeof image === "string" ? image : image?.url;
    const animStyle = foldAnimationStyle(index);

    return (
      <Animated.View style={[styles.slideContainer, animStyle]}>
        <TouchableOpacity
          disabled={!onPress}
          style={styles.imageWrapper}
          onPress={() => {
            if (onPress) onPress({ image, index });
          }}
          delayPressIn={200}
        >
          <ExpoImage
            source={{ uri: imageUri }}
            contentFit="contain"
            style={styles.imageStyle}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  useEffect(() => {
    if (typeof position === "number") move(position);
  }, [position]);

  useEffect(() => {
    setPositionState(0);
    if (carouselRef.current) carouselRef.current.scrollTo({ index: 0 });
  }, [images.length]);

  return (
    <View style={containerStyles}>
      <View style={styles.sliderFrame}>
        <Carousel
          ref={carouselRef}
          width={windowWidth}
          height={windowWidth}
          loop={loop}
          data={normalizedImages}
          scrollAnimationDuration={500}
          onProgressChange={(_, absoluteProgress) => {
            progressValue.value = absoluteProgress;
            const roundedIndex = Math.round(absoluteProgress);
            if (
              roundedIndex !== currentPosition &&
              roundedIndex >= 0 &&
              roundedIndex < images.length
            ) {
              setPositionState(roundedIndex);
              if (onPositionChanged) {
                onPositionChanged(roundedIndex);
              }
            }
          }}
          renderItem={({ item, index }) => {
            const rendered = renderImage(
              item as { url: string } | string,
              index
            );
            return rendered || <View />;
          }}
          style={carouselContainerStyles}
        />
      </View>

      {customButtons && typeof position === "number"
        ? customButtons(position, move)
        : null}
    </View>
  );
};
