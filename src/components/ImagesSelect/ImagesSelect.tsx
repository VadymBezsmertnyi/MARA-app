import React, { FunctionComponent, useState } from "react";
import { TouchableOpacity, View, FlatList } from "react-native";
import * as ImagePicker from "expo-image-picker";

// types
import { ImageFileType } from "../../storeRedux/types";

// providers
import { useLoadingProvider } from "../../providers/LoadingProvider/LoadingProvider";

// components
import { IconAddEvent } from "../../icons/components";
import { ImageCache } from "../ImageCache/ImageCache";
import { ImageViewerModal } from "../ImageViewerModal/ImageViewerModal";

// styles
import { styles } from "./ImagesSelect.styles";

type ImagesEventProps = {
  images: ImageFileType[];
  setImages: React.Dispatch<React.SetStateAction<ImageFileType[]>>;
};

export const ImagesSelect: FunctionComponent<ImagesEventProps> = ({
  images,
  setImages,
}) => {
  const { setLoading } = useLoadingProvider();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const pickImage = async () => {
    setLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => ({
        ...asset,
        url: asset.uri,
      }));

      setImages((state) => {
        const combined = [...state, ...newImages];
        // Забезпечуємо, що не більше 6 фото
        return combined.slice(0, 6);
      });
    }

    setLoading(false);
  };

  const handleImagePress = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseViewer = () => {
    setSelectedImageIndex(null);
  };

  const handleUpdateImages = (updatedImages: ImageFileType[]) => {
    setImages(updatedImages);
  };

  const renderAddButton = () => {
    if (images.length >= 6) return null;

    return (
      <TouchableOpacity onPress={pickImage} style={styles.addButton}>
        <IconAddEvent width={56} height={56} />
      </TouchableOpacity>
    );
  };

  const renderImageThumbnail = (image: ImageFileType, index: number) => {
    return (
      <TouchableOpacity
        key={`image-thumbnail-${index}`}
        onPress={() => handleImagePress(index)}
      >
        <ImageCache
          contentFit="contain"
          imageSrc={image.url}
          style={styles.image}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          data={images}
          renderItem={({ item, index }) => renderImageThumbnail(item, index)}
          keyExtractor={(_, index) => `image-${index}`}
          ListHeaderComponent={renderAddButton}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>

      {selectedImageIndex !== null && (
        <ImageViewerModal
          images={images}
          initialIndex={selectedImageIndex}
          onClose={handleCloseViewer}
          onUpdateImages={handleUpdateImages}
        />
      )}
    </>
  );
};
