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
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import { Image as ExpoImage } from "expo-image";
import Carousel, {
  ICarouselInstance,
  TAnimationStyle,
} from "react-native-reanimated-carousel";
import Animated, {
  Extrapolate,
  interpolate,
  useSharedValue,
} from "react-native-reanimated";

import { styles } from "./CustomSlider.styles";
import colors from "../../../styles/colors";

const SLIDER_HEIGHT = 120;

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

  const normalizedImages = useMemo(() => {
    return images.map((img) => (typeof img === "string" ? { url: img } : img));
  }, [images]);

  const currentPosition =
    typeof position === "number" ? position : positionState;

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

  const foldAnimationStyle: TAnimationStyle = (element: any) => {
    "worklet";
    const itemSize = windowWidth / 2;
    const sideItemWidth = (windowWidth - itemSize) / 6;

    return {
      width: interpolate(
        element.progressValue,
        [-1, 0, 1],
        [sideItemWidth, itemSize, sideItemWidth],
        Extrapolate.CLAMP
      ),
      opacity: interpolate(
        element.progressValue,
        [-1.5, -1, 0, 1, 1.5],
        [0, 1, 1, 1, 0],
        Extrapolate.CLAMP
      ),
    };
  };

  const renderImage = (
    image: { url: string } | string,
    index: number
  ): React.JSX.Element | null => {
    if (customSlide) {
      const customNode = customSlide({
        item: image,
        style: { width: windowWidth / 2, height: "100%" },
        index,
        width: windowWidth / 2,
      }) as React.JSX.Element | null;
      return customNode || null;
    }

    const imageUri = typeof image === "string" ? image : image?.url;

    return (
      <TouchableOpacity
        disabled={!onPress}
        style={styles.slideContainer}
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
          height={SLIDER_HEIGHT}
          loop={loop}
          data={normalizedImages}
          scrollAnimationDuration={500}
          windowSize={5}
          customAnimation={foldAnimationStyle}
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
        <View style={styles.indicator}>
          <Text style={styles.indicatorText}>
            {currentPosition + 1}/{images.length}
          </Text>
        </View>
      </View>

      {customButtons && typeof position === "number"
        ? customButtons(position, move)
        : null}
    </View>
  );
};
