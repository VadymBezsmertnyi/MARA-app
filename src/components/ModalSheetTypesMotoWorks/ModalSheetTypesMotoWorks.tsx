import React, { FunctionComponent } from "react";
import { ScrollView, Text, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

// types
import { TTypeWork } from "../../storeRedux/apis/workshops/workshops.types";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// hooks
import { useWorkshopsState } from "../../storeRedux/apis/workshops/useWorkshops.constants";

// components
import { ModalUniversal } from "../ModalUniversal/ModalUniversal";
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
  const { i18n } = useLocalesProvider();
  const { typesWorkServices } = useWorkshopsState();

  const onSelectMotoTypeWork = (typeMotoWork: TTypeWork) => {
    const isBe = selectMotoTypesWorks.includes(typeMotoWork.id);
    if (isBe)
      setSelectMotoTypesWorks((state) =>
        state.filter((idTypeWork) => idTypeWork !== typeMotoWork.id)
      );
    else setSelectMotoTypesWorks((state) => [...state, typeMotoWork.id]);
  };

  if (!isShow) return null;

  return (
    <ModalUniversal
      visible={isShow}
      onClose={onClose}
      styleContainer={styles.modalOverlay}
      animationType="fade"
    >
      <View style={styles.containerModalTypeWork}>
            <Shadow stretch>
              <View style={styles.containerHeaderTypeWork}>
                <Text style={styles.titleModalType}>
                  {i18n._("Types of work for motorcycle transport:")}
                </Text>
                <LinearGradientCustom style={styles.lineModalType} />
              </View>
            </Shadow>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollViewContent}
              nestedScrollEnabled
            >
              <View style={styles.containerTypesWork}>
                {typesWorkServices.moto.map((workMoto) => {
                  const isSelect = selectMotoTypesWorks.includes(workMoto.id);
                  return (
                    <View
                      key={`moto-work-${workMoto.id}`}
                      style={styles.containerTypeWork}
                    >
                      <View style={styles.containerTitlesTypeWork}>
                        <Text style={styles.titleTypeWork}>
                          {workMoto.title}
                        </Text>
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
            <Shadow stretch>
              <View style={styles.containerSubmitModalTypeWork}>
                <ButtonCustom
                  disabled={selectMotoTypesWorks.length === 0}
                  accessibilityLabel={i18n._("Select")}
                  title={i18n._("Select")}
                  onSubmit={onSubmit}
                />
              </View>
            </Shadow>
          </View>
        </ModalUniversal>
  );
};
