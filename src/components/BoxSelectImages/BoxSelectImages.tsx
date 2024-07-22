import React, { FunctionComponent, useMemo } from "react";
import { Text, View, ViewStyle } from "react-native";

// types
import { ImageType } from "../ImageModal/ImageModal.types";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// components
import { ImagesSelect } from "../ImagesSelect/ImagesSelect";

// styles
import { styles } from "./BoxSelectImages.styles";

type BoxSelectImagesProps = {
  isRegular?: boolean;
  images: ImageType[];
  setImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
  isSubTitle?: boolean;
  containerStyle?: ViewStyle;
};

export const BoxSelectImages: FunctionComponent<BoxSelectImagesProps> = ({
  isRegular = false,
  images,
  setImages,
  isSubTitle = false,
  containerStyle,
}) => {
  const { i18n } = useLocalesProvider();

  const containerStyles = useMemo(
    () => [styles.container, containerStyle],
    [containerStyle]
  );

  return (
    <View style={containerStyles}>
      <Text style={styles.title}>
        {i18n._("Add a photo")}
        {isRegular ? (
          <>
            :<Text style={styles.labelRegular}>*</Text>
          </>
        ) : (
          ":"
        )}
      </Text>
      {isSubTitle ? (
        <Text style={styles.subTitle}>
          {i18n._("The first photo will be on the cover of the advertisement.")}
        </Text>
      ) : null}
      <ImagesSelect images={images} setImages={setImages} />
    </View>
  );
};
