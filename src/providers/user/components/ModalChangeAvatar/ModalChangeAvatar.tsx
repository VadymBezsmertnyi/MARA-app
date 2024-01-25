import React, { FunctionComponent, useContext, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Trans } from "@lingui/macro";
import * as ImagePicker from "expo-image-picker";

// types
import { UserDataT } from "../../user.types";

// providers
import { localesContext } from "../../../../../localization/localization.provider";

// helps
import showErrors from "../../../../helps/errors/showError";
import { compressAndProcessImages } from "../../../../helps/helps";

// components
import { ModalWindow } from "../../../../components/ModalWindow/ModalWindow";
import { IconClose, IconProfileAvatar } from "../../../../icons/components";
import { ButtonCustom } from "../../../../components/ButtonCustom/ButtonCustom";
import { ImageCache } from "../../../../components/ImageCache/ImageCache";

// styles
import { styles } from "./ModalChangeAvatar.styles";
import colors from "../../../../../styles/colors";

type ModalChangeAvatarProps = {
  userData: UserDataT | null;
  onClose: () => void;
  editUser: (
    newInfoUser: Record<
      string,
      string | number | boolean | Record<string, any> | null
    >
  ) => Promise<boolean>;
};

export const ModalChangeAvatar: FunctionComponent<ModalChangeAvatarProps> = ({
  userData,
  onClose,
  editUser,
}) => {
  const { i18n } = useContext(localesContext);
  const { warning, success } = showErrors;
  const avatarSource = useMemo(
    () => userData?.avatar?.url || null,
    [userData?.avatar?.url]
  );

  const onChangeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const compressImages = await compressAndProcessImages(result);
      const resultUpdate = await editUser({
        avatar: {
          ...userData?.avatar,
          image: compressImages[0],
        },
      });

      if (!resultUpdate) warning(i18n._("Sorry, an error occurred"));
      else {
        success(i18n._("The photo has been changed"));
        onClose();
      }
    } else warning(i18n._("Sorry, an error occurred"));
  };

  return (
    <ModalWindow onClose={onClose}>
      <View style={styles.containerModal}>
        <View style={styles.containerClose}>
          <TouchableOpacity onPress={onClose}>
            <IconClose width={24} height={24} fill={colors.blackCoffee} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerImage}>
          {avatarSource ? (
            <ImageCache style={styles.containerImage} imageSrc={avatarSource} />
          ) : (
            <IconProfileAvatar width={160} height={160} />
          )}
        </View>
        <Text style={styles.titleModal}>
          <Trans>Are you sure you want to delete?</Trans>
        </Text>
        <View style={styles.containerButtons}>
          <ButtonCustom
            title={i18n._("Delete")}
            onSubmit={() => {
              editUser({ avatar: null });
              onClose();
            }}
            type="transparent"
            styleContainer={styles.buttonModal}
          />
          <ButtonCustom
            title={i18n._("Change")}
            onSubmit={onChangeAvatar}
            styleContainer={styles.buttonModal}
          />
        </View>
      </View>
    </ModalWindow>
  );
};
