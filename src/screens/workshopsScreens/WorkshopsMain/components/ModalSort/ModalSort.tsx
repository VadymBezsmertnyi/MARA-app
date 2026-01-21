import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

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
            <Text style={styles.titleButton}>{i18n._("By distance:")}</Text>
            <Text style={styles.subTitleButton}>
              {i18n._("from closest to farthest")}
            </Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => {
              setTypeSort("rating");
            }}
          >
            <Text style={styles.titleButton}>{i18n._("By rating:")}</Text>
            <Text style={styles.subTitleButton}>
              {i18n._("from highest to lowest")}
            </Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => {
              setTypeSort("comments");
            }}
          >
            <Text style={styles.titleButton}>
              {i18n._("By number of comments:")}
            </Text>
            <Text style={styles.subTitleButton}>
              {i18n._("from highest to lowest")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Shadow>
  );
};
