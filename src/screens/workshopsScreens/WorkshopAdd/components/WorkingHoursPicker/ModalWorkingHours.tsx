import React, { FunctionComponent, useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { Shadow } from "react-native-shadow-2";

// types
import { TWorkingHours } from "../../../../../storeRedux/apis/workshops/workshops.types";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// components
import { CheckboxClassic } from "../../../../../components/CheckboxClassic/CheckboxClassic";
import { TimePicker } from "./TimePicker";
import { LinearGradientCustom } from "../../../../../components/LinearGradientCustom/LinearGradientCustom";
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";
import { ModalUniversal } from "../../../../../components/ModalUniversal/ModalUniversal";

// styles
import { styles } from "./WorkingHoursPicker.styles";

const DAYS_OF_WEEK = [
  { key: "monday" as const, labelKey: "Monday" },
  { key: "tuesday" as const, labelKey: "Tuesday" },
  { key: "wednesday" as const, labelKey: "Wednesday" },
  { key: "thursday" as const, labelKey: "Thursday" },
  { key: "friday" as const, labelKey: "Friday" },
  { key: "saturday" as const, labelKey: "Saturday" },
  { key: "sunday" as const, labelKey: "Sunday" },
] as const;

type ModalWorkingHoursProps = {
  isOpen: boolean;
  value: TWorkingHours;
  onClose: () => void;
  onSubmit: (value: TWorkingHours) => void;
};

export const ModalWorkingHours: FunctionComponent<ModalWorkingHoursProps> = ({
  isOpen,
  value,
  onClose,
  onSubmit,
}) => {
  const { i18n } = useLocalesProvider();
  const [workingHours, setWorkingHours] = useState<TWorkingHours>(value);

  const handleDayToggle = (dayKey: keyof TWorkingHours) => {
    const currentDay = workingHours[dayKey];
    if (currentDay)
      setWorkingHours({
        ...workingHours,
        [dayKey]: null,
      });
    else
      setWorkingHours({
        ...workingHours,
        [dayKey]: { open: "08:00", close: "18:00" },
      });
  };

  const handleTimeChange = (
    dayKey: keyof TWorkingHours,
    timeType: "open" | "close",
    timeValue: string
  ) => {
    const currentDay = workingHours[dayKey];
    if (!currentDay) return;

    setWorkingHours({
      ...workingHours,
      [dayKey]: {
        ...currentDay,
        [timeType]: timeValue,
      },
    });
  };

  const handleSubmit = () => {
    onSubmit(workingHours);
    onClose();
  };

  useEffect(() => {
    if (isOpen) setWorkingHours(value);
  }, [isOpen, value]);

  if (!isOpen) return null;
  return (
    <ModalUniversal
      visible={isOpen}
      onClose={onClose}
      styleContainer={styles.modalOverlay}
      animationType="fade"
    >
      <View style={styles.modalContent}>
        <View style={styles.modalContainer}>
          <Shadow stretch>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{i18n._("Working hours")}</Text>
              <LinearGradientCustom style={styles.modalLine} />
            </View>
          </Shadow>
          <ScrollView style={styles.modalScrollView}>
            {DAYS_OF_WEEK.map((day) => {
              const dayValue = workingHours[day.key];
              const isWorking = dayValue !== null;

              return (
                <View key={day.key} style={styles.dayContainer}>
                  <CheckboxClassic
                    check={isWorking}
                    setCheck={() => handleDayToggle(day.key)}
                    containerStyle={styles.checkboxContainer}
                  />
                  <Text style={styles.dayLabel}>{i18n._(day.labelKey)}</Text>
                  {isWorking ? (
                    <View style={styles.timeContainer}>
                      <TimePicker
                        value={dayValue.open}
                        onChange={(time) =>
                          handleTimeChange(day.key, "open", time)
                        }
                      />
                      <Text style={styles.timeSeparator}>-</Text>
                      <TimePicker
                        value={dayValue.close}
                        onChange={(time) =>
                          handleTimeChange(day.key, "close", time)
                        }
                      />
                    </View>
                  ) : (
                    <View style={styles.timeContainer}>
                      <Text style={styles.timeText}>{i18n._("Day off")}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.modalFooter}>
            <Shadow stretch>
              <View style={styles.modalFooterContent}>
                <ButtonCustom title={i18n._("Save")} onSubmit={handleSubmit} />
                <ButtonCustom
                  type="transparent"
                  title={i18n._("Cancel")}
                  onSubmit={onClose}
                />
              </View>
            </Shadow>
          </View>
        </View>
      </View>
    </ModalUniversal>
  );
};
