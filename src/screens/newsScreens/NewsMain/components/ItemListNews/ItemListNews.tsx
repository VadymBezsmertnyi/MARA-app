import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootNewsScreensParamList } from "../../../../../navigators/Navigators.types";

// hooks
import { formatDateFromUnixTimestamp } from "../../../../../helps/helps";

// constants
import { PATHS_NEWS_SCREENS } from "../../../../../navigators/useNavigator.constants";

// components
import { IconArrowRightNew } from "../../../../../icons/components";

// styles
import { styles } from "./ItemListNews.styles";

type ItemListNewsProps = {
  newId: number;
  title: string;
  date: number;
  navigation: NativeStackNavigationProp<RootNewsScreensParamList>;
};

export const ItemListNews: FunctionComponent<ItemListNewsProps> = ({
  newId,
  title,
  date,
  navigation,
}) => {
  const selectNew = () => {
    navigation.navigate(PATHS_NEWS_SCREENS.newItem, { newId });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={selectNew}>
      <View style={styles.containerTitles}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{formatDateFromUnixTimestamp(date)}</Text>
      </View>
      <View>
        <IconArrowRightNew width={12} height={20} />
      </View>
    </TouchableOpacity>
  );
};
