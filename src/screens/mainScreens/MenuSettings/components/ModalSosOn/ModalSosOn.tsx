import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Trans } from "@lingui/macro";
import { PermissionStatus } from "expo-location";
import { BlurView } from "expo-blur";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";
import { userContext } from "../../../../../providers/UserProvider/UserProvider";
import { mapContext } from "../../../../../providers/MapProvider/MapProvider";

// components
import { ModalWindow } from "../../../../../components/ModalWindow/ModalWindow";
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";
import { Checkbox } from "../../../../../components/Checkbox/Checkbox";
import { Input } from "../../../../../components/Input/Input";
import { InputPhone } from "../../../../../components/InputPhone/InputPhone";
import { Loader } from "../../../../../providers/LoadingProvider/components/Loader/Loader";

// icons
import { IconClose } from "../../../../../icons/components";

// constants
import {
  DEFAULT_CODE_COUNTRY,
  DEFAULT_COUNTRY,
} from "../../../../../constants/inputs.const";

// styles
import { styles } from "./ModalSosOn.styles";
import colors from "../../../../../../styles/colors";

type ModalSosOnProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalSosOn: FunctionComponent<ModalSosOnProps> = ({
  isOpen,
  onClose,
}) => {
  const { i18n } = useContext(localesContext);
  const { userData, editUser } = useContext(userContext);
  const { statusForeground, statusBackground, setPermission, onSendSos } =
    useContext(mapContext);
  const [selectCountryIso, setSelectCountryIso] = useState(DEFAULT_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState(`+${DEFAULT_CODE_COUNTRY}`);
  const [telegram, setTelegram] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isContact = useMemo(
    () => phoneNumber.length > 5 || telegram.length > 3,
    [phoneNumber, telegram]
  );
  const isPermissionLocationForeground = useMemo(
    () => statusForeground === PermissionStatus.GRANTED,
    [statusForeground]
  );
  const isPermissionLocationBackground = useMemo(
    () => statusBackground === PermissionStatus.GRANTED,
    [statusBackground]
  );

  const onPressSos = async () => {
    setIsLoading(true);
    await onSendSos(phoneNumber, telegram, description);
    onClose();
    setIsLoading(false);
  };

  const onToggleLocation = async () => {
    const isGeoLocation = !(userData?.isGeoLocation || false);
    await editUser({
      isGeoLocation,
    });
  };

  useEffect(() => {
    if (userData?.phoneNumber) setPhoneNumber(userData.phoneNumber);
  }, [userData]);

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
            <ScrollView style={styles.containerScroll}>
              <Text style={styles.titleModal}>
                <Trans>Do you want to send an SOS signal?</Trans>
              </Text>
              <View style={styles.containerPermissionsInfo}>
                <View style={styles.linePermissionsInfo}>
                  <Text numberOfLines={2} style={styles.titlePermissionsInfo}>
                    <Trans>
                      Access to geolocation when using the application
                    </Trans>
                  </Text>
                  <View
                    style={
                      isPermissionLocationForeground
                        ? styles.pointOn
                        : styles.pointOff
                    }
                  />
                </View>
                <View style={styles.linePermissionsInfo}>
                  <Text numberOfLines={2} style={styles.titlePermissionsInfo}>
                    <Trans>Access to geolocation in the background mode</Trans>
                  </Text>
                  <View
                    style={
                      isPermissionLocationBackground
                        ? styles.pointOn
                        : styles.pointOff
                    }
                  />
                </View>
                <TouchableOpacity
                  onPress={onToggleLocation}
                  style={styles.containerCheckbox}
                >
                  <Text numberOfLines={2} style={styles.titleDarkTheme}>
                    <Trans>Automatically detect location</Trans>
                  </Text>
                  <Checkbox
                    accessibilityLabel={i18n._(
                      "Toggle automatically detect location"
                    )}
                    check={userData?.isGeoLocation || false}
                    setCheck={onToggleLocation}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.containerInputs}>
                <Input
                  isSelect
                  placeholder={i18n._("@fgt_com")}
                  label={i18n._("Your telegram")}
                  value={telegram}
                  onChange={setTelegram}
                  labelStyle={styles.labelInputContacts}
                  containerStyle={styles.containerInput}
                />
                <InputPhone
                  label={i18n._("Phone number:")}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  selectCountryIso={selectCountryIso}
                  setSelectCountryIso={setSelectCountryIso}
                  labelStyle={styles.labelInputContacts}
                  containerStyle={styles.containerInput}
                  errorStyle={styles.errorStyleInput}
                />
                <Input
                  placeholder={i18n._("Add a description")}
                  label={i18n._("Description")}
                  value={description}
                  onChange={setDescription}
                  containerStyle={styles.containerInput}
                  labelStyle={styles.labelInputContacts}
                />
              </View>
              <View style={styles.containerButtons}>
                <ButtonCustom
                  type="transparent"
                  title={i18n._("Cancel")}
                  onSubmit={onClose}
                  styleContainer={styles.button}
                />
                {isPermissionLocationForeground &&
                isPermissionLocationBackground ? (
                  <ButtonCustom
                    disabled={
                      !isPermissionLocationForeground ||
                      !isPermissionLocationBackground ||
                      !userData?.isGeoLocation ||
                      !isContact
                    }
                    title={i18n._("On SOS")}
                    onSubmit={onPressSos}
                    styleContainer={styles.button}
                  />
                ) : (
                  <ButtonCustom
                    title={i18n._("Check permissions")}
                    onSubmit={setPermission}
                    styleContainer={styles.button}
                  />
                )}
              </View>
              <View>
                <Text style={styles.titleInf}>
                  <Trans>Settings and permissions should be enabled</Trans>
                </Text>
                <Text style={styles.titleInf}>
                  <Trans>Will automatically turn off after 20-30 minutes</Trans>
                </Text>
              </View>
            </ScrollView>
          </View>
        </Shadow>
        {isLoading ? (
          <BlurView intensity={10} style={styles.containerLoading}>
            <Loader />
          </BlurView>
        ) : null}
      </ModalWindow>
    </Modal>
  );
};
