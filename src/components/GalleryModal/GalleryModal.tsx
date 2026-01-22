import React, { FunctionComponent, useMemo, useRef } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel, {
  CarouselRenderItem,
  ICarouselInstance,
} from "react-native-reanimated-carousel";

// providers
import { useThemeProvider } from "../../providers/ThemeProvider/ThemeProvider";
import { useLocalesProvider } from "../../../localization/localization.provider";

// components
import { ImageCache } from "../ImageCache/ImageCache";

// icons
import { IconArrowLeftEvent } from "../../icons/components";

// styles
import { styles } from "./GalleryModal.styles";
import colors from "../../../styles/colors";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type GalleryModalProps = {
  data: { images: string[]; indexImage?: number } | null;
  onClose: () => void;
};

export const GalleryModal: FunctionComponent<GalleryModalProps> = ({
  data,
  onClose,
}) => {
  const { i18n } = useLocalesProvider();
  const { heightStatusBar } = useThemeProvider();
  const carouselRef = useRef<ICarouselInstance>(null);

  const containerHeaderStyles = useMemo(
    () => [styles.containerHeader, { paddingTop: heightStatusBar + 4 }],
    [heightStatusBar]
  );

  const initialIndex = useMemo(() => data?.indexImage ?? 0, [data?.indexImage]);

  const renderItem: CarouselRenderItem<string> = ({ item }) => (
    <View style={styles.containerImage}>
      <ImageCache
        imageSrc={item}
        contentFit="contain"
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );

  if (!data || !data.images || data.images.length === 0) return null;
  return (
    <Modal
      visible={data !== null}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
          style={styles.modalContent}
        >
          <View style={styles.container}>
            <Carousel
              ref={carouselRef}
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              data={data.images}
              renderItem={renderItem}
              loop={data.images.length > 1}
              defaultIndex={initialIndex}
              style={styles.containerGallery}
            />
            <View style={containerHeaderStyles}>
              <TouchableOpacity onPress={onClose} style={styles.buttonBack}>
                <IconArrowLeftEvent
                  width={24}
                  height={24}
                  stroke={colors.blackCoffee}
                  strokeWidth={2}
                />
                <Text style={styles.buttonTitle}>{i18n._("Back")}</Text>
              </TouchableOpacity>
              <Text style={styles.title}>{i18n._("Gallery")}</Text>
              <View style={styles.containerEmpty} />
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
