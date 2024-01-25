import React, { FunctionComponent, useContext, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import Gallery from "react-native-awesome-gallery";

// providers
import { themeContext } from "../../../ThemeProvider/ThemeProvider";

// icons
import { IconClose } from "../../../../icons/components";

// styles
import { styles } from "./GalleryModal.styles";

type GalleryModalProps = {
  data: { images: string[]; indexImage?: number };
  onClose: () => void;
};

export const GalleryModal: FunctionComponent<GalleryModalProps> = ({
  data,
  onClose,
}) => {
  const { heightStatusBar } = useContext(themeContext);

  const containerCloseStyles = useMemo(
    () => [styles.containerClose, { paddingTop: heightStatusBar }],
    [heightStatusBar]
  );

  return (
    <View style={styles.container}>
      <Gallery data={data.images} loop initialIndex={data.indexImage} />
      <View style={containerCloseStyles}>
        <TouchableOpacity onPress={onClose} style={styles.buttonClose}>
          <IconClose width={32} height={32} fill="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
