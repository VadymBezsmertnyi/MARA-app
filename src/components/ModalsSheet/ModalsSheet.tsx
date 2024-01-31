import React, { FunctionComponent, useCallback, useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { IconCloseGradient } from "../../icons/components";
import { BlurView } from "expo-blur";
import { styles } from "./ModalsSheet.styles";

type ModalsSheetProps = {
  onChange?: () => void;
  isShowClose?: boolean;
  onClose: () => void;
  footer?: JSX.Element;
  snapPointsProps?: string[];
  isIndicator?: boolean;
  children: JSX.Element;
};

export const ModalsSheet: FunctionComponent<ModalsSheetProps> = ({
  onChange,
  isShowClose = true,
  onClose,
  footer,
  snapPointsProps,
  isIndicator = false,
  children,
}) => {
  const handleIndicatorStyle = useMemo(
    () =>
      ({
        display: isIndicator ? "flex" : "none",
      }) as ViewStyle,
    [isIndicator]
  );
  const snapPoints = useMemo(
    () => snapPointsProps || ["90%"],
    [snapPointsProps]
  );

  const handleComponent = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.buttonHeader} onPress={onClose}>
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

  return (
    <>
      <TouchableOpacity style={styles.footerButton} onPress={onClose}>
        <BlurView intensity={15} style={styles.footerButtonBlurView} />
      </TouchableOpacity>
      <BottomSheet
        onChange={onChange}
        handleComponent={isShowClose ? handleComponent : undefined}
        footerComponent={footerComponent}
        onClose={onClose}
        snapPoints={snapPoints}
        //containerStyle={{ overflow: "hidden" }}
        backgroundStyle={styles.backgroundModalStyle}
        //style={{ overflow: "hidden" }}
        handleIndicatorStyle={handleIndicatorStyle}
        //enablePanDownToClose
        //enableContentPanningGesture
      >
        {children}
      </BottomSheet>
    </>
  );
};
