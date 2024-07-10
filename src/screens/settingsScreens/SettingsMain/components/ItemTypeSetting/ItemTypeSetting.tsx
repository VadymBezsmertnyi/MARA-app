import React, { FunctionComponent, useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";

// styles
import { styles } from "./ItemTypeSetting.styles";

type ItemTypeSettingProps = {
  title: string;
  amountUsed: number;
  amountAvailable: number;
  onPressView: () => void;
  onPressAdd: () => void;
};
const ItemTypeSetting: FunctionComponent<ItemTypeSettingProps> = ({
  title,
  amountUsed = 0,
  amountAvailable = 0,
  onPressView,
  onPressAdd,
}) => {
  const { i18n } = useContext(localesContext);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressAdd} style={styles.containerLine}>
        <Text style={styles.titleFirstLine}>{title}</Text>
        <View>
          <Text style={styles.titleButtonFirstLine}>+ {i18n._("Add")}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.containerLine}>
        <Text style={styles.titleMiddleLine}>
          {i18n._("Expended: {amountUsed}", { amountUsed })}
        </Text>
        <Text style={styles.titleMiddleLine}>
          {i18n._("Available: {amountAvailable}", { amountAvailable })}
        </Text>
      </View>
      <TouchableOpacity onPress={onPressView} style={styles.containerLine}>
        <Text>{i18n._("Active")}</Text>
        <View style={styles.buttonEndLine}>
          <View style={styles.containerIconEndLine}>
            <Text style={styles.titleButtonEndLine}>{amountUsed}</Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={12} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemTypeSetting;
