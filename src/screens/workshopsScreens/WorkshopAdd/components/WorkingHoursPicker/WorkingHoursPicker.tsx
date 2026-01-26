import React, { FunctionComponent, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { I18n } from "@lingui/core";

// types
import { TWorkingHours } from "../../../../../storeRedux/apis/workshops/workshops.types";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// components
import { ModalWorkingHours } from "./ModalWorkingHours";

// styles
import { styles } from "./WorkingHoursPicker.styles";

export type WorkingHoursPickerProps = {
  value: TWorkingHours;
  onChange: (value: TWorkingHours) => void;
  errorMessage?: string;
};

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

const WEEKDAYS: DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

export const WorkingHoursPicker: FunctionComponent<WorkingHoursPickerProps> = ({
  value,
  onChange,
  errorMessage,
}) => {
  const { i18n } = useLocalesProvider();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scheduleText = useMemo(() => {
    const weekdayHours = WEEKDAYS.map((dayKey) => value[dayKey]).filter(
      (hours) => hours !== null
    );
    const isWeekdaysSame =
      weekdayHours.length === 5 &&
      weekdayHours.every(
        (hours) =>
          hours?.open === weekdayHours[0]?.open &&
          hours?.close === weekdayHours[0]?.close
      );
    const saturdayHours = value.saturday;
    const sundayHours = value.sunday;

    const parts: string[] = [];
    if (isWeekdaysSame && weekdayHours[0]) {
      const mon = getDayName("monday", i18n);
      const fri = getDayName("friday", i18n);
      parts.push(
        `${mon.short}-${fri.short}: ${weekdayHours[0].open} - ${weekdayHours[0].close}`
      );
    } else
      WEEKDAYS.forEach((dayKey) => {
        const hours = value[dayKey];
        const day = getDayName(dayKey, i18n);
        if (hours) parts.push(`${day.short}: ${hours.open} - ${hours.close}`);
        else parts.push(`${day.short}: ${i18n._("Day off")}`);
      });
    const sat = getDayName("saturday", i18n);
    if (saturdayHours)
      parts.push(
        `${sat.short}: ${saturdayHours.open} - ${saturdayHours.close}`
      );
    else parts.push(`${sat.short}: ${i18n._("Day off")}`);
    const sun = getDayName("sunday", i18n);
    if (sundayHours)
      parts.push(`${sun.short}: ${sundayHours.open} - ${sundayHours.close}`);
    else parts.push(`${sun.short}: ${i18n._("Day off")}`);

    return parts.join("\n");
  }, [value, i18n]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{i18n._("Working hours")}</Text>
      <View style={styles.inputWrapper}>
        <View style={styles.scheduleContainer}>
          <Text style={styles.scheduleText}>{scheduleText}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsModalOpen(true)}
          >
            <Text style={styles.editButtonText}>{i18n._("Edit")}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      <ModalWorkingHours
        isOpen={isModalOpen}
        value={value}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onChange}
      />
    </View>
  );
};
