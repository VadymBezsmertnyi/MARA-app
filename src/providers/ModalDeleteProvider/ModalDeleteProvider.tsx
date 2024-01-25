import { BlurView } from "expo-blur";
import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Trans } from "@lingui/macro";

// icons
import { IconClose, IconWarningGradient } from "../../icons/components";

// styles
import { styles } from "./ModalDeleteProvider.styles";
import colors from "../../../styles/colors";
import { ButtonCustom } from "../../components/ButtonCustom/ButtonCustom";
import { localesContext } from "../../../localization/localization.provider";

type ModalDeleteProviderType = {
  children: JSX.Element;
};

type ActionFunction = () => void;

type ModalDeleteContext = { onShowModal: (newAction: ActionFunction) => void };

export const modalDeleteContext = React.createContext({} as ModalDeleteContext);

export const ModalDeleteProvider: FunctionComponent<
  ModalDeleteProviderType
> = ({ children }) => {
  const { i18n } = useContext(localesContext);
  const [isShowModal, setIsShowModal] = useState(false);
  const [action, setAction] = useState<ActionFunction | null>(null);

  const onClose = () => {
    setAction(null);
    setIsShowModal(false);
  };

  const showModal = useMemo(() => {
    if (isShowModal && action)
      return (
        <View style={styles.containerModal}>
          <View style={styles.containerClose}>
            <TouchableOpacity onPress={onClose}>
              <IconClose width={24} height={24} fill={colors.blackCoffee} />
            </TouchableOpacity>
          </View>
          <IconWarningGradient width={130} height={130} />
          <Text style={styles.titleModal}>
            <Trans>Are you sure you want to delete?</Trans>
          </Text>
          <View style={styles.containerButtons}>
            <ButtonCustom
              title={i18n._("Yes")}
              onSubmit={() => {
                action();
                onClose();
              }}
              type="transparent"
              styleContainer={styles.buttonModal}
            />
            <ButtonCustom
              title={i18n._("No")}
              onSubmit={onClose}
              styleContainer={styles.buttonModal}
            />
          </View>
        </View>
      );
    return null;
  }, [isShowModal, action]);

  const onShowModal = (newAction: ActionFunction) => {
    setAction(newAction);
    setIsShowModal(true);
  };

  const contextValue: ModalDeleteContext = useMemo(() => ({ onShowModal }), []);

  return (
    <modalDeleteContext.Provider value={contextValue}>
      {children}
      {showModal !== null ? (
        <View style={styles.container}>
          <TouchableOpacity style={styles.footerButton} onPress={onClose}>
            <BlurView intensity={15} style={styles.footerButtonBlurView} />
          </TouchableOpacity>
          {showModal}
        </View>
      ) : null}
    </modalDeleteContext.Provider>
  );
};
