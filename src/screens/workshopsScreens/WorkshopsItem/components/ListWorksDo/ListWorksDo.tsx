import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Trans } from "@lingui/macro";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";

// helps
import { useWorkshopsProvider } from "../../../../../providers/WorkshopsProvider/useWorkshopsProvider.constants";

// components
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";
import { ScrollViewCustom } from "../../../../../components/ScrollViewCustom/ScrollViewCustom";

// icons
import { IconOkGradient } from "../../../../../icons/components";

// styles
import { styles } from "./ListWorksDo.styles";

type ListWorksDoProps = {
  motoWorkIds: number[];
  autoWorkIds: number[];
};

export const ListWorksDo: FunctionComponent<ListWorksDoProps> = ({
  motoWorkIds,
  autoWorkIds,
}) => {
  const { i18n } = useContext(localesContext);
  const [isAuto, setIsAuto] = useState(false);
  const [isShortList, setIsShortList] = useState(false);
  const { typesWorkServices } = useWorkshopsProvider();
  const motoList = useMemo(
    () =>
      motoWorkIds.map(
        (motoId) =>
          typesWorkServices.moto.find(
            (motoService) => motoService.id === motoId
          ) || null
      ),
    [typesWorkServices.moto, motoWorkIds]
  );
  const autoList = useMemo(
    () =>
      autoWorkIds.map(
        (autoId) =>
          typesWorkServices.auto.find(
            (autoService) => autoService.id === autoId
          ) || null
      ),
    [typesWorkServices.auto, autoWorkIds]
  );
  const showListWork = useMemo(() => {
    if (isAuto && autoList.length > 0) return autoList;
    else if (motoList.length) return motoList;
    return autoList;
  }, [isAuto, autoList, motoList]);

  const leftButtonStyles = useMemo(
    () => [
      styles.leftButton,
      {
        zIndex: isAuto ? 1 : 0,
      },
    ],
    [isAuto]
  );

  if (motoWorkIds.length === 0 && autoWorkIds.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Trans>The work we do:</Trans>
      </Text>
      <View style={styles.containerCheckButton}>
        {motoWorkIds.length > 0 && autoWorkIds.length > 0 ? (
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
              onSubmit={() => null}
              styleContainer={leftButtonStyles}
              styleLinear={styles.styleLinearButtons}
              styleTitle={styles.titleButtons}
            />
            <ButtonCustom
              disabled
              type={isAuto ? "transparent" : "full"}
              title={i18n._("Moto")}
              onSubmit={() => null}
              styleContainer={styles.rightButton}
              styleLinear={styles.styleLinearButtons}
              styleTitle={styles.titleButtons}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View
        style={styles.containerList}
        onLayout={(event) => {
          setIsShortList(event.nativeEvent.layout.height >= 564);
        }}
      >
        <ScrollViewCustom style={styles.containerServices}>
          <>
            {showListWork.map((item, index) =>
              item ? (
                <View
                  key={`type-service-${item.id + index}`}
                  style={styles.containerService}
                >
                  <IconOkGradient width={40} height={40} />
                  <View style={styles.containerInfoService}>
                    <Text style={styles.titleInfoService}>{item.title}</Text>
                    <Text style={styles.subTitleInfoService}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              ) : null
            )}
            {isShortList ? <View style={styles.containerEmpty} /> : null}
          </>
        </ScrollViewCustom>
      </View>
    </View>
  );
};
