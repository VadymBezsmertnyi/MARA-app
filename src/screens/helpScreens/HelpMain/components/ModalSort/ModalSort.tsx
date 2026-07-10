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
  setTypeSort: (type: "name" | "category" | "verified") => void;
  currentSort: "name" | "category" | "verified" | null;
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
              setTypeSort("name");
            }}
            style={[
              styles.buttonItem,
              currentSort === "name" && styles.buttonItemSelected,
            ]}
          >
            <Text
              style={[
                styles.titleButton,
                currentSort === "name" && styles.titleButtonSelected,
              ]}
            >
              {i18n._("By name:")}
            </Text>
            <Text
              style={[
                styles.subTitleButton,
                currentSort === "name" && styles.subTitleButtonSelected,
              ]}
            >
              {i18n._("alphabetically")}
            </Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => {
              setTypeSort("category");
            }}
            style={[
              styles.buttonItem,
              currentSort === "category" && styles.buttonItemSelected,
            ]}
          >
            <Text
              style={[
                styles.titleButton,
                currentSort === "category" && styles.titleButtonSelected,
              ]}
            >
              {i18n._("By category:")}
            </Text>
            <Text
              style={[
                styles.subTitleButton,
                currentSort === "category" && styles.subTitleButtonSelected,
              ]}
            >
              {i18n._("grouped by category")}
            </Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => {
              setTypeSort("verified");
            }}
            style={[
              styles.buttonItem,
              currentSort === "verified" && styles.buttonItemSelected,
            ]}
          >
            <Text
              style={[
                styles.titleButton,
                currentSort === "verified" && styles.titleButtonSelected,
              ]}
            >
              {i18n._("By verification:")}
            </Text>
            <Text
              style={[
                styles.subTitleButton,
                currentSort === "verified" && styles.subTitleButtonSelected,
              ]}
            >
              {i18n._("verified first")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Shadow>
  );
};
