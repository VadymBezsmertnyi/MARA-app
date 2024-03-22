import React, { FunctionComponent, useMemo } from "react";
import { ImageURISource, TouchableOpacity, View } from "react-native";
import { styles } from "./ImageProfile.styles";
import { ImageCache } from "../ImageCache/ImageCache";
import {
  IconPencilGradient,
  IconPlusGradient,
  IconProfileAvatar,
} from "../../icons/components";

type ImageProfileProps = {
  imageSource: ImageURISource | null;
  onChangePhoto: () => void;
  pickImage: () => void;
};

export const ImageProfile: FunctionComponent<ImageProfileProps> = ({
  imageSource,
  onChangePhoto,
  pickImage,
}) => {
  const onPress = useMemo(
    () => (imageSource ? onChangePhoto : pickImage),
    [imageSource]
  );

  return (
    <View style={styles.container}>
      {imageSource ? (
        <ImageCache style={styles.containerImage} imageSrc={imageSource} />
      ) : (
        <IconProfileAvatar />
      )}
      <TouchableOpacity style={styles.buttonPickImage} onPress={onPress}>
        {imageSource ? (
          <IconPencilGradient width={24} height={24} />
        ) : (
          <IconPlusGradient width={24} height={24} />
        )}
      </TouchableOpacity>
    </View>
  );
};
