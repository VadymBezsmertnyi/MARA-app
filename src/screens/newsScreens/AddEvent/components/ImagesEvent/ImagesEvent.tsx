import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";

// components
import {
  IconAddEvent,
  IconArrowLeftEvent,
  IconArrowRightEvent,
} from "../../../../../icons/components";

// styles
import { styles } from "./ImagesEvent.styles";
import { ImageCache } from "../../../../../components/ImageCache/ImageCache";

type ImagesEventProps = {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
};

export const ImagesEvent: FunctionComponent<ImagesEventProps> = ({
  images,
  setImages,
}) => {
  const { i18n } = useContext(localesContext);
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

  const pickImage = async () => {
    // TODO resize expo-image-manipulator
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      base64: true,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const listImages = result.assets
        .map((image) => image.base64 || "")
        .filter((image) => image.length > 0);
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
        style={{ opacity: isBack ? 1 : 0.3 }}
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
        style={{ opacity: isNext ? 1 : 0.3 }}
      >
        <IconArrowRightEvent width={44} height={44} />
      </TouchableOpacity>
    </View>
  );
};
