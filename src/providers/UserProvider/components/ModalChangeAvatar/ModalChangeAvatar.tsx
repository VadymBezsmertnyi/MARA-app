import React, { FunctionComponent, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

// types
import { UserDataT } from "../../UserProvider.types";

// providers
import { useLocalesProvider } from "../../../../../localization/localization.provider";
import {
  useDropDownAlertProvider,
  DropdownAlertType,
} from "../../../DropDownAlertProvider/DropDownAlertProvider";

// helps
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
  const { messageFromServer } = useDropDownAlertProvider();
  const { i18n } = useLocalesProvider();
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

      if (!resultUpdate)
        messageFromServer(
          i18n._("Sorry, an error occurred"),
          "Error",
          DropdownAlertType.Error
        );
      else {
        messageFromServer(
          i18n._("The photo has been changed"),
          "Success",
          DropdownAlertType.Info
        );
        onClose();
      }
    } else
      messageFromServer(
        i18n._("The photo has not been changed"),
        "Info",
        DropdownAlertType.Info
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
