import React, { FunctionComponent, useContext } from "react";
import { Modal, StatusBar, View } from "react-native";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";

// components
import { Header } from "../../../../../components/Header/Header";

// styles
import { styles } from "./ModalFilter.styles";
import colors from "../../../../../../styles/colors";

type ModalFilterProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalFilter: FunctionComponent<ModalFilterProps> = ({
  isOpen,
  onClose,
}) => {
  const { i18n } = useContext(localesContext);

  return (
    <Modal transparent visible={isOpen}>
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.lightOrange} />
        <Header
          title={i18n._("Filter")}
          onPressLeftElement={onClose}
          backgroundStyle={styles.headerBackground}
        />
      </View>
    </Modal>
  );
};
