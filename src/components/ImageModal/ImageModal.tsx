import React, { FunctionComponent, useMemo } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

// types
import { ImageModalType } from "./ImageModal.types";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// components
import { ImageCache } from "../ImageCache/ImageCache";
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";

// helps
import { getRightSizeImage } from "../../helps/helps";

// icons
import { IconClose } from "../../icons/components";

// styles
import { styles } from "./ImageModal.styles";
import colors from "../../../styles/colors";

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
  const { i18n } = useLocalesProvider();
  const isMain = imageInfo?.index === 0;
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
    <Modal
      visible={Boolean(imageInfo)}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
          style={styles.modalContent}
        >
          <Shadow stretch>
            <View style={styles.container}>
              <View style={styles.containerHeader}>
                <View />
                <Text style={styles.titleHeader}>
                  {i18n._("Photo {numberPhoto}", {
                    numberPhoto: imageInfo.index + 1,
                  })}
                </Text>
                <TouchableOpacity
                  accessibilityLabel={i18n._(
                    "Button for closing the modal window"
                  )}
                  onPress={onClose}
                >
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
                      isMain
                        ? i18n._("Main photo")
                        : i18n._("Make the main photo")
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
                      {i18n._("Delete")}
                    </Text>
                  </ButtonCustom>
                </View>
              </View>
            </View>
          </Shadow>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
