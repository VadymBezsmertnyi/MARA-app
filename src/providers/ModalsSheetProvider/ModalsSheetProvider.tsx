import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import BottomSheet from "@gorhom/bottom-sheet";
import { GoogleLocationDetailResult } from "react-native-google-autocomplete/dist/services/Google.service";

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
  location: GoogleLocationDetailResult | null;
  setModalSheet: React.Dispatch<React.SetStateAction<ModalSheetType | null>>;
  setModalType: React.Dispatch<React.SetStateAction<ModalSheetTypes | null>>;
  setLocation: React.Dispatch<
    React.SetStateAction<GoogleLocationDetailResult | null>
  >;
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
  const [isOpenModal, setIsOpenModal] = useState(false);
  // data
  const [location, setLocation] = useState<GoogleLocationDetailResult | null>(
    null
  );

  const onClose = () => {
    setModalSheet(null);
    setModalType(null);
    setIsOpenModal(false);
  };

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
      <TouchableOpacity style={styles.buttonHeader} onPress={onClose}>
        <IconCloseGradient width={24} height={24} />
      </TouchableOpacity>
    </View>
  );

  const showModal = useMemo(() => {
    if (modalType === "input-location")
      return (
        <InputLocationModal
          setLocation={(newLocation) => {
            setLocation(newLocation);
            onClose();
          }}
        />
      );
    if (modalType === "map-location")
      return (
        <MapLocationModal
          isOpenModal={isOpenModal}
          setLocation={(newLocation) => {
            setLocation(newLocation);
            onClose();
          }}
        />
      );
    return null;
  }, [modalType, isOpenModal]);

  const contextValue: ModalsSheetContext = useMemo(
    () => ({ modalSheet, setModalSheet, setModalType, location, setLocation }),
    [modalSheet, location]
  );

  return (
    <modalsSheetContext.Provider value={contextValue}>
      {children}
      {modalSheet !== null || showModal !== null ? (
        <TouchableOpacity style={styles.footerButton} onPress={onClose}>
          <BlurView intensity={15} style={styles.footerButtonBlurView} />
        </TouchableOpacity>
      ) : null}
      {modalSheet?.children ? (
        <BottomSheet
          handleComponent={handleComponent}
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
          {modalSheet?.children}
        </BottomSheet>
      ) : null}
      {showModal ? (
        <BottomSheet
          onChange={() => {
            setIsOpenModal(true);
          }}
          handleComponent={handleComponent}
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
          {showModal}
        </BottomSheet>
      ) : null}
    </modalsSheetContext.Provider>
  );
};
