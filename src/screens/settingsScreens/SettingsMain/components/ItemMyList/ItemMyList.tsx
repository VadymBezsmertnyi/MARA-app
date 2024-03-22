import React, { FunctionComponent, useContext } from "react";
import { Text, View } from "react-native";
import { Trans } from "@lingui/macro";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";

// components
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";

// icons
import { IconPlus } from "../../../../../icons/components";

// styles
import colors from "../../../../../../styles/colors";
import { styles } from "./ItemMyList.styles";

type ItemMyListProps = {
  title: string;
  amountUsed: number;
  amountAvailable: number;
  onPressView: () => void;
  onPressAdd: () => void;
};

export const ItemMyList: FunctionComponent<ItemMyListProps> = ({
  title,
  amountUsed = 0,
  amountAvailable = 0,
  onPressView,
  onPressAdd,
}) => {
  const { i18n } = useContext(localesContext);

  return (
    <View style={styles.container}>
      <View style={styles.containerTitles}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.containerAmount}>
          <Text style={styles.titleAmount}>
            <Trans>Used</Trans>: {amountUsed}
          </Text>
          <Text style={styles.titleAmount}>
            <Trans>Available</Trans>: {amountAvailable}
          </Text>
        </View>
      </View>
      <View style={styles.containerButtons}>
        <ButtonCustom
          type="transparent"
          title={i18n._("View")}
          onSubmit={onPressView}
          styleContainer={styles.containerButton}
          styleLinear={styles.linearContainerButtonView}
        />
        <ButtonCustom
          onSubmit={onPressAdd}
          styleContainer={styles.containerButton}
          styleLinear={styles.linearContainerButton}
        >
          <View style={styles.buttonAdd}>
            <IconPlus width={16} height={16} fill={colors.white} />
            <Text style={styles.buttonTitleAdd}>
              <Trans>Add</Trans>
            </Text>
          </View>
        </ButtonCustom>
      </View>
    </View>
  );
};
