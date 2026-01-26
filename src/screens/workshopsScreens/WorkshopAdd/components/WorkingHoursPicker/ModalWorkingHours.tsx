import React, { FunctionComponent, useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { I18n } from "@lingui/core";

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

type DayKey = keyof TWorkingHours;

const getDayName = (
  dayKey: DayKey,
  i18n: I18n
): { full: string; short: string } => {
  const dayNames: Record<DayKey, { fullKey: string; shortKey: string }> = {
    monday: { fullKey: "Monday", shortKey: "Mon" },
    tuesday: { fullKey: "Tuesday", shortKey: "Tue" },
    wednesday: { fullKey: "Wednesday", shortKey: "Wed" },
    thursday: { fullKey: "Thursday", shortKey: "Thu" },
    friday: { fullKey: "Friday", shortKey: "Fri" },
    saturday: { fullKey: "Saturday", shortKey: "Sat" },
    sunday: { fullKey: "Sunday", shortKey: "Sun" },
  };

  const day = dayNames[dayKey];
  return {
    full: i18n._(day.fullKey),
    short: i18n._(day.shortKey),
  };
};

const ALL_DAYS: DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

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
    <ModalUniversal visible={isOpen} onClose={onClose} animationType="fade">
      <View style={styles.modalContent}>
        <View style={styles.modalContainer}>
          <Shadow stretch>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{i18n._("Working hours")}</Text>
              <LinearGradientCustom style={styles.modalLine} />
            </View>
          </Shadow>
          <ScrollView style={styles.modalScrollView}>
            {ALL_DAYS.map((dayKey) => {
              const dayValue = workingHours[dayKey];
              const isWorking = dayValue !== null;
              const dayName = getDayName(dayKey, i18n);

              return (
                <View key={dayKey} style={styles.dayContainer}>
                  <CheckboxClassic
                    check={isWorking}
                    setCheck={() => handleDayToggle(dayKey)}
                    containerStyle={styles.checkboxContainer}
                  />
                  <Text style={styles.dayLabel}>{dayName.full}</Text>
                  {isWorking ? (
                    <View style={styles.timeContainer}>
                      <TimePicker
                        value={dayValue.open}
                        onChange={(time) =>
                          handleTimeChange(dayKey, "open", time)
                        }
                      />
                      <Text style={styles.timeSeparator}>-</Text>
                      <TimePicker
                        value={dayValue.close}
                        onChange={(time) =>
                          handleTimeChange(dayKey, "close", time)
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
