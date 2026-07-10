import React, { FunctionComponent, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

// types
import {
  TWorkshop,
  TContact,
} from "../../../../../storeRedux/apis/workshops/workshops.types";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// components
import { ModalUniversal } from "../../../../../components/ModalUniversal/ModalUniversal";
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";

// icons
import { IconClose } from "../../../../../icons/components";

// styles
import { styles } from "./ModalSelectPhone.styles";
import colors from "../../../../../../styles/colors";

type ModalSelectPhoneProps = {
  visible: boolean;
  onClose: () => void;
  workshop: TWorkshop;
  onConfirm: (phoneNumber: string) => void;
};

export const ModalSelectPhone: FunctionComponent<ModalSelectPhoneProps> = ({
  visible,
  onClose,
  workshop,
  onConfirm,
}) => {
  const { i18n } = useLocalesProvider();
  const [selectedPhone, setSelectedPhone] = useState<string>("");

  const phoneNumbers = useMemo(() => {
    const phones: string[] = [];
    const contactPhones = (workshop.contacts || [])
      .filter((contact: TContact) => contact.type === "phone")
      .map((contact: TContact) => contact.value);
    phones.push(...contactPhones);
    if (workshop.phoneNumber && (!phones || phones.length === 0))
      return [workshop.phoneNumber];
    return phones;
  }, [workshop]);

  const defaultPhone = useMemo(() => phoneNumbers[0] || "", [phoneNumbers]);

  const handleConfirm = () => {
    if (selectedPhone || defaultPhone) onConfirm(selectedPhone || defaultPhone);
  };

  if (!visible) return null;
  return (
    <ModalUniversal
      visible={visible}
      onClose={onClose}
      styleContainer={styles.modalOverlay}
      animationType="fade"
    >
      <Shadow stretch>
        <View style={styles.containerModal}>
          <View style={styles.containerClose}>
            <TouchableOpacity
              accessibilityLabel={i18n._("Button for closing the modal window")}
              onPress={onClose}
            >
              <IconClose width={24} height={24} fill={colors.blackCoffee} />
            </TouchableOpacity>
          </View>
          <Text style={styles.titleModal}>{i18n._("Select phone number")}</Text>
          <View style={styles.containerPhones}>
            {phoneNumbers.map((phone, index) => {
              const isSelected = phone === selectedPhone;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.phoneItem,
                    isSelected && styles.phoneItemSelected,
                  ]}
                  onPress={() => setSelectedPhone(phone)}
                >
                  <Text
                    style={[
                      styles.phoneText,
                      isSelected && styles.phoneTextSelected,
                    ]}
                  >
                    {phone}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <ButtonCustom
            title={i18n._("Confirm")}
            onSubmit={handleConfirm}
            styleContainer={styles.buttonContainer}
          />
        </View>
      </Shadow>
    </ModalUniversal>
  );
};
