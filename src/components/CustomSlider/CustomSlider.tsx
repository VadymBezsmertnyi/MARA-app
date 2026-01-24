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
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import Animated, { useSharedValue } from "react-native-reanimated";

// styles
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

    return (
      <TouchableOpacity
        key={`carousel-item-${index}`}
        disabled={!onPress}
        style={styles.slideContainer}
        onPress={() => {
          if (onPress) onPress({ image, index });
        }}
        delayPressIn={200}
      >
        <View style={styles.parallaxContainer}>
          <ExpoImage
            source={{ uri: imageUri }}
            contentFit="contain"
            style={styles.imageStyle}
          />
        </View>
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
      <Carousel
        ref={carouselRef}
        width={windowWidth}
        height={windowWidth}
        loop={loop}
        data={normalizedImages}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxAdjacentItemScale: 0.75,
        }}
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
          const rendered = renderImage(item as { url: string } | string, index);
          return rendered || <View />;
        }}
        style={carouselContainerStyles}
      />

      {customButtons && typeof position === "number" ? (
        customButtons(position, move)
      ) : (
        <View style={styles.buttons}>
          <Text style={styles.pageIndicator}>
            {currentPosition + 1}/{images.length}
          </Text>
        </View>
      )}
    </View>
  );
};
