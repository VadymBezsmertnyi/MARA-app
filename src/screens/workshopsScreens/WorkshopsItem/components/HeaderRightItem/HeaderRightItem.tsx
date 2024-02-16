import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Share, TouchableOpacity, View } from "react-native";
import * as Linking from "expo-linking";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";

// components
import {
  IconLikeGradient,
  IconShareGradient,
} from "../../../../../icons/components";

// constants
import { PATHS_WORKSHOP_SCREENS } from "../../../../../navigators/useNavigator.constants";

// styles
import { styles } from "./HeaderRightItem.styles";

export const HeaderRightItem: FunctionComponent = () => {
  const { i18n } = useContext(localesContext);
  const [url, setUrl] = useState<string | null>(null);

  const onPressShare = async () => {
    if (url) {
      const result = await Share.share({
        message: i18n._(`Go to workshop {title}`, { title: "testTitle" }),
        url,
        title: i18n._(`Workshop {title}`, { title: "testTitle" }),
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Поділіться через іншу програму
        } else {
          // Поділіться успішно
        }
      } else if (result.action === Share.dismissedAction) {
        // Поділка скасована
      }
    }
  };

  const onToggleLike = () => {};

  useEffect(() => {
    const link = Linking.createURL(PATHS_WORKSHOP_SCREENS.workshopItem, {
      queryParams: { workshopId: "1" },
    });
    setUrl(link);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity disabled onPress={onPressShare}>
        <IconShareGradient width={23} height={23} opacity={0.1} />
      </TouchableOpacity>
      <TouchableOpacity disabled onPress={onToggleLike}>
        <IconLikeGradient width={38} height={20} opacity={0.1} />
      </TouchableOpacity>
    </View>
  );
};
