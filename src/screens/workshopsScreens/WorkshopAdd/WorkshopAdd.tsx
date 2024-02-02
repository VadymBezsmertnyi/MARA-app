import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import { Modal, ScrollView, Text, View } from "react-native";

// providers
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";
import { localesContext } from "../../../../localization/localization.provider";

// components
import { Header } from "../../../components/Header/Header";
import { InputButton } from "../../../components/InputButton/InputButton";
import { Input } from "../../../components/Input/Input";
import { InputPhone } from "../../../components/InputPhone/InputPhone";

// constants
import {
  DEFAULT_CODE_COUNTRY,
  DEFAULT_COUNTRY,
} from "../../../constants/inputs.const";

// styles
import { styles } from "./WorkshopAdd.styles";
import colors from "../../../../styles/colors";
import { IconArrowRightEvent } from "../../../icons/components";

export const WorkshopAdd: FunctionComponent = () => {
  const { i18n } = useContext(localesContext);
  const { heightStatusBar } = useContext(themeContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(`+${DEFAULT_CODE_COUNTRY}`);
  const [selectCountryIso, setSelectCountryIso] = useState(DEFAULT_COUNTRY);

  const containerStyles = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }],
    [heightStatusBar]
  );

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
              onPress={() => {}}
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
                label={i18n._("Type workshop")}
                placeholder={i18n._("Select type")}
                onPress={() => {}}
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
              label={i18n._("Types of work:")}
              placeholder={i18n._("Select types of work")}
              onPress={() => {}}
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
          <View style={styles.containerEmpty} />
        </ScrollView>
      </View>
      <Modal transparent>
        <Text>TEST</Text>
      </Modal>
    </>
  );
};
