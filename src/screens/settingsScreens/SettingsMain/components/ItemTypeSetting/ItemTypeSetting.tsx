import React, { FunctionComponent, useContext, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";

// styles
import { styles } from "./ItemTypeSetting.styles";
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";

type ItemTypeSettingProps = {
  title: string;
  amountUsed: number;
  amountAvailable: number;
  amountAvailableTitle: string;
  onPressView: () => void;
  onPressAdd: () => void;
  onPressBuy: () => void;
};
const ItemTypeSetting: FunctionComponent<ItemTypeSettingProps> = ({
  title,
  amountUsed = 0,
  amountAvailable = 0,
  amountAvailableTitle = "0(0)",
  onPressView,
  onPressAdd,
  onPressBuy,
}) => {
  const { i18n } = useContext(localesContext);
  const isAvailable = useMemo(() => amountAvailable > 0, [amountAvailable]);

  const onPress = isAvailable ? onPressAdd : onPressBuy;

  return (
    <View style={styles.container}>
      {isAvailable ? (
        <TouchableOpacity onPress={onPressAdd} style={styles.containerLine}>
          <Text style={styles.titleFirstLine}>{title}</Text>
          <View>
            <Text style={styles.titleButtonFirstLine}>+ {i18n._("Add")}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.containerLine}>
          <Text style={styles.titleFirstLine}>{title}</Text>
          <View>
            <ButtonCustom
              title={i18n._("Buy additionally")}
              onSubmit={onPressBuy}
              styleContainer={styles.buttonBusinessLogo}
              styleTitle={styles.titleButtonBusinessLogo}
            />
          </View>
        </View>
      )}
      <View style={styles.containerLine}>
        <Text style={styles.titleMiddleLine}>
          {i18n._("Expended: {amountUsed}", { amountUsed })}
        </Text>
        <Text style={styles.titleMiddleLine}>
          {i18n._("Available: {amountAvailable}", {
            amountAvailable: amountAvailableTitle,
          })}
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
