import React, { FunctionComponent, useMemo } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

// types
import { TContact } from "../../storeRedux/apis/workshops/workshops.types";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// components
import { LinearGradientCustom } from "../LinearGradientCustom/LinearGradientCustom";
import { CheckboxPoint } from "../CheckboxPoint/CheckboxPoint";

// helps
import useWorkshopHelpers from "../../screens/workshopsScreens/WorkshopAdd/useWorkshopHelpers";

// styles
import { styles } from "./ModalSheetContactType.styles";

type ModalSheetContactTypeProps = {
  isShow: boolean;
  onClose: () => void;
  onSelect: (type: TContact["type"]) => void;
};

export const ModalSheetContactType: FunctionComponent<
  ModalSheetContactTypeProps
> = ({ isShow, onClose, onSelect }) => {
  const { i18n } = useLocalesProvider();
  const { getContactTypes } = useWorkshopHelpers(i18n);

  const contactTypes = useMemo(() => getContactTypes(), [getContactTypes]);

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
          <View style={styles.containerModalType}>
            <Shadow stretch>
              <View style={styles.containerHeader}>
                <Text style={styles.titleModalType}>
                  {i18n._("Select contact type")}
                </Text>
                <LinearGradientCustom style={styles.lineModalType} />
              </View>
            </Shadow>
            <View style={styles.containerBody}>
              {contactTypes.map((contactType) => (
                <TouchableOpacity
                  key={contactType.type}
                  style={styles.containerSelect}
                  onPress={() => {
                    onSelect(contactType.type);
                    onClose();
                  }}
                >
                  <Text style={styles.titleSelect}>{contactType.title}</Text>
                  <CheckboxPoint isSelect={false} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
