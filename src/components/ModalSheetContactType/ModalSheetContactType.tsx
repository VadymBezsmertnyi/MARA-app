import React, { FunctionComponent } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

// types
import { TContact } from "../../storeRedux/apis/workshops/workshops.types";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// components
import { LinearGradientCustom } from "../LinearGradientCustom/LinearGradientCustom";
import { CheckboxPoint } from "../CheckboxPoint/CheckboxPoint";

// styles
import { styles } from "./ModalSheetContactType.styles";

type ContactTypeOption = {
  type: TContact["type"];
  title: string;
};

const CONTACT_TYPES: ContactTypeOption[] = [
  { type: "phone", title: "Телефон" },
  { type: "email", title: "Email" },
  { type: "viber", title: "Viber" },
  { type: "telegram", title: "Telegram" },
  { type: "whatsapp", title: "WhatsApp" },
  { type: "instagram", title: "Instagram" },
  { type: "facebook", title: "Facebook" },
];

type ModalSheetContactTypeProps = {
  isShow: boolean;
  onClose: () => void;
  onSelect: (type: TContact["type"]) => void;
};

export const ModalSheetContactType: FunctionComponent<
  ModalSheetContactTypeProps
> = ({ isShow, onClose, onSelect }) => {
  const { i18n } = useLocalesProvider();

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
              {CONTACT_TYPES.map((contactType) => (
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
