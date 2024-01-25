import React, { FunctionComponent, useContext, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Trans } from "@lingui/macro";

// types
import { ImageModalType } from "../../ModalsProvider.types";

// providers
import { localesContext } from "../../../../../localization/localization.provider";
import { themeContext } from "../../../ThemeProvider/ThemeProvider";

// components
import { ImageCache } from "../../../../components/ImageCache/ImageCache";
import { ButtonCustom } from "../../../../components/ButtonCustom/ButtonCustom";

// helps
import { getRightSizeImage } from "../../../../helps/helps";

// icons
import { IconClose } from "../../../../icons/components";

// styles
import { styles } from "./ImageModal.styles";
import colors from "../../../../../styles/colors";

type ImageModalProps = {
  imageInfo: ImageModalType | null;
  setIsDelete: (value: boolean) => void;
  setIsMain: (value: boolean) => void;
  onClose: () => void;
};

export const ImageModal: FunctionComponent<ImageModalProps> = ({
  imageInfo,
  setIsDelete,
  setIsMain,
  onClose,
}) => {
  const { i18n } = useContext(localesContext);
  const { heightStatusBar } = useContext(themeContext);
  const isMain = imageInfo?.index === 0;
  const containerStyles = useMemo(
    () => [styles.container, { marginTop: heightStatusBar }],
    [heightStatusBar]
  );
  const imageStyles = useMemo(
    () =>
      imageInfo
        ? [styles.image, getRightSizeImage(imageInfo.image, null, 0.4)]
        : styles.image,
    [imageInfo]
  );
  const colorsGradientButtonDelete: [string, string] = useMemo(
    () => [colors.grayCloudy, colors.grayCloudy],
    []
  );

  if (!imageInfo) return null;
  return (
    <View style={containerStyles}>
      <View style={styles.containerHeader}>
        <View />
        <Text style={styles.titleHeader}>
          {i18n._("Photo {numberPhoto}", { numberPhoto: imageInfo.index + 1 })}
        </Text>
        <TouchableOpacity onPress={onClose}>
          <IconClose width={24} height={24} fill={colors.blackRich} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerBody}>
        <ImageCache
          contentFit={"contain"}
          imageSrc={`data:image/jpeg;base64,${imageInfo.image.base64}`}
          style={imageStyles}
        />
        <View style={styles.containerButtons}>
          <ButtonCustom
            disabled={isMain}
            type={isMain ? "full" : "transparent"}
            title={
              isMain ? i18n._("Main photo") : i18n._("Make the main photo")
            }
            onSubmit={() => {
              setIsMain(true);
            }}
          />
          <ButtonCustom
            type="transparent"
            onSubmit={() => {
              setIsDelete(true);
            }}
            colorsGradientProps={colorsGradientButtonDelete}
          >
            <Text style={styles.titleButtonDelete}>
              <Trans>Delete</Trans>
            </Text>
          </ButtonCustom>
        </View>
      </View>
    </View>
  );
};
