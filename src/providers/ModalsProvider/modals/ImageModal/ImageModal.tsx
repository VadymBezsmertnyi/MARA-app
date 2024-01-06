import React, { FunctionComponent } from "react";
import { View } from "react-native";

// types
import { ImageModalType } from "../../ModalsProvider.types";

// components
import { ImageCache } from "../../../../components/ImageCache/ImageCache";

// styles
import { styles } from "./ImageModal.styles";

type ImageModalProps = {
  image: ImageModalType | null;
};

export const ImageModal: FunctionComponent<ImageModalProps> = ({ image }) => {
  if (!image) return null;
  return (
    <View style={styles.container}>
      <ImageCache
        imageSrc={`data:image/jpeg;base64,${image.base64}`}
        style={styles.image}
      />
    </View>
  );
};
