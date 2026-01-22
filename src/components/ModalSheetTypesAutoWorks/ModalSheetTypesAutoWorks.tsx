import React, { FunctionComponent } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";
import { TypeWorkType } from "../../providers/WorkshopsProvider/WorkshopsProvider.types";

// hooks
import { useWorkshopsProviderState } from "../../providers/WorkshopsProvider/useWorkshopsProvider.constants";

// components
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
  const { i18n } = useLocalesProvider();
  const { typesWorkServices } = useWorkshopsProviderState();

  const onSelectAutoTypeWork = (typeAutoWork: TypeWorkType) => {
    const isBe = selectAutoTypesWorks.includes(typeAutoWork.id);
    if (isBe)
      setSelectAutoTypesWorks((state) =>
        state.filter((idTypeWork) => idTypeWork !== typeAutoWork.id)
      );
    else setSelectAutoTypesWorks((state) => [...state, typeAutoWork.id]);
  };

  if (!isShow) return null;

  return (
    <Modal
      visible={isShow}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
          style={styles.modalContent}
        >
          <View style={styles.containerModalTypeWork}>
            <Shadow stretch>
              <View style={styles.containerHeaderTypeWork}>
                <Text style={styles.titleModalType}>
                  {i18n._("Types of work for automobile transport:")}
                </Text>
                <LinearGradientCustom style={styles.lineModalType} />
              </View>
            </Shadow>
            <ScrollView style={styles.scrollView}>
              <View style={styles.containerTypesWork}>
                {typesWorkServices.auto.map((workAuto) => {
                  const isSelect = selectAutoTypesWorks.includes(workAuto.id);
                  return (
                    <View
                      key={`auto-work-${workAuto.id}`}
                      style={styles.containerTypeWork}
                    >
                      <View style={styles.containerTitlesTypeWork}>
                        <Text style={styles.titleTypeWork}>
                          {workAuto.title}
                        </Text>
                        <Text style={styles.subTitleTypeWork}>
                          {workAuto.description}
                        </Text>
                      </View>
                      <CheckboxClassic
                        isGradient
                        accessibilityLabel={i18n._(
                          "Select type work auto {nameTypeWork}",
                          { nameTypeWork: workAuto.title }
                        )}
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
            <Shadow stretch>
              <View style={styles.containerSubmitModalTypeWork}>
                <ButtonCustom
                  disabled={selectAutoTypesWorks.length === 0}
                  accessibilityLabel={i18n._("Select")}
                  title={i18n._("Select")}
                  onSubmit={onSubmit}
                />
              </View>
            </Shadow>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
