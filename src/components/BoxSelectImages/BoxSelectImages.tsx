import React, { FunctionComponent, useContext, useMemo } from "react";
import { Text, View, ViewStyle } from "react-native";

// types
import { ImageType } from "../ImageModal/ImageModal.types";

// providers
import { localesContext } from "../../../localization/localization.provider";

// components
import { ImagesSelect } from "../ImagesSelect/ImagesSelect";

// styles
import { styles } from "./BoxSelectImages.styles";

type BoxSelectImagesProps = {
  images: ImageType[];
  setImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
  isSubTitle?: boolean;
  containerStyle?: ViewStyle;
};

export const BoxSelectImages: FunctionComponent<BoxSelectImagesProps> = ({
  images,
  setImages,
  isSubTitle = false,
  containerStyle,
}) => {
  const { i18n } = useContext(localesContext);

  const containerStyles = useMemo(
    () => [styles.container, containerStyle],
    [containerStyle]
  );

  return (
    <View style={containerStyles}>
      <Text style={styles.title}>{i18n._("Add a photo")}:</Text>
      {isSubTitle ? (
        <Text style={styles.subTitle}>
          {i18n._("The first photo will be on the cover of the advertisement.")}
        </Text>
      ) : null}
      <ImagesSelect images={images} setImages={setImages} />
    </View>
  );
};
