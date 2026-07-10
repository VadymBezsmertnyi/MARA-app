import React, { FunctionComponent } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// components
import { LinearGradientCustom } from "../LinearGradientCustom/LinearGradientCustom";
import { CheckboxClassic } from "../CheckboxClassic/CheckboxClassic";
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";

// icons
import { IconAutoService, IconMotoService } from "../../icons/components";

// styles
import { styles } from "./ModalSheetTypeWorkshops.styles";

type ModalSheetTypeWorkshopsProps = {
  isShowTypeWorkshops: boolean;
  onClose: () => void;
  typeWorkshops: {
    moto: boolean;
    auto: boolean;
  };
  setTypeWorkshops: React.Dispatch<
    React.SetStateAction<{
      moto: boolean;
      auto: boolean;
    }>
  >;
  onSubmit: () => void;
};

export const ModalSheetTypeWorkshops: FunctionComponent<
  ModalSheetTypeWorkshopsProps
> = ({
  isShowTypeWorkshops,
  onClose,
  typeWorkshops,
  setTypeWorkshops,
  onSubmit,
}) => {
  const { i18n } = useLocalesProvider();

  if (!isShowTypeWorkshops) return null;

  return (
    <Modal
      visible={isShowTypeWorkshops}
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
          <View style={styles.containerModalType}>
            <Shadow stretch>
              <View style={styles.containerHeader}>
                <Text style={styles.titleModalType}>
                  {i18n._("Type workshops")}
                </Text>
                <LinearGradientCustom style={styles.lineModalType} />
              </View>
            </Shadow>
            <View style={styles.containerBody}>
              <View style={styles.containerSelect}>
                <Text style={styles.titleSelect}>
                  {i18n._("Repair of motorcycles")}
                </Text>
                <View style={styles.containerRightSelect}>
                  {typeWorkshops.moto ? (
                    <IconMotoService width={28} height={28} />
                  ) : null}
                  <CheckboxClassic
                    check={typeWorkshops.moto}
                    setCheck={(moto) => {
                      setTypeWorkshops((state) => ({ ...state, moto }));
                    }}
                    isGradient
                    accessibilityLabel={i18n._("Select type work moto")}
                  />
                </View>
              </View>
              <View style={styles.containerSelect}>
                <Text style={styles.titleSelect}>
                  {i18n._("Repair of automobiles")}
                </Text>
                <View style={styles.containerRightSelect}>
                  {typeWorkshops.auto ? (
                    <IconAutoService width={28} height={28} />
                  ) : null}
                  <CheckboxClassic
                    check={typeWorkshops.auto}
                    setCheck={(auto) => {
                      setTypeWorkshops((state) => ({ ...state, auto }));
                    }}
                    isGradient
                    accessibilityLabel={i18n._("Select type work auto")}
                  />
                </View>
              </View>
            </View>
            <Shadow stretch>
              <View style={styles.containerButtons}>
                <ButtonCustom
                  disabled={!(typeWorkshops.auto || typeWorkshops.moto)}
                  title={i18n._("Select")}
                  accessibilityLabel={i18n._("Select")}
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
