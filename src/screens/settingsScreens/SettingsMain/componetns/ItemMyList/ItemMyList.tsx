import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";
import {
  ArrowLeft,
  IconArrowRightEvent,
  IconArrowRightNew,
  IconArrowRightStroke,
  IconPlus,
} from "../../../../../icons/components";
import colors from "../../../../../../styles/colors";
import { styles } from "./ItemMyList.styles";

type ItemMyListProps = {
  title: string;
  titleButton: string;
  onLinkTo: () => void;
  onAdd: () => void;
};

export const ItemMyList: FunctionComponent<ItemMyListProps> = ({
  title,
  titleButton,
  onLinkTo,
  onAdd,
}) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.buttonTo} onPress={onLinkTo}>
      <Text style={styles.titleTo}>{title}</Text>
      <IconArrowRightStroke width={9} height={16} stroke={colors.blackCoffee} />
    </TouchableOpacity>
    <ButtonCustom onSubmit={onAdd}>
      <View style={styles.buttonAdd}>
        <IconPlus width={16} height={16} fill={colors.white} />
        <Text style={styles.titleAdd}>{titleButton}</Text>
      </View>
    </ButtonCustom>
  </View>
);
