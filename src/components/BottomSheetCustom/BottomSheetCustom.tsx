import React, { FunctionComponent, useEffect, useMemo, useRef } from "react";
import { Platform, ScrollView, StyleProp, View, ViewStyle } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { SharedValue } from "react-native-reanimated";

// styles
import styles from "./BottomSheetCustom.styles";

type BottomSheetCustomProps = {
  children: React.ReactNode;
  isOpen: boolean;
  index?: number;
  onClose: () => void;
  snapPoints?: (string | number)[] | SharedValue<(string | number)[]>;
  handleIndicatorStyle?: StyleProp<ViewStyle>;
  isInputs?: boolean;
  enableContentPanningGesture?: boolean;
  enablePanDownToClose?: boolean;
  backdropOpacity?: number;
  styleContent?: StyleProp<ViewStyle>;
};

const BottomSheetCustom: FunctionComponent<BottomSheetCustomProps> = ({
  children,
  isOpen,
  index = 0,
  onClose,
  snapPoints = ["50%", "90%"],
  handleIndicatorStyle,
  isInputs,
  enableContentPanningGesture = true,
  enablePanDownToClose = true,
  backdropOpacity = 0.5,
  styleContent,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleIndicatorStyles = useMemo(
    () => [styles.handleIndicator, handleIndicatorStyle],
    [handleIndicatorStyle]
  );

  useEffect(() => {
    if (isOpen) bottomSheetModalRef.current?.present();
    else bottomSheetModalRef.current?.dismiss();
  }, [isOpen]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      index={index}
      onDismiss={onClose}
      onChange={(sheetIndex) => {
        if (sheetIndex === -1) onClose();
      }}
      backdropComponent={(props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={backdropOpacity}
        />
      )}
      enableContentPanningGesture={enableContentPanningGesture}
      enablePanDownToClose={enablePanDownToClose}
      backgroundStyle={styles.background}
      handleIndicatorStyle={handleIndicatorStyles}
    >
      <BottomSheetView style={[styles.content, styleContent]}>
        {isInputs && Platform.OS !== "android" ? (
          <ScrollView horizontal scrollEnabled={false}>
            <View style={styles.scrollViewContainer}>{children}</View>
          </ScrollView>
        ) : (
          children
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default BottomSheetCustom;
