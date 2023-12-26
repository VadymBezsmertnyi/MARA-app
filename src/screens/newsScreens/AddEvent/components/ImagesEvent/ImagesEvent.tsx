import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

// components
import {
  IconAddEvent,
  IconArrowLeftEvent,
  IconArrowRightEvent,
} from "../../../../../icons/components";
import { ImageCache } from "../../../../../components/ImageCache/ImageCache";

// helps
import { compressAndProcessImages } from "../../../../../helps/helps";

// styles
import { styles } from "./ImagesEvent.styles";

type ImagesEventProps = {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
};

export const ImagesEvent: FunctionComponent<ImagesEventProps> = ({
  images,
  setImages,
}) => {
  const [showImages, setShowImages] = useState({
    start: 0,
    finish: 3,
  });
  const isBack = useMemo(
    () => showImages.start > 0 && images.length > 3,
    [images, showImages]
  );
  const isNext = useMemo(
    () => showImages.finish < images.length && images.length > 3,
    [images, showImages]
  );
  const styleButtonBack = useMemo(
    () => ({ opacity: isBack ? 1 : 0.3 }),
    [isBack]
  );
  const styleButtonNext = useMemo(
    () => ({ opacity: isNext ? 1 : 0.3 }),
    [isNext]
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const listImages = await compressAndProcessImages(result);
      setImages((state) => [...state, ...listImages]);
    }
  };

  const onBack = () => {
    if (isBack)
      setShowImages((state) => ({
        start: state.start - 1,
        finish: state.finish - 1,
      }));
  };

  const onNext = () => {
    if (isNext)
      setShowImages((state) => ({
        start: state.start + 1,
        finish: state.finish + 1,
      }));
  };

  useEffect(() => {
    if (images.length >= 6) setShowImages({ start: 0, finish: 4 });
  }, [images.length]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={!isBack}
        onPress={onBack}
        style={styleButtonBack}
      >
        <IconArrowLeftEvent width={44} height={44} />
      </TouchableOpacity>
      <View style={styles.list}>
        {images.length < 6 ? (
          <TouchableOpacity onPress={pickImage}>
            <IconAddEvent width={48} height={48} />
          </TouchableOpacity>
        ) : null}
        {images
          .slice(showImages.start, showImages.finish)
          .map((base64, index) => (
            <ImageCache
              key={`image-event-${index + 1}`}
              imageSrc={`data:image/jpeg;base64,${base64}`}
              style={styles.image}
            />
          ))}
      </View>
      <TouchableOpacity
        disabled={!isNext}
        onPress={onNext}
        style={styleButtonNext}
      >
        <IconArrowRightEvent width={44} height={44} />
      </TouchableOpacity>
    </View>
  );
};
