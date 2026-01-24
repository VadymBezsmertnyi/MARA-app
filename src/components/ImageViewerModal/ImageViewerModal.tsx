import React, { FunctionComponent, useMemo, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleProp,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel";

// types
import { ImageFileType } from "../../storeRedux/types";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// components
import { ModalUniversal } from "../ModalUniversal/ModalUniversal";
import { ImageCache } from "../ImageCache/ImageCache";
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";

// icons
import { IconClose } from "../../icons/components";

// styles
import { styles } from "./ImageViewerModal.styles";
import colors from "../../../styles/colors";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type ImageViewerModalProps = {
  images: ImageFileType[];
  initialIndex: number;
  onClose: () => void;
  onUpdateImages: (images: ImageFileType[]) => void;
};

export const ImageViewerModal: FunctionComponent<ImageViewerModalProps> = ({
  images,
  initialIndex,
  onClose,
  onUpdateImages,
}) => {
  const { i18n } = useLocalesProvider();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isVisible, setIsVisible] = useState(true);

  const currentImage = useMemo(
    () => images[currentIndex],
    [images, currentIndex]
  );

  const isMainPhoto = currentIndex === 0;

  const colorsGradientButtonDelete = useMemo<[string, string]>(
    () => [colors.grayCloudy, colors.grayCloudy],
    []
  );

  const containerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    }),
    [insets]
  );

  const handleDeleteImage = () => {
    const newImages = images.filter((_, index) => index !== currentIndex);

    if (newImages.length === 0) {
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 300);
    } else {
      let nextIndex = currentIndex;
      if (currentIndex >= newImages.length) nextIndex = newImages.length - 1;

      onUpdateImages(newImages);
      setTimeout(() => {
        setCurrentIndex(nextIndex);
      }, 50);
    }
  };

  const handleMakeMainPhoto = () => {
    if (isMainPhoto) return;

    const selectedImage = images[currentIndex];
    const remainingImages = images.filter((_, index) => index !== currentIndex);
    const newImages = [selectedImage, ...remainingImages];

    onUpdateImages(newImages);
    setCurrentIndex(0);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isVisible || !currentImage) return null;
  return (
    <ModalUniversal
      visible={isVisible}
      onClose={handleCloseModal}
      styleContainer={styles.modalOverlay}
      animationType="fade"
    >
      <View style={[styles.container, containerStyle]}>
        <View style={styles.containerHeader}>
          <View />
          <Text style={styles.titleHeader}>
            {i18n._("Photo {numberPhoto}", {
              numberPhoto: currentIndex + 1,
            })}
          </Text>
          <TouchableOpacity
            accessibilityLabel={i18n._("Button for closing the modal window")}
            onPress={handleCloseModal}
          >
            <IconClose width={24} height={24} fill={colors.blackRich} />
          </TouchableOpacity>
        </View>

        <View style={styles.carouselContainer}>
          <Carousel
            loop={false}
            width={SCREEN_WIDTH}
            height={SCREEN_HEIGHT * 0.5}
            data={images}
            scrollAnimationDuration={500}
            onSnapToItem={(index) => setCurrentIndex(index)}
            defaultIndex={initialIndex}
            renderItem={({ item }) => (
              <View style={styles.carouselItemContainer}>
                <ImageCache
                  contentFit="contain"
                  imageSrc={item.url}
                  style={styles.image}
                />
              </View>
            )}
          />

          <View style={styles.indicatorContainer}>
            <Text style={styles.indicatorText}>
              {currentIndex + 1} / {images.length}
            </Text>
          </View>
        </View>

        <View style={styles.containerButtons}>
          <ButtonCustom
            disabled={isMainPhoto}
            type={isMainPhoto ? "full" : "transparent"}
            title={
              isMainPhoto ? i18n._("Main photo") : i18n._("Make the main photo")
            }
            onSubmit={handleMakeMainPhoto}
          />
          <ButtonCustom
            type="transparent"
            onSubmit={handleDeleteImage}
            colorsGradientProps={colorsGradientButtonDelete}
          >
            <Text style={styles.titleButtonDelete}>{i18n._("Delete")}</Text>
          </ButtonCustom>
        </View>
      </View>
    </ModalUniversal>
  );
};
