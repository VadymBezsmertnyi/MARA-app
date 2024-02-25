import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useState,
} from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Trans } from "@lingui/macro";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";

// components
import { ModalWindow } from "../../../../../components/ModalWindow/ModalWindow";
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";

// icons
import {
  IconAppleAppStore,
  IconClose,
  IconGooglePlayStore,
  IconWarningGradient,
} from "../../../../../icons/components";

// styles
import { styles } from "./ModalSelectPlatform.styles";
import colors from "../../../../../../styles/colors";

type ModalSelectPlatformProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (platform: "android" | "ios") => void;
};

export const ModalSelectPlatform: FunctionComponent<
  ModalSelectPlatformProps
> = ({ isOpen, onClose, onSelect }) => {
  const { i18n } = useContext(localesContext);
  const [focusPlatform, setFocusPlatform] = useState<"android" | "ios" | null>(
    null
  );

  const titleButton = useCallback(
    (isFocus: boolean) => [
      styles.titleButton,
      isFocus && { color: colors.white },
    ],
    []
  );

  return (
    <Modal visible={isOpen} transparent>
      <ModalWindow onClose={onClose}>
        <Shadow stretch>
          <View style={styles.container}>
            <View style={styles.containerClose}>
              <TouchableOpacity
                accessibilityLabel={i18n._(
                  "Button for closing the modal window"
                )}
                onPress={onClose}
              >
                <IconClose width={24} height={24} fill={colors.blackCoffee} />
              </TouchableOpacity>
            </View>
            <IconWarningGradient width={130} height={130} />
            <Text style={styles.titleModal}>
              <Trans>
                What platform do you want to send the app installation
                invitation to?
              </Trans>
            </Text>

            <View style={styles.containerButtons}>
              <ButtonCustom
                type="transparent"
                onSubmit={() => {
                  onSelect("ios");
                }}
                styleContainer={styles.containerButton}
                onPressFocus={(isFocus) => {
                  if (isFocus) setFocusPlatform("ios");
                  else setFocusPlatform(null);
                }}
              >
                <View style={styles.containerBoxButton}>
                  <IconAppleAppStore
                    width={24}
                    height={24}
                    fill={
                      focusPlatform === "ios"
                        ? colors.white
                        : colors.blazeOrange
                    }
                  />
                  <Text style={titleButton(focusPlatform === "ios")}>
                    Apple Store
                  </Text>
                </View>
              </ButtonCustom>
              <ButtonCustom
                type="transparent"
                onSubmit={() => {
                  onSelect("android");
                }}
                styleContainer={styles.containerButton}
                onPressFocus={(isFocus) => {
                  if (isFocus) setFocusPlatform("android");
                  else setFocusPlatform(null);
                }}
              >
                <View style={styles.containerBoxButton}>
                  <IconGooglePlayStore
                    width={24}
                    height={24}
                    fill={
                      focusPlatform === "android"
                        ? colors.white
                        : colors.blazeOrange
                    }
                  />
                  <Text style={titleButton(focusPlatform === "android")}>
                    Google Play
                  </Text>
                </View>
              </ButtonCustom>
            </View>
          </View>
        </Shadow>
      </ModalWindow>
    </Modal>
  );
};
