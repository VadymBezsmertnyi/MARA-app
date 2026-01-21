import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

// providers
import { useUserProvider } from "../../../../../providers/UserProvider/UserProvider";
import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import { useThemeProvider } from "../../../../../providers/ThemeProvider/ThemeProvider";

// components
import { Input } from "../../../../../components/Input/Input";
import { Checkbox } from "../../../../../components/Checkbox/Checkbox";

// icons
import { IconClose } from "../../../../../icons/components";

// styles
import { styles } from "./ModalSettingsSos.styles";
import colors from "../../../../../../styles/colors";

type ModalSettingsSosProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalSettingsSos: FunctionComponent<ModalSettingsSosProps> = ({
  isOpen,
  onClose,
}) => {
  const { i18n } = useLocalesProvider();
  const { heightStatusBar } = useThemeProvider();
  const { userData, editUser } = useUserProvider();
  const [radius, setRadius] = useState(0);

  const containerStyles = useMemo(
    () => [
      styles.container,
      {
        paddingTop: heightStatusBar,
      },
    ],
    [heightStatusBar]
  );

  const containerCheckboxStyles = useMemo(
    () => [styles.containerCheckbox, radius === 0 && { opacity: 0.5 }],
    [radius]
  );

  const onToggleLocation = async () => {
    if (userData)
      await editUser({
        settingsSos: {
          radiusKm: radius > 0 ? radius : userData.settingsSos.radiusKm,
          isEnable: !userData.settingsSos.isEnable,
        },
      });
  };

  useEffect(() => {
    if (userData?.settingsSos.radiusKm)
      setRadius(userData.settingsSos.radiusKm);
  }, [userData?.settingsSos.radiusKm]);

  return (
    <Modal visible={isOpen} transparent>
      <View style={containerStyles}>
        <View style={styles.containerHeader}>
          <View style={styles.boxHeaderEmpty} />
          <Text style={styles.titleHeader}>
            {i18n._("Notification of SOS signal")}
          </Text>
          <TouchableOpacity
            accessibilityLabel={i18n._(
              "Button for closing the menu settings sos"
            )}
            onPress={onClose}
            style={styles.buttonClose}
          >
            <IconClose width={24} height={24} fill={colors.blackCoffee} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerBody}>
          <Text style={styles.titleBody}>
            {i18n._(
              "To receive SOS signals, set up the radius of signal reception from the center of your city:"
            )}
          </Text>
          <Input
            disabled={userData?.settingsSos.isEnable}
            placeholder={"100"}
            keyboardType="numeric"
            label={i18n._("Radius, km:")}
            value={radius.toString()}
            onChange={(value) => {
              const currentNumber = value.length
                ? Number(Number(value).toFixed())
                : 0;
              if (currentNumber || currentNumber === 0)
                setRadius(currentNumber);
            }}
            containerStyle={styles.containerInput}
            customStyles={styles.input}
            labelStyle={styles.labelInputContacts}
          />
          <TouchableOpacity
            disabled={radius === 0}
            onPress={onToggleLocation}
            style={containerCheckboxStyles}
          >
            <Text numberOfLines={2} style={styles.titleDarkTheme}>
              {i18n._("Notification of SOS signal")}
            </Text>
            <Checkbox
              disabled={radius === 0}
              accessibilityLabel={i18n._("Toggle notification of SOS signal")}
              check={userData?.settingsSos.isEnable || false}
              setCheck={onToggleLocation}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
