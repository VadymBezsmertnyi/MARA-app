import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Trans } from "@lingui/macro";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// icons
import { IconClose } from "../../../../../icons/components";

// styles
import { styles } from "./ModalSort.styles";
import colors from "../../../../../../styles/colors";

type ModalSortProps = {
  onClose: () => void;
  setTypeSort: (type: "distance" | "rating" | "comments") => void;
};

export const ModalSort: FunctionComponent<ModalSortProps> = ({
  onClose,
  setTypeSort,
}) => {
  const { i18n } = useLocalesProvider();

  return (
    <Shadow>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <TouchableOpacity
            accessibilityLabel={i18n._("Button for closing the modal window")}
            onPress={onClose}
          >
            <IconClose width={24} height={24} fill={colors.blackCoffee} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerButtons}>
          <TouchableOpacity
            onPress={() => {
              setTypeSort("distance");
            }}
          >
            <Text style={styles.titleButton}>
              <Trans>By distance:</Trans>
            </Text>
            <Text style={styles.subTitleButton}>
              <Trans>from closest to farthest</Trans>
            </Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => {
              setTypeSort("rating");
            }}
          >
            <Text style={styles.titleButton}>
              <Trans>By rating:</Trans>
            </Text>
            <Text style={styles.subTitleButton}>
              <Trans>from highest to lowest</Trans>
            </Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => {
              setTypeSort("comments");
            }}
          >
            <Text style={styles.titleButton}>
              <Trans>By number of comments:</Trans>
            </Text>
            <Text style={styles.subTitleButton}>
              <Trans>from highest to lowest</Trans>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Shadow>
  );
};
