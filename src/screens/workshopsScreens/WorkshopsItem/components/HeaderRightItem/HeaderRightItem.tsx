import React, { FunctionComponent, useContext, useState } from "react";
import { Share, TouchableOpacity, View } from "react-native";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";

// components
import {
  IconLikeFullGradient,
  IconLikeGradient,
  IconShareGradient,
} from "../../../../../icons/components";

// styles
import { styles } from "./HeaderRightItem.styles";

type HeaderRightItemProps = {
  isLike: boolean;
  onPressLike: (like: boolean) => void;
};

export const HeaderRightItem: FunctionComponent<HeaderRightItemProps> = ({
  isLike,
  onPressLike,
}) => {
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

  const onToggleLike = () => {
    onPressLike(!isLike);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        accessibilityLabel={i18n._("Select share page")}
        disabled
        onPress={onPressShare}
      >
        <IconShareGradient width={23} height={23} opacity={0.1} />
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel={i18n._("Toggle like product")}
        onPress={onToggleLike}
      >
        {isLike ? (
          <IconLikeFullGradient width={38} height={38} />
        ) : (
          <IconLikeGradient width={38} height={38} />
        )}
      </TouchableOpacity>
    </View>
  );
};
