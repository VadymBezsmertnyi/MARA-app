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
  currentSort: "comments" | "distance" | "rating" | null;
};

export const ModalSort: FunctionComponent<ModalSortProps> = ({
  onClose,
  setTypeSort,
  currentSort,
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
            style={[
              styles.buttonItem,
              currentSort === "distance" && styles.buttonItemSelected,
            ]}
          >
            <Text
              style={[
                styles.titleButton,
                currentSort === "distance" && styles.titleButtonSelected,
              ]}
            >
              {i18n._("By distance:")}
            </Text>
            <Text
              style={[
                styles.subTitleButton,
                currentSort === "distance" && styles.subTitleButtonSelected,
              ]}
            >
              {i18n._("from closest to farthest")}
            </Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => {
              setTypeSort("rating");
            }}
            style={[
              styles.buttonItem,
              currentSort === "rating" && styles.buttonItemSelected,
            ]}
          >
            <Text
              style={[
                styles.titleButton,
                currentSort === "rating" && styles.titleButtonSelected,
              ]}
            >
              {i18n._("By rating:")}
            </Text>
            <Text
              style={[
                styles.subTitleButton,
                currentSort === "rating" && styles.subTitleButtonSelected,
              ]}
            >
              {i18n._("from highest to lowest")}
            </Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => {
              setTypeSort("comments");
            }}
            style={[
              styles.buttonItem,
              currentSort === "comments" && styles.buttonItemSelected,
            ]}
          >
            <Text
              style={[
                styles.titleButton,
                currentSort === "comments" && styles.titleButtonSelected,
              ]}
            >
              {i18n._("By number of comments:")}
            </Text>
            <Text
              style={[
                styles.subTitleButton,
                currentSort === "comments" && styles.subTitleButtonSelected,
              ]}
            >
              {i18n._("from highest to lowest")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Shadow>
  );
};
