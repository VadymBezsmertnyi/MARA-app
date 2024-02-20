import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

// components
import { ModalWindow } from "../../../../../components/ModalWindow/ModalWindow";

// icons
import { IconClose } from "../../../../../icons/components";

// styles
import { styles } from "./ModalSort.styles";
import colors from "../../../../../../styles/colors";
import { Trans } from "@lingui/macro";

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
  if (!isOpen) return null;
  return (
    <ModalWindow onClose={onClose}>
      <Shadow stretch>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <TouchableOpacity onPress={onClose} style={styles.buttonClose}>
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
