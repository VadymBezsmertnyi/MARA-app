import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import BottomSheet from "@gorhom/bottom-sheet";

// icons
import { IconCloseGradient } from "../../icons/components";

// styles
import { styles } from "./ModalsSheetProvider.styles";

type ModalSheetType = {
  isIndicator: boolean;
  snapPoints: Array<string | number>;
  isFooter?: JSX.Element;
};

type ModalsSheetContext = {};

type ModalsSheetProviderType = {
  children: JSX.Element;
};

export const modalsSheetContext = React.createContext({} as ModalsSheetContext);

export const ModalsSheetProvider: FunctionComponent<
  ModalsSheetProviderType
> = ({ children }) => {
  const [modalSheet, setModalSheet] = useState<ModalSheetType | null>(null);

  const snapPoints = useMemo(
    () => modalSheet?.snapPoints || ["90%"],
    [modalSheet?.snapPoints]
  );
  const handleIndicatorStyle = useMemo(
    () =>
      ({
        display: modalSheet?.isIndicator ? "flex" : "none",
      }) as ViewStyle,
    [modalSheet?.isIndicator]
  );

  const footerComponent = useCallback(
    () =>
      modalSheet?.isFooter ? (
        <BlurView intensity={40} tint="dark" style={styles.footerBlur}>
          {modalSheet?.isFooter}
        </BlurView>
      ) : null,
    [modalSheet?.isFooter]
  );

  const handleComponent = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.buttonHeader}
        onPress={() => {
          setModalSheet(null);
        }}
      >
        <IconCloseGradient width={24} height={24} />
      </TouchableOpacity>
    </View>
  );

  const contextValue: ModalsSheetContext = useMemo(() => ({}), []);

  return (
    <modalsSheetContext.Provider value={contextValue}>
      {children}
      {modalSheet !== null ? (
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => {
            setModalSheet(null);
          }}
        >
          <BlurView intensity={15} style={styles.footerButtonBlurView} />
        </TouchableOpacity>
      ) : null}
      <BottomSheet
        handleComponent={handleComponent}
        footerComponent={footerComponent}
        onClose={() => {
          setModalSheet(null);
        }}
        snapPoints={snapPoints}
        //containerStyle={{ overflow: "hidden" }}
        //backgroundStyle={{ overflow: "hidden" }}
        //style={{ overflow: "hidden" }}
        handleIndicatorStyle={handleIndicatorStyle}
        //enablePanDownToClose
        //enableContentPanningGesture
      >
        <View style={{ flex: 1, height: 200 }}>
          <Text>TEST</Text>
          <Text>TEST</Text>
          <Text>TEST</Text>
          <Text>TEST</Text>
          <Text>TEST</Text>
          <Text>TEST</Text>
          <Text>TEST</Text>
          <Text>TEST</Text>
          <Text>TEST</Text>
          <Text>TEST</Text>
          <Text>TEST</Text>
          <Text>TEST</Text>
          <Text>TEST</Text>
          <Text>TEST</Text>
          <Text>TEST</Text>
          <Text>TEST</Text>
        </View>
      </BottomSheet>
    </modalsSheetContext.Provider>
  );
};
