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
import { Extrapolation, interpolate } from "react-native-reanimated";

// styles
import { styles } from "./CustomSlider.styles";

const SLIDER_HEIGHT = 220;

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

  const containerStyles = useMemo(
    () => [styles.container, style ? style(styles.container) : {}],
    [style]
  );

  const carouselContainerStyles = useMemo(() => {
    const baseStyle = { width: windowWidth, height: SLIDER_HEIGHT };
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
    if (carouselRef.current)
      carouselRef.current.scrollTo({ index: normalizedIndex });

    if (
      onPositionChanged &&
      normalizedIndex >= 0 &&
      normalizedIndex < images.length
    )
      onPositionChanged(normalizedIndex);
  };

  const PAGE_WIDTH = windowWidth;
  const ITEM_SIZE = PAGE_WIDTH / 2;
  const CENTER_OFFSET = PAGE_WIDTH / 2 - ITEM_SIZE / 2;
  const SIDE_ITEM_COUNT = 2;
  const SIDE_ITEM_WIDTH = (PAGE_WIDTH - ITEM_SIZE) / (2 * SIDE_ITEM_COUNT);

  const foldAnimationStyle: TAnimationStyle = React.useCallback(
    (value: number) => {
      "worklet";

      const itemOffsetInput = new Array(SIDE_ITEM_COUNT * 2 + 1)
        .fill(null)
        .map((_, index) => index - SIDE_ITEM_COUNT);

      const itemOffset = interpolate(
        value,
        itemOffsetInput,
        itemOffsetInput.map((item) => {
          if (item < 0) return (-ITEM_SIZE + SIDE_ITEM_WIDTH) * Math.abs(item);

          if (item > 0)
            return (ITEM_SIZE - SIDE_ITEM_WIDTH) * (Math.abs(item) - 1);

          return 0;
        })
      );

      const translate =
        interpolate(value, [-1, 0, 1], [-ITEM_SIZE, 0, ITEM_SIZE]) +
        CENTER_OFFSET -
        itemOffset;

      const itemWidth = interpolate(
        value,
        [-1, 0, 1],
        [SIDE_ITEM_WIDTH, ITEM_SIZE, SIDE_ITEM_WIDTH],
        Extrapolation.CLAMP
      );

      return {
        transform: [{ translateX: translate }],
        width: itemWidth,
        overflow: "hidden",
      };
    },
    [CENTER_OFFSET, ITEM_SIZE, SIDE_ITEM_WIDTH, SIDE_ITEM_COUNT]
  );

  const renderImage = (
    image: { url: string } | string,
    index: number
  ): React.JSX.Element | null => {
    if (customSlide) {
      const customNode = customSlide({
        item: image,
        style: { width: "100%", height: "100%" },
        index,
        width: windowWidth,
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
        <View style={styles.imageWrapper}>
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
      <View style={styles.sliderFrame}>
        <Carousel
          ref={carouselRef}
          width={PAGE_WIDTH}
          height={SLIDER_HEIGHT}
          loop={loop}
          data={normalizedImages}
          scrollAnimationDuration={500}
          windowSize={Math.min(9, Math.max(5, normalizedImages.length))}
          customAnimation={foldAnimationStyle}
          onSnapToItem={(index) => {
            setPositionState(index);
            if (onPositionChanged) {
              onPositionChanged(index);
            }
          }}
          renderItem={({ item }) => {
            const rendered = renderImage(item as { url: string } | string, 0);
            return rendered || <View />;
          }}
          style={carouselContainerStyles}
          containerStyle={{ width: PAGE_WIDTH, height: SLIDER_HEIGHT }}
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
