import React, { FunctionComponent, useContext, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";

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
  onPressShare: () => void;
};

export const HeaderRightItem: FunctionComponent<HeaderRightItemProps> = ({
  isLike,
  onPressLike,
  onPressShare,
}) => {
  // TODO: will do later
  const isLikeEnabled = false;
  // TODO: will do later
  const isSharedEnabled = false;
  const { i18n } = useContext(localesContext);

  const containerStyle = useMemo(
    // TODO: will do later
    () => [styles.container, { width: 76 }],
    [isLikeEnabled]
  );

  const onToggleLike = () => {
    onPressLike(!isLike);
  };

  return (
    <View style={containerStyle}>
      {isSharedEnabled && (
        <TouchableOpacity
          accessibilityLabel={i18n._("Select share page")}
          onPress={onPressShare}
        >
          <IconShareGradient width={23} height={23} />
        </TouchableOpacity>
      )}
      {isLikeEnabled && (
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
      )}
    </View>
  );
};
