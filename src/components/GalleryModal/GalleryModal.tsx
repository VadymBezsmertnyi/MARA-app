import React, { FunctionComponent, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
//import Gallery from "react-native-awesome-gallery";

// providers
import { useThemeProvider } from "../../providers/ThemeProvider/ThemeProvider";
import { useLocalesProvider } from "../../../localization/localization.provider";

// components
//import { ImageCache } from "../ImageCache/ImageCache";

// icons
import { IconArrowLeftEvent } from "../../icons/components";

// styles
import { styles } from "./GalleryModal.styles";
import colors from "../../../styles/colors";

type GalleryModalProps = {
  data: { images: string[]; indexImage?: number };
  onClose: () => void;
};

export const GalleryModal: FunctionComponent<GalleryModalProps> = ({
  data,
  onClose,
}) => {
  const { i18n } = useLocalesProvider();
  const { heightStatusBar } = useThemeProvider();

  const containerHeaderStyles = useMemo(
    () => [styles.containerHeader, { paddingTop: heightStatusBar + 4 }],
    [heightStatusBar]
  );

  return (
    <View style={styles.container}>
      {/* <Gallery
        data={data.images}
        loop
        initialIndex={data.indexImage}
        style={styles.containerGallery}
        renderItem={(props) => (
          <View style={styles.containerImage}>
            <ImageCache
              imageSrc={props.item}
              contentFit="contain"
              style={StyleSheet.absoluteFillObject}
            />
          </View>
        )}
      /> */}
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
  );
};
