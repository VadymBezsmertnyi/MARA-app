import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import BottomSheet from "@gorhom/bottom-sheet";

// types
import { ModalSheetType, ModalSheetTypes } from "./ModalsSheetProvider.types";

// components
import { InputLocationModal } from "./modals/InputLocationModal/InputLocationModal";
import { MapLocationModal } from "./modals/MapLocationModal/MapLocationModal";

// icons
import { IconCloseGradient } from "../../icons/components";

// styles
import { styles } from "./ModalsSheetProvider.styles";

type ModalsSheetContext = {
  modalSheet: ModalSheetType | null;
  setModalSheet: React.Dispatch<React.SetStateAction<ModalSheetType | null>>;
  setModalType: React.Dispatch<React.SetStateAction<ModalSheetTypes | null>>;
};

type ModalsSheetProviderType = {
  children: JSX.Element;
};

export const modalsSheetContext = React.createContext({} as ModalsSheetContext);

export const ModalsSheetProvider: FunctionComponent<
  ModalsSheetProviderType
> = ({ children }) => {
  const [modalSheet, setModalSheet] = useState<ModalSheetType | null>(null);
  const [modalType, setModalType] = useState<ModalSheetTypes | null>(null);

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
      modalSheet?.footer ? (
        <BlurView intensity={40} tint="dark" style={styles.footerBlur}>
          {modalSheet.footer}
        </BlurView>
      ) : null,
    [modalSheet?.footer]
  );

  const handleComponent = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.buttonHeader}
        onPress={() => {
          setModalSheet(null);
          setModalType(null);
        }}
      >
        <IconCloseGradient width={24} height={24} />
      </TouchableOpacity>
    </View>
  );

  const showModal = useMemo(() => {
    if (modalType === "input-location") return <InputLocationModal />;
    if (modalType === "map-location") return <MapLocationModal />;
    return null;
  }, [modalType]);

  const contextValue: ModalsSheetContext = useMemo(
    () => ({ modalSheet, setModalSheet, setModalType }),
    [modalSheet]
  );

  return (
    <modalsSheetContext.Provider value={contextValue}>
      {children}
      {modalSheet !== null || showModal !== null ? (
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => {
            setModalSheet(null);
            setModalType(null);
          }}
        >
          <BlurView intensity={15} style={styles.footerButtonBlurView} />
        </TouchableOpacity>
      ) : null}
      {modalSheet?.children ? (
        <BottomSheet
          handleComponent={handleComponent}
          footerComponent={footerComponent}
          onClose={() => {
            setModalSheet(null);
            setModalType(null);
          }}
          snapPoints={snapPoints}
          //containerStyle={{ overflow: "hidden" }}
          //backgroundStyle={{ overflow: "hidden" }}
          //style={{ overflow: "hidden" }}
          handleIndicatorStyle={handleIndicatorStyle}
          //enablePanDownToClose
          //enableContentPanningGesture
        >
          {modalSheet?.children}
        </BottomSheet>
      ) : null}
      {showModal ? (
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
          {showModal}
        </BottomSheet>
      ) : null}
    </modalsSheetContext.Provider>
  );
};
