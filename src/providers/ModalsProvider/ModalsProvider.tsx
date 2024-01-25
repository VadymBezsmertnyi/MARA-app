import { BlurView } from "expo-blur";
import React, { FunctionComponent, useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";

// types
import { ImageModalType, ModalTypes } from "./ModalsProvider.types";

// components
import { ImageModal } from "./modals/ImageModal/ImageModal";
import { GalleryModal } from "./modals/GalleryModal/GalleryModal";

// styles
import { styles } from "./ModalsProvider.styles";

type ModalsProviderType = {
  children: JSX.Element;
};

type ModalsContext = {
  setModalType: React.Dispatch<React.SetStateAction<ModalTypes | null>>;
  image: ImageModalType | null;
  setImage: React.Dispatch<React.SetStateAction<ImageModalType | null>>;
  isDelete: boolean;
  onClose: () => void;
  isMain: boolean;
  setIsMain: React.Dispatch<React.SetStateAction<boolean>>;
  setImages: React.Dispatch<
    React.SetStateAction<{
      images: string[];
      indexImage?: number | undefined;
    } | null>
  >;
};

export const modalsContext = React.createContext({} as ModalsContext);

export const ModalsProvider: FunctionComponent<ModalsProviderType> = ({
  children,
}) => {
  const [modalType, setModalType] = useState<ModalTypes | null>(null);
  const [image, setImage] = useState<ImageModalType | null>(null);
  const [images, setImages] = useState<{
    images: string[];
    indexImage?: number;
  } | null>(null);
  const [isDelete, setIsDelete] = useState(false);
  const [isMain, setIsMain] = useState(false);

  const onClose = () => {
    setModalType(null);
    setImage(null);
    setIsDelete(false);
    setIsMain(false);
    setImages(null);
  };

  const showModal = useMemo(() => {
    if (modalType === "image")
      return (
        <ImageModal
          imageInfo={image}
          setIsDelete={setIsDelete}
          onClose={onClose}
          setIsMain={setIsMain}
        />
      );
    if (modalType === "gallery" && images)
      return <GalleryModal data={images} onClose={onClose} />;
    return null;
  }, [modalType, image]);

  const contextValue: ModalsContext = useMemo(
    () => ({
      setModalType,
      image,
      setImage,
      isDelete,
      onClose,
      isMain,
      setIsMain,
      setImages,
    }),
    [isDelete, image, isMain]
  );

  return (
    <modalsContext.Provider value={contextValue}>
      {children}
      {showModal !== null ? (
        <View style={styles.container}>
          <TouchableOpacity style={styles.footerButton} onPress={onClose}>
            <BlurView intensity={15} style={styles.footerButtonBlurView} />
          </TouchableOpacity>
          {showModal}
        </View>
      ) : null}
    </modalsContext.Provider>
  );
};
