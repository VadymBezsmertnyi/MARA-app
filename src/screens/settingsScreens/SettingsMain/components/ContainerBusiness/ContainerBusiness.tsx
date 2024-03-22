import React, { FunctionComponent, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Trans } from "@lingui/macro";

// components
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";

// icons
import {
  IconArrowDownGradient,
  IconArrowUpGradient,
} from "../../../../../icons/components";

// styles
import { styles } from "./ContainerBusiness.styles";

type ContainerBusinessProps = {
  onCreateBusiness: () => void;
};

export const ContainerBusiness: FunctionComponent<ContainerBusinessProps> = ({
  onCreateBusiness,
}) => {
  const [isShow, setIsShow] = useState(false);
  const isBusiness = false;

  if (!isBusiness)
    return (
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
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          setIsShow((state) => !state);
        }}
      >
        <Text style={styles.title}>
          <Trans>Business profile</Trans>
        </Text>
        {isShow ? (
          <IconArrowUpGradient width={16} height={16} />
        ) : (
          <IconArrowDownGradient width={16} height={16} />
        )}
      </TouchableOpacity>
    </View>
  );
};
