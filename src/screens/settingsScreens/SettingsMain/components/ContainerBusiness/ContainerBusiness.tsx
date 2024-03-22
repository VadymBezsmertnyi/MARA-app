import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import { Trans } from "@lingui/macro";

// components
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";

// styles
import { styles } from "./ContainerBusiness.styles";

type ContainerBusinessProps = {
  onCreateBusiness: () => void;
};

export const ContainerBusiness: FunctionComponent<ContainerBusinessProps> = ({
  onCreateBusiness,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>
      <Trans>Business profile</Trans>
    </Text>
    <ButtonCustom
      onSubmit={onCreateBusiness}
      styleContainer={styles.containerButton}
      styleLinear={styles.linearContainerButton}
    >
      <Text style={styles.titleButton}>
        <Trans>Create</Trans>
      </Text>
    </ButtonCustom>
  </View>
);
