import React, { FunctionComponent, useCallback, useMemo } from "react";
import { Platform, TouchableOpacity, View, ViewStyle } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// icons
import { IconCloseGradient } from "../../icons/components";

// styles
import { styles } from "./ModalsSheet.styles";

type ModalsSheetProps = {
  isShow?: boolean;
  onChange?: () => void;
  isShowClose?: boolean;
  onClose: () => void;
  footer?: React.ReactNode;
  snapPointsProps?: string[];
  isIndicator?: boolean;
  children: React.ReactNode;
};

export const ModalsSheet: FunctionComponent<ModalsSheetProps> = ({
  isShow = true,
  onChange,
  isShowClose = true,
  onClose,
  footer,
  snapPointsProps,
  isIndicator = false,
  children,
}) => {
  const { i18n } = useLocalesProvider();
  const handleIndicatorStyle = useMemo(
    () =>
      ({
        display: isIndicator ? "flex" : "none",
      } as ViewStyle),
    [isIndicator]
  );
  const snapPoints = useMemo(() => {
    const defaultSnapPoints = Platform.OS === "ios" ? ["90%"] : ["95%"];
    return snapPointsProps ? snapPointsProps : defaultSnapPoints;
  }, [snapPointsProps]);

  const handleComponent = () => (
    <View style={styles.header}>
      <TouchableOpacity
        accessibilityLabel={i18n._("Button for closing the modal window")}
        style={styles.buttonHeader}
        onPress={onClose}
      >
        <IconCloseGradient width={24} height={24} />
      </TouchableOpacity>
    </View>
  );

  const footerComponent = useCallback(
    () =>
      footer ? (
        <BlurView intensity={40} tint="dark" style={styles.footerBlur}>
          {footer}
        </BlurView>
      ) : null,
    [footer]
  );

  if (!isShow) return null;

  return (
    <>
      <TouchableOpacity
        accessibilityLabel={i18n._(
          "Background overlay for closing the modal window"
        )}
        style={styles.footerButton}
        onPress={onClose}
      >
        <BlurView intensity={15} style={styles.footerButtonBlurView} />
      </TouchableOpacity>
      <BottomSheet
        onChange={onChange}
        handleComponent={isShowClose ? handleComponent : undefined}
        footerComponent={footerComponent}
        onClose={onClose}
        snapPoints={snapPoints}
        backgroundStyle={styles.backgroundModalStyle}
        handleIndicatorStyle={handleIndicatorStyle}
      >
        {children}
      </BottomSheet>
    </>
  );
};
