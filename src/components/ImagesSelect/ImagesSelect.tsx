import React, { FunctionComponent, useState } from "react";
import { TouchableOpacity, View, FlatList } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

// types
import { ImageFileType } from "../../storeRedux/types";

// providers
import { useLoadingProvider } from "../../providers/LoadingProvider/LoadingProvider";

// components
import { IconAddEvent } from "../../icons/components";
import { ImageCache } from "../ImageCache/ImageCache";
import { ImageViewerModal } from "../ImageViewerModal/ImageViewerModal";

// helps
import { compressToMaxSize } from "../../helps/compressImage";

// styles
import { styles } from "./ImagesSelect.styles";

type ImagesEventProps = {
  images: ImageFileType[];
  setImages: React.Dispatch<React.SetStateAction<ImageFileType[]>>;
  maxImages?: number;
};

export const ImagesSelect: FunctionComponent<ImagesEventProps> = ({
  images,
  setImages,
  maxImages = 6,
}) => {
  const { setLoading } = useLoadingProvider();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const pickImage = async () => {
    const existingImages = images.filter((img) => img._id);
    const newImages = images.filter((img) => !img._id);
    const availableSlots = maxImages - existingImages.length;
    const remainingSlots = availableSlots - newImages.length;
    if (remainingSlots <= 0) {
      Toast.show({
        type: "info",
        text1: `You can only add up to ${maxImages} images.`,
      });
      return;
    }

    setLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
        selectionLimit: remainingSlots,
      });

      if (!result.canceled && result.assets.length > 0) {
        const compressedAssets = await Promise.all(
          result.assets.map(async (asset) => {
            const compressResult = await compressToMaxSize(asset.uri);
            return {
              ...asset,
              url: compressResult.uri,
              uri: compressResult.uri,
              width: compressResult.width ?? asset.width,
              height: compressResult.height ?? asset.height,
            };
          })
        );

        setImages((state) => {
          const existingImages = state.filter((img) => img._id);
          const currentNewImages = state.filter((img) => !img._id);
          const totalNewImages = [...currentNewImages, ...compressedAssets];
          const maxNewImages = maxImages - existingImages.length;
          return [...existingImages, ...totalNewImages.slice(0, maxNewImages)];
        });
      }
    } catch (error) {
      console.warn("[ImagesSelect] Error picking images:", error);
    } finally {
      setLoading(false);
    }
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
    if (images.length >= maxImages) return null;

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
