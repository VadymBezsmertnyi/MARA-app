import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Image,
  ImageStyle,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

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
  loop,
}) => {
  const [positionState, setPositionState] = useState(0);
  const [width, setWidth] = useState(0);
  const [onPositionChangedCalled, setOnPositionChangedCalled] = useState(false);
  const ref = useRef<ScrollView | null>(null);

  const containerStyles = useMemo(
    () => [styles.container, style ? style(styles.container) : {}],
    [style]
  );
  const scrollContainerStyles = useMemo(
    () => [
      styles.scrollViewContainer,
      styleScroll ? styleScroll(styles.scrollViewContainer) : {},
    ],
    [styleScroll]
  );

  const getPosition = () => {
    if (typeof position === "number") {
      return position;
    }
    return positionState;
  };

  const move = (index: number, animated = true) => {
    const isUpdating = index !== getPosition();
    const x = width * index;

    if (ref.current) ref.current.scrollTo({ y: 0, x, animated });

    setPositionState(index);

    if (
      isUpdating &&
      onPositionChanged &&
      index < images.length &&
      index > -1
    ) {
      onPositionChanged(index);
      setOnPositionChangedCalled(true);
    }
  };

  const onLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
    move(loop ? 1 : 0, false);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { x } = event.nativeEvent.contentOffset;
    const newPosition = Math.round(event.nativeEvent.contentOffset.x / width);
    const isGoStart = loop && x >= width * images.length + 1;
    const isGoEnd = loop && x <= width && newPosition === 0;

    if (isGoStart) {
      move(1, false);
      return;
    } else if (isGoEnd) {
      move(images.length, false);
      return;
    }
    move(newPosition, true);

    if (positionState !== -1 && positionState !== images.length) {
      setPositionState(newPosition);
    }

    if (
      onPositionChanged &&
      onPositionChangedCalled &&
      newPosition < images.length &&
      newPosition > -1
    ) {
      onPositionChanged(newPosition);
    } else {
      setOnPositionChangedCalled(false);
    }
  };

  const renderImage = (
    image: { url: string } | string,
    index: number,
    isLoop?: boolean
  ) => {
    const imageStyle = () => [styles.image, { width }];

    if (customSlide)
      return customSlide({ item: image, style: imageStyle(), index, width });
    const imageObject =
      typeof image === "string" ? { uri: image } : { uri: image?.url };

    const imageComponent = (
      <View style={StyleSheet.absoluteFillObject}>
        {imageObject.uri ? (
          <Image
            key={`image-render-item-${index + 1}`}
            source={imageObject}
            resizeMode="contain"
            style={imageStyle()}
          />
        ) : null}
      </View>
    );

    const containerButtonStyles = () => [imageStyle()];

    return (
      <TouchableOpacity
        key={`image-${index + 1}${isLoop ? "-loop" : ""}`}
        disabled={!onPress}
        style={containerButtonStyles()}
        onPress={() => {
          if (onPress) onPress({ image, index });
        }}
        delayPressIn={200}
      >
        {imageComponent}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (position && position >= 0) setPositionState(position);
  }, [position]);

  useEffect(() => {
    if (positionState >= 0) move(positionState);
  }, [positionState]);

  return (
    <View style={containerStyles} onLayout={onLayout}>
      <ScrollView
        onLayout={onLayout}
        ref={ref}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        style={scrollContainerStyles}
        showsVerticalScrollIndicator={false}
      >
        {loop && renderImage(images[images.length - 1], -1, true)}
        {images.map((image, index) => renderImage(image, index))}
        {loop && renderImage(images[0], images.length, true)}
      </ScrollView>
      {customButtons && position ? (
        customButtons(position, move)
      ) : (
        <View style={styles.buttons}>
          {images.map((_image, index) => {
            const currentPosition = position || positionState;
            const getStyles = () => [
              styles.button,
              { backgroundColor: "#ccc" },
              currentPosition === (loop ? index + 1 : index) &&
                styles.buttonSelected,
            ];
            return (
              <View
                key={`slider-button-${index + 1}`}
                // TODO
                //underlayColor="#ccc"
                /* onPress={() => {
                  move(index);
                }} */
                style={getStyles()}
              >
                <View />
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};
