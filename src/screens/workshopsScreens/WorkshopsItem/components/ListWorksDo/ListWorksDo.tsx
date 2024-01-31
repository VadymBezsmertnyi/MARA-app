import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Trans } from "@lingui/macro";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";

// components
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";
import { ScrollViewCustom } from "../../../../../components/ScrollViewCustom/ScrollViewCustom";

// icons
import { IconOkGradient } from "../../../../../icons/components";

// styles
import { styles } from "./ListWorksDo.styles";

type ListWorksDoProps = {};

export const ListWorksDo: FunctionComponent<ListWorksDoProps> = () => {
  const { i18n } = useContext(localesContext);
  const [isAuto, setIsAuto] = useState(false);

  const leftButtonStyles = useMemo(
    () => [
      styles.leftButton,
      {
        zIndex: isAuto ? 1 : 0,
      },
    ],
    [isAuto]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Trans>The work we do:</Trans>
      </Text>
      <View style={styles.containerCheckButton}>
        <TouchableOpacity
          style={styles.checkButton}
          onPress={() => {
            setIsAuto((state) => !state);
          }}
        >
          <ButtonCustom
            disabled
            type={isAuto ? "full" : "transparent"}
            title={i18n._("Auto")}
            onSubmit={() => {}}
            styleContainer={leftButtonStyles}
            styleLinear={styles.styleLinearButtons}
            styleTitle={styles.titleButtons}
          />
          <ButtonCustom
            disabled
            type={isAuto ? "transparent" : "full"}
            title={i18n._("Moto")}
            onSubmit={() => {}}
            styleContainer={styles.rightButton}
            styleLinear={styles.styleLinearButtons}
            styleTitle={styles.titleButtons}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerList}>
        <ScrollViewCustom style={styles.containerServices}>
          <>
            {Array.from({ length: 20 }, (_, index) => index).map((item) => (
              <View
                key={`type-service-${item + 1}`}
                style={styles.containerService}
              >
                <IconOkGradient width={40} height={40} />
                <View style={styles.containerInfoService}>
                  <Text style={styles.titleInfoService}>
                    Технічне обслуговування
                  </Text>
                  <Text style={styles.subTitleInfoService}>
                    Мастило троса/Синхронізація карбюраторів/Заміна повітряного
                    фільтразаміна свічок/Заміна масла в коробці/Заміна масла в
                    редукторі/Заміна охолоджуючої рідини/Заміна масла в двигуні
                  </Text>
                </View>
              </View>
            ))}
            <View style={styles.containerEmpty} />
          </>
        </ScrollViewCustom>
      </View>
    </View>
  );
};
