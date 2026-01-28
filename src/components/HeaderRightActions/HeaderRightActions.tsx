import React, { FunctionComponent } from "react";
import { TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// icons
import { IconLikeFullGradient, IconLikeGradient } from "../../icons/components";

// styles
import { styles } from "./HeaderRightActions.styles";
import colors from "../../../styles/colors";

type HeaderRightActionsProps = {
  isLike?: boolean;
  onPressLike?: (nextLike: boolean) => void;
  onPressShare?: () => void;
  showLike?: boolean;
  showShare?: boolean;
};

export const HeaderRightActions: FunctionComponent<HeaderRightActionsProps> = ({
  isLike = false,
  onPressLike,
  onPressShare,
  showLike = true,
  showShare = true,
}) => {
  const { i18n } = useLocalesProvider();

  const handleToggleLike = () => {
    if (!onPressLike) return;
    onPressLike(!isLike);
  };

  return (
    <View style={styles.container}>
      {showShare && onPressShare && (
        <TouchableOpacity
          accessibilityLabel={i18n._("Select share page")}
          onPress={onPressShare}
          style={styles.button}
        >
          <MaterialIcons name="share" size={22} color={colors.blazeOrange} />
        </TouchableOpacity>
      )}
      {showLike && onPressLike && (
        <TouchableOpacity
          accessibilityLabel={i18n._("Toggle like product")}
          onPress={handleToggleLike}
          style={styles.button}
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
