import React, { FunctionComponent, useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Trans } from "@lingui/macro";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";
import { businessContext } from "../../../../../providers/BusinessProvider/BusinessProvider";

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
  onChangeBusiness: (businessMarketId: number) => void;
  onReviewBusiness: (businessMarketId: number) => void;
};

export const ContainerBusiness: FunctionComponent<ContainerBusinessProps> = ({
  onCreateBusiness,
  onChangeBusiness,
  onReviewBusiness,
}) => {
  const { i18n } = useContext(localesContext);
  const { businessMarketUser, setIsDelete } = useContext(businessContext);
  const [isShow, setIsShow] = useState(false);

  if (!businessMarketUser)
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
    <View style={styles.containerMain}>
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
      {isShow ? (
        <View style={styles.containerBusiness}>
          <View></View>
          <View style={styles.containerButtonsBusiness}>
            <ButtonCustom
              type="transparent"
              title={i18n._("Review")}
              onSubmit={() => {
                onReviewBusiness(businessMarketUser.id);
              }}
              styleContainer={styles.containerButtonTransparent}
              styleTitle={styles.titleButtonTransparent}
            />
            <ButtonCustom
              type="transparent"
              title={i18n._("Change")}
              onSubmit={() => {
                onChangeBusiness(businessMarketUser.id);
              }}
              styleContainer={styles.containerButtonTransparent}
              styleTitle={styles.titleButtonTransparent}
            />
            <ButtonCustom
              type="transparent"
              title={i18n._("Delete")}
              onSubmit={() => {
                setIsDelete(true);
              }}
              styleContainer={styles.containerButtonTransparent}
              styleTitle={styles.titleButtonTransparent}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};
