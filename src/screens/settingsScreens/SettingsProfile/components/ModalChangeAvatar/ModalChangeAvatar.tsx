import React, { FunctionComponent, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

// redux
import { useUserSelector } from "../../../../../storeRedux/apis/user/slice";
import { useEditUserMutation } from "../../../../../storeRedux/api";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import {
  useDropDownAlertProvider,
  DropdownAlertType,
} from "../../../../../providers/DropDownAlertProvider/DropDownAlertProvider";

// components
import { ModalWindow } from "../../../../../components/ModalWindow/ModalWindow";
import { IconClose, IconProfileAvatar } from "../../../../../icons/components";
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";
import { ImageCache } from "../../../../../components/ImageCache/ImageCache";

// styles
import { styles } from "./ModalChangeAvatar.styles";
import colors from "../../../../../../styles/colors";

type ModalChangeAvatarProps = {
  onClose: () => void;
};

export const ModalChangeAvatar: FunctionComponent<ModalChangeAvatarProps> = ({
  onClose,
}) => {
  const { messageFromServer } = useDropDownAlertProvider();
  const { i18n } = useLocalesProvider();
  const { userData } = useUserSelector();
  const [editUserMutation] = useEditUserMutation();

  const avatarSource = useMemo(
    () => userData?.avatarFile?.url || null,
    [userData?.avatarFile?.url]
  );

  const onChangeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && userData) {
      const resultUpdate = await editUserMutation({
        body: { avatarFile: result.assets[0] },
        existingUserData: userData,
      });

      if (resultUpdate.data?.userData) {
        messageFromServer(
          i18n._("The photo has been changed"),
          i18n._("Success"),
          DropdownAlertType.Success
        );
        onClose();
      } else
        messageFromServer(
          i18n._("Sorry, an error occurred"),
          i18n._("Error"),
          DropdownAlertType.Error
        );
    } else
      messageFromServer(
        i18n._("The photo has not been changed"),
        i18n._("Info"),
        DropdownAlertType.Info
      );
  };

  const onDeleteAvatar = async () => {
    if (!userData) return;
    const resultUpdate = await editUserMutation({
      body: { avatarFile: null },
      existingUserData: userData,
    });

    if (resultUpdate.data?.userData) {
      messageFromServer(
        i18n._("The photo has been deleted"),
        i18n._("Success"),
        DropdownAlertType.Success
      );
      onClose();
    } else
      messageFromServer(
        i18n._("Sorry, an error occurred"),
        i18n._("Error"),
        DropdownAlertType.Error
      );
  };

  return (
    <ModalWindow onClose={onClose}>
      <View style={styles.containerModal}>
        <View style={styles.containerClose}>
          <TouchableOpacity
            accessibilityLabel={i18n._("Button for closing the modal window")}
            onPress={onClose}
          >
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
        <View style={styles.containerButtons}>
          <ButtonCustom
            title={i18n._("Delete")}
            onSubmit={onDeleteAvatar}
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
