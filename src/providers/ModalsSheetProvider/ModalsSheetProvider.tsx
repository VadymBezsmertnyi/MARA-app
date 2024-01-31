import React, { FunctionComponent, useMemo, useState } from "react";
import { GoogleLocationDetailResult } from "react-native-google-autocomplete/dist/services/Google.service";

// types
import { ModalSheetType, ModalSheetTypes } from "./ModalsSheetProvider.types";

// components
import { InputLocationModal } from "./modals/InputLocationModal/InputLocationModal";
import { MapLocationModal } from "./modals/MapLocationModal/MapLocationModal";
import { InputCityModal } from "./modals/InputCityModal/InputCityModal";
import { ModalsSheet } from "../../components/ModalsSheet/ModalsSheet";

type ModalsSheetContext = {
  modalSheet: ModalSheetType | null;
  location: GoogleLocationDetailResult | null;
  city: GoogleLocationDetailResult | null;
  setModalSheet: React.Dispatch<React.SetStateAction<ModalSheetType | null>>;
  setModalType: React.Dispatch<React.SetStateAction<ModalSheetTypes | null>>;
  setLocation: React.Dispatch<
    React.SetStateAction<GoogleLocationDetailResult | null>
  >;
  setCity: React.Dispatch<
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
  const [city, setCity] = useState<GoogleLocationDetailResult | null>(null);

  const onClose = () => {
    setModalSheet(null);
    setModalType(null);
    setCity(null);
    setIsOpenModal(false);
  };

  const showModal = useMemo(() => {
    if (modalType === "input-location")
      return (
        <InputLocationModal
          setLocation={(newLocation) => {
            onClose();
            setLocation(newLocation);
          }}
          setModalType={setModalType}
        />
      );
    if (modalType === "input-city")
      return <InputCityModal setCity={setCity} setModalType={setModalType} />;
    if (modalType === "map-location")
      return (
        <MapLocationModal
          isOpenModal={isOpenModal}
          setLocation={(newLocation) => {
            onClose();
            setLocation(newLocation);
          }}
        />
      );
    return null;
  }, [modalType, isOpenModal]);

  const contextValue: ModalsSheetContext = useMemo(
    () => ({
      modalSheet,
      setModalSheet,
      setModalType,
      location,
      setLocation,
      city,
      setCity,
    }),
    [modalSheet, location, city]
  );

  return (
    <modalsSheetContext.Provider value={contextValue}>
      {children}
      {modalSheet?.children ? (
        <ModalsSheet onClose={onClose}>{modalSheet?.children}</ModalsSheet>
      ) : null}
      {showModal ? (
        <ModalsSheet
          onChange={() => {
            setIsOpenModal(true);
          }}
          onClose={onClose}
        >
          {showModal}
        </ModalsSheet>
      ) : null}
    </modalsSheetContext.Provider>
  );
};
