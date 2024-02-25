import React, { FunctionComponent, useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { Trans } from "@lingui/macro";

// types
import { TypeWorkType } from "../../providers/WorkshopsProvider/WorkshopsProvider.types";

// providers
import { localesContext } from "../../../localization/localization.provider";

// hooks
import { useWorkshopsProvider } from "../../providers/WorkshopsProvider/useWorkshopsProvider.constants";

// components
import { ModalsSheet } from "../ModalsSheet/ModalsSheet";
import { LinearGradientCustom } from "../LinearGradientCustom/LinearGradientCustom";
import { CheckboxClassic } from "../CheckboxClassic/CheckboxClassic";
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";

// styles
import { styles } from "./ModalSheetTypesMotoWorks.styles";

type ModalSheetTypesMotoWorksProps = {
  isShow: boolean;
  onClose: () => void;
  selectMotoTypesWorks: number[];
  setSelectMotoTypesWorks: (value: React.SetStateAction<number[]>) => void;
  onSubmit: () => void;
};

export const ModalSheetTypesMotoWorks: FunctionComponent<
  ModalSheetTypesMotoWorksProps
> = ({
  isShow,
  onClose,
  selectMotoTypesWorks,
  setSelectMotoTypesWorks,
  onSubmit,
}) => {
  const { i18n } = useContext(localesContext);
  const { typesWorkServices } = useWorkshopsProvider();

  const onSelectMotoTypeWork = (typeMotoWork: TypeWorkType) => {
    const isBe = selectMotoTypesWorks.includes(typeMotoWork.id);
    if (isBe)
      setSelectMotoTypesWorks((state) =>
        state.filter((idTypeWork) => idTypeWork !== typeMotoWork.id)
      );
    else setSelectMotoTypesWorks((state) => [...state, typeMotoWork.id]);
  };

  return (
    <ModalsSheet isShow={isShow} onClose={onClose}>
      <View style={styles.containerModalTypeWork}>
        <View style={styles.containerHeaderTypeWork}>
          <Text style={styles.titleModalType}>
            <Trans>Types of work for motorcycle transport:</Trans>
          </Text>
          <LinearGradientCustom style={styles.lineModalType} />
        </View>
        <ScrollView>
          <View style={styles.containerTypesWork}>
            {typesWorkServices.moto.map((workMoto) => {
              const isSelect = selectMotoTypesWorks.includes(workMoto.id);
              return (
                <View
                  key={`moto-work-${workMoto.id}`}
                  style={styles.containerTypeWork}
                >
                  <View style={styles.containerTitlesTypeWork}>
                    <Text style={styles.titleTypeWork}>{workMoto.title}</Text>
                    <Text style={styles.subTitleTypeWork}>
                      {workMoto.description}
                    </Text>
                  </View>
                  <CheckboxClassic
                    isGradient
                    accessibilityLabel={i18n._(
                      "Select type work moto {nameTypeWork}",
                      { nameTypeWork: workMoto.title }
                    )}
                    check={isSelect}
                    setCheck={() => {
                      onSelectMotoTypeWork(workMoto);
                    }}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View style={styles.containerSubmitModalTypeWork}>
          <ButtonCustom
            disabled={selectMotoTypesWorks.length === 0}
            accessibilityLabel={i18n._("Select")}
            title={i18n._("Select")}
            onSubmit={onSubmit}
          />
        </View>
      </View>
    </ModalsSheet>
  );
};
