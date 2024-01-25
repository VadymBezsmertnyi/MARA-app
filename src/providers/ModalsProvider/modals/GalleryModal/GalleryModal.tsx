import React, { FunctionComponent, useContext, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Gallery from "react-native-awesome-gallery";

// providers
import { themeContext } from "../../../ThemeProvider/ThemeProvider";

// icons
import { IconArrowLeftEvent } from "../../../../icons/components";

// styles
import { styles } from "./GalleryModal.styles";
import colors from "../../../../../styles/colors";
import { ImageCache } from "../../../../components/ImageCache/ImageCache";
import { Trans } from "@lingui/macro";

type GalleryModalProps = {
  data: { images: string[]; indexImage?: number };
  onClose: () => void;
};

export const GalleryModal: FunctionComponent<GalleryModalProps> = ({
  data,
  onClose,
}) => {
  const { heightStatusBar } = useContext(themeContext);

  const containerHeaderStyles = useMemo(
    () => [styles.containerHeader, { paddingTop: heightStatusBar + 4 }],
    [heightStatusBar]
  );

  return (
    <View style={styles.container}>
      <Gallery
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
      />
      <View style={containerHeaderStyles}>
        <TouchableOpacity onPress={onClose} style={styles.buttonBack}>
          <IconArrowLeftEvent
            width={24}
            height={24}
            stroke={colors.blackCoffee}
            strokeWidth={2}
          />
          <Text style={styles.buttonTitle}>
            <Trans>Back</Trans>
          </Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          <Trans>Gallery</Trans>
        </Text>
        <View style={styles.containerEmpty} />
      </View>
    </View>
  );
};
