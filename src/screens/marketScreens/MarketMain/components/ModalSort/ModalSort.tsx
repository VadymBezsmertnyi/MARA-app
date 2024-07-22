import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Trans } from "@lingui/macro";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// components
import { ModalWindow } from "../../../../../components/ModalWindow/ModalWindow";

// icons
import { IconClose } from "../../../../../icons/components";

// styles
import { styles } from "./ModalSort.styles";
import colors from "../../../../../../styles/colors";

type ModalSortProps = {
  isOpen: boolean;
  onClose: () => void;
  setTypeSort: (type: "latest" | "cheapest" | "expensive") => void;
};

export const ModalSort: FunctionComponent<ModalSortProps> = ({
  isOpen,
  onClose,
  setTypeSort,
}) => {
  const { i18n } = useLocalesProvider();

  if (!isOpen) return null;
  return (
    <ModalWindow onClose={onClose}>
      <Shadow stretch>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <TouchableOpacity
              accessibilityLabel={i18n._("Button for closing the modal window")}
              onPress={onClose}
              style={styles.buttonClose}
            >
              <IconClose width={24} height={24} fill={colors.blackCoffee} />
            </TouchableOpacity>
          </View>
          <View style={styles.containerButtons}>
            <TouchableOpacity
              onPress={() => {
                setTypeSort("latest");
              }}
              style={styles.button}
            >
              <Text style={styles.titleButton}>
                <Trans>Latest</Trans>
              </Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity
              onPress={() => {
                setTypeSort("cheapest");
              }}
              style={styles.button}
            >
              <Text style={styles.titleButton}>
                <Trans>Cheapest</Trans>
              </Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity
              onPress={() => {
                setTypeSort("expensive");
              }}
              style={styles.button}
            >
              <Text style={styles.titleButton}>
                <Trans>Most expensive</Trans>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Shadow>
    </ModalWindow>
  );
};
