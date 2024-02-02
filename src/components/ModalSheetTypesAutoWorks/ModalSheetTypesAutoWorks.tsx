import React, { FunctionComponent, useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { Trans } from "@lingui/macro";

// providers
import { localesContext } from "../../../localization/localization.provider";
import { TypeWorkType } from "../../providers/WorkshopsProvider/WorkshopsProvider.types";

// hooks
import { useWorkshopsProvider } from "../../providers/WorkshopsProvider/useWorkshopsProvider.constants";

// components
import { ModalsSheet } from "../ModalsSheet/ModalsSheet";
import { LinearGradientCustom } from "../LinearGradientCustom/LinearGradientCustom";
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";
import { CheckboxClassic } from "../CheckboxClassic/CheckboxClassic";

// styles
import { styles } from "./ModalSheetTypesAutoWorks.styles";

type ModalSheetTypesAutoWorksProps = {
  isShow: boolean;
  onClose: () => void;
  selectAutoTypesWorks: number[];
  setSelectAutoTypesWorks: (value: React.SetStateAction<number[]>) => void;
  onSubmit: () => void;
};

export const ModalSheetTypesAutoWorks: FunctionComponent<
  ModalSheetTypesAutoWorksProps
> = ({
  isShow,
  onClose,
  selectAutoTypesWorks,
  setSelectAutoTypesWorks,
  onSubmit,
}) => {
  const { i18n } = useContext(localesContext);
  const { typesWorkServices } = useWorkshopsProvider();

  const onSelectAutoTypeWork = (typeAutoWork: TypeWorkType) => {
    const isBe = selectAutoTypesWorks.includes(typeAutoWork.id);
    if (isBe)
      setSelectAutoTypesWorks((state) =>
        state.filter((idTypeWork) => idTypeWork !== typeAutoWork.id)
      );
    else setSelectAutoTypesWorks((state) => [...state, typeAutoWork.id]);
  };

  return (
    <ModalsSheet isShow={isShow} onClose={onClose}>
      <View style={styles.containerModalTypeWork}>
        <View style={styles.containerHeaderTypeWork}>
          <Text style={styles.titleModalType}>
            <Trans>Types of work for automobile transport:</Trans>
          </Text>
          <LinearGradientCustom style={styles.lineModalType} />
        </View>
        <ScrollView>
          <View style={styles.containerTypesWork}>
            {typesWorkServices.auto.map((workAuto) => {
              const isSelect = selectAutoTypesWorks.includes(workAuto.id);
              return (
                <View
                  key={`auto-work-${workAuto.id}`}
                  style={styles.containerTypeWork}
                >
                  <View style={styles.containerTitlesTypeWork}>
                    <Text style={styles.titleTypeWork}>{workAuto.title}</Text>
                    <Text style={styles.subTitleTypeWork}>
                      {workAuto.description}
                    </Text>
                  </View>
                  <CheckboxClassic
                    isGradient
                    check={isSelect}
                    setCheck={() => {
                      onSelectAutoTypeWork(workAuto);
                    }}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View style={styles.containerSubmitModalTypeWork}>
          <ButtonCustom
            disabled={selectAutoTypesWorks.length === 0}
            title={i18n._("Select")}
            onSubmit={onSubmit}
          />
        </View>
      </View>
    </ModalsSheet>
  );
};
