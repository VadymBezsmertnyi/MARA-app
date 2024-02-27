import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Trans } from "@lingui/macro";

// providers
import { userContext } from "../../../../../providers/UserProvider/UserProvider";
import { localesContext } from "../../../../../../localization/localization.provider";
import { themeContext } from "../../../../../providers/ThemeProvider/ThemeProvider";

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
  const { i18n } = useContext(localesContext);
  const { heightStatusBar } = useContext(themeContext);
  const { userData, editUser } = useContext(userContext);
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
    const isGeoLocation = !(userData?.isGeoLocation || false);
    await editUser({
      isGeoLocation,
    });
  };

  return (
    <Modal visible={isOpen} transparent>
      <View style={containerStyles}>
        <View style={styles.containerHeader}>
          <View style={styles.boxHeaderEmpty} />
          <Text style={styles.titleHeader}>
            <Trans>Notification of SOS signal</Trans>
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
            <Trans>
              To receive SOS signals, set up the radius of signal reception from
              the center of your city:
            </Trans>
          </Text>
          <Input
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
              <Trans>Notification of SOS signal</Trans>
            </Text>
            <Checkbox
              accessibilityLabel={i18n._("Toggle notification of SOS signal")}
              check={false}
              setCheck={onToggleLocation}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
