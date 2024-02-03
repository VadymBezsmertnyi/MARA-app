import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import { Modal, ScrollView, Text, View } from "react-native";

//types
import { ImageType } from "../../../providers/ModalsProvider/ModalsProvider.types";
import { PlaceType } from "../../../providers/PlacesProvider/PlacesProvider.types";

// providers
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";
import { localesContext } from "../../../../localization/localization.provider";
import { useWorkshopsProvider } from "../../../providers/WorkshopsProvider/useWorkshopsProvider.constants";

// components
import { Header } from "../../../components/Header/Header";
import { InputButton } from "../../../components/InputButton/InputButton";
import { Input } from "../../../components/Input/Input";
import { InputPhone } from "../../../components/InputPhone/InputPhone";
import { IconArrowRightEvent } from "../../../icons/components";
import { ModalSheetTypeWorkshops } from "../../../components/ModalSheetTypeWorkshops/ModalSheetTypeWorkshops";
import { ModalSheetTypesAutoWorks } from "../../../components/ModalSheetTypesAutoWorks/ModalSheetTypesAutoWorks";
import { ModalSheetTypesMotoWorks } from "../../../components/ModalSheetTypesMotoWorks/ModalSheetTypesMotoWorks";
import { ImagesSelect } from "../../../components/ImagesSelect/ImagesSelect";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { ModalSheetPlace } from "../../../components/ModalSheetPlace/ModalSheetPlace";

// constants
import {
  DEFAULT_CODE_COUNTRY,
  DEFAULT_COUNTRY,
} from "../../../constants/inputs.const";

// styles
import { styles } from "./WorkshopAdd.styles";
import colors from "../../../../styles/colors";

export const WorkshopAdd: FunctionComponent = () => {
  const { i18n } = useContext(localesContext);
  const { heightStatusBar } = useContext(themeContext);
  const { typesWorkServices } = useWorkshopsProvider();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(`+${DEFAULT_CODE_COUNTRY}`);
  const [selectCountryIso, setSelectCountryIso] = useState(DEFAULT_COUNTRY);
  const [place, setPlace] = useState<PlaceType | null>(null);
  const [isShowTypeWorkshops, setIsShowTypeWorkshops] = useState(false);
  const [isShowTypesMotoWorks, setIsShowTypesMotoWorks] = useState(false);
  const [isShowTypesAutoWorks, setIsShowTypesAutoWorks] = useState(false);
  const [isShowSelectPlace, setIsShowSelectPlace] = useState(false);
  const [typeWorkshops, setTypeWorkshops] = useState({
    moto: false,
    auto: false,
  });
  const [selectMotoTypesWorks, setSelectMotoTypesWorks] = useState<number[]>(
    []
  );
  const [selectAutoTypesWorks, setSelectAutoTypesWorks] = useState<number[]>(
    []
  );
  const [images, setImages] = useState<ImageType[]>([]);

  const containerStyles = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }],
    [heightStatusBar]
  );
  const valueTypesWork = useMemo(() => {
    const selectMotoTypes = selectMotoTypesWorks.map(
      (idTypeWork) =>
        typesWorkServices.moto.find((typeWork) => typeWork.id === idTypeWork)
          ?.title || i18n._("Not information")
    );
    const selectAutoTypes = selectAutoTypesWorks.map(
      (idTypeWork) =>
        typesWorkServices.auto.find((typeWork) => typeWork.id === idTypeWork)
          ?.title || i18n._("Not information")
    );
    const valueMoto = selectMotoTypes.length
      ? `${i18n._("Moto")}: ${selectMotoTypes.join("/")}`
      : "";
    const valueAuto = selectAutoTypes.length
      ? `${i18n._("Auto")}: ${selectAutoTypes.join("/")}`
      : "";

    if (valueMoto.length && valueAuto.length)
      return `${valueMoto}\n${valueAuto}`;
    if (valueMoto.length) return valueMoto;
    return valueAuto;
  }, [selectAutoTypesWorks, selectMotoTypesWorks]);

  const valueTypesWorkshops = useMemo(() => {
    if (typeWorkshops.auto && typeWorkshops.moto)
      return i18n._("All workshops");
    else if (typeWorkshops.moto) return i18n._("Repair of motorcycles");
    else if (typeWorkshops.auto) return i18n._("Repair of automobiles");
    return "";
  }, [typeWorkshops]);

  const onSubmitPlace = (data: PlaceType) => {
    setPlace(data);
    setIsShowSelectPlace(false);
  };

  const onSubmitTypeWorkshop = () => {
    if (!typeWorkshops.moto) setSelectMotoTypesWorks([]);
    if (!typeWorkshops.auto) setSelectAutoTypesWorks([]);
    setIsShowTypeWorkshops(false);
  };

  const onPressSelectTypesWork = () => {
    if (typeWorkshops.moto) setIsShowTypesMotoWorks(true);
    else if (typeWorkshops.auto) setIsShowTypesAutoWorks(true);
  };

  const onSubmitMotoTypeWorks = () => {
    setIsShowTypesMotoWorks(false);
    if (typeWorkshops.auto) setIsShowTypesAutoWorks(true);
  };

  const onSubmitAutoTypeWorks = () => {
    setIsShowTypesAutoWorks(false);
  };

  const onSaveWorkshop = () => {
    // TODO sent to server
  };

  return (
    <>
      <View style={containerStyles}>
        <Header title={i18n._("Add workshop")} />
        <ScrollView>
          <View style={styles.containerInputs}>
            <Input
              placeholder={i18n._("Enter the name of the workshop")}
              label={i18n._("Workshop name")}
              value={title}
              onChange={setTitle}
            />
            <InputButton
              label={i18n._("Workshop address")}
              placeholder={i18n._("Enter the address")}
              onPress={() => {
                setIsShowSelectPlace(true);
              }}
              containerStyle={styles.containerStyleInputButton}
              inputWrapperStyle={styles.inputWrapperStyleInputButton}
            />
            <Input
              placeholder={i18n._("Add a description about the workshop")}
              label={i18n._("Workshop description")}
              value={description}
              onChange={setDescription}
              containerStyle={styles.containerStyle}
              customStyles={styles.customStylesInput}
              maxLength={9000}
            />
            <View>
              <InputPhone
                label={i18n._("Phone number*:")}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                selectCountryIso={selectCountryIso}
                setSelectCountryIso={setSelectCountryIso}
                labelStyle={styles.labelInput}
              />
              <InputButton
                isSelect
                value={valueTypesWorkshops}
                label={i18n._("Type workshop")}
                placeholder={i18n._("Select type")}
                onPress={() => {
                  setIsShowTypeWorkshops(true);
                }}
                containerStyle={styles.containerStyleInputButton}
                inputWrapperStyle={styles.inputWrapperStyleInputButton}
                rightElementInput={
                  <IconArrowRightEvent
                    width={15}
                    height={20}
                    fill={colors.blackCoffee}
                  />
                }
              />
            </View>
            <InputButton
              isSelect
              isMultiLines
              disabled={!(typeWorkshops.auto || typeWorkshops.moto)}
              value={valueTypesWork}
              label={i18n._("Types of work")}
              placeholder={i18n._("Select types of work")}
              onPress={onPressSelectTypesWork}
              containerStyle={styles.containerStyleInputButton}
              inputWrapperStyle={styles.inputWrapperStyleInputButton}
              rightElementInput={
                <IconArrowRightEvent
                  width={15}
                  height={20}
                  fill={colors.blackCoffee}
                />
              }
            />
            <View style={styles.containerImages}>
              <Text style={styles.titleContainerImages}>
                {i18n._("Add a photo")}:
              </Text>
              <Text style={styles.subtitleContainerImages}>
                {i18n._(
                  "The first photo will be on the cover of the advertisement."
                )}
              </Text>
              <ImagesSelect images={images} setImages={setImages} />
            </View>
            <ButtonCustom title={i18n._("Publish")} onSubmit={onSaveWorkshop} />
          </View>
          <View style={styles.containerEmpty} />
        </ScrollView>
      </View>
      <Modal
        visible={
          isShowTypeWorkshops || isShowTypesMotoWorks || isShowTypesAutoWorks
        }
        transparent
      >
        <ModalSheetTypeWorkshops
          isShowTypeWorkshops={isShowTypeWorkshops}
          onClose={onSubmitTypeWorkshop}
          typeWorkshops={typeWorkshops}
          setTypeWorkshops={setTypeWorkshops}
          onSubmit={onSubmitTypeWorkshop}
        />
        <ModalSheetTypesMotoWorks
          isShow={isShowTypesMotoWorks}
          onClose={onSubmitMotoTypeWorks}
          selectMotoTypesWorks={selectMotoTypesWorks}
          setSelectMotoTypesWorks={setSelectMotoTypesWorks}
          onSubmit={onSubmitMotoTypeWorks}
        />
        <ModalSheetTypesAutoWorks
          isShow={isShowTypesAutoWorks}
          onClose={onSubmitAutoTypeWorks}
          selectAutoTypesWorks={selectAutoTypesWorks}
          setSelectAutoTypesWorks={setSelectAutoTypesWorks}
          onSubmit={onSubmitAutoTypeWorks}
        />
      </Modal>
      <ModalSheetPlace
        isOpen={isShowSelectPlace}
        title={i18n._("Workshop address")}
        onClose={() => {
          setIsShowSelectPlace(false);
        }}
        onSubmit={onSubmitPlace}
      />
    </>
  );
};
