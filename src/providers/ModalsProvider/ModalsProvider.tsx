import { BlurView } from "expo-blur";
import React, { FunctionComponent, useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";

// types
import { ImageModalType, ModalTypes } from "./ModalsProvider.types";

// components
import { ImageModal } from "./modals/ImageModal/ImageModal";

// styles
import { styles } from "./ModalsProvider.styles";

type ModalsProviderType = {
  children: JSX.Element;
};

type ModalsContext = {
  setModalType: React.Dispatch<React.SetStateAction<"image" | null>>;
  setImage: React.Dispatch<React.SetStateAction<ImageModalType | null>>;
  isDelete: boolean;
};

export const modalsContext = React.createContext({} as ModalsContext);

export const ModalsProvider: FunctionComponent<ModalsProviderType> = ({
  children,
}) => {
  const [modalType, setModalType] = useState<ModalTypes | null>(null);
  const [image, setImage] = useState<ImageModalType | null>(null);
  const [isDelete, setIsDelete] = useState(false);

  const showModal = useMemo(() => {
    if (modalType === "image") return <ImageModal image={image} />;
    return null;
  }, [modalType, image]);

  const onClose = () => {
    setModalType(null);
    setImage(null);
  };

  const contextValue: ModalsContext = useMemo(
    () => ({ setModalType, setImage, isDelete }),
    []
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
