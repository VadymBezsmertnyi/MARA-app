import React, { FunctionComponent, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

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

const DAYS_OF_WEEK = [
  { key: "monday" as const, labelKey: "Monday", shortKey: "Пн" },
  { key: "tuesday" as const, labelKey: "Tuesday", shortKey: "Вт" },
  { key: "wednesday" as const, labelKey: "Wednesday", shortKey: "Ср" },
  { key: "thursday" as const, labelKey: "Thursday", shortKey: "Чт" },
  { key: "friday" as const, labelKey: "Friday", shortKey: "Пт" },
  { key: "saturday" as const, labelKey: "Saturday", shortKey: "Сб" },
  { key: "sunday" as const, labelKey: "Sunday", shortKey: "Нд" },
] as const;

export const WorkingHoursPicker: FunctionComponent<WorkingHoursPickerProps> = ({
  value,
  onChange,
  errorMessage,
}) => {
  const { i18n } = useLocalesProvider();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scheduleText = useMemo(() => {
    const weekdays = DAYS_OF_WEEK.slice(0, 5);
    const weekdayHours = weekdays
      .map((day) => value[day.key])
      .filter((hours) => hours !== null);
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
    if (isWeekdaysSame && weekdayHours[0])
      parts.push(`Пн-Пт: ${weekdayHours[0].open} - ${weekdayHours[0].close}`);
    else
      weekdays.forEach((day) => {
        const hours = value[day.key];
        if (hours) {
          parts.push(`${day.shortKey}: ${hours.open} - ${hours.close}`);
        }
      });
    if (saturdayHours)
      parts.push(`Сб: ${saturdayHours.open} - ${saturdayHours.close}`);
    if (sundayHours)
      parts.push(`Нд: ${sundayHours.open} - ${sundayHours.close}`);

    return parts.length > 0 ? parts.join("\n") : i18n._("Not specified");
  }, [value, i18n]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{i18n._("Working hours")}</Text>
      <View style={styles.scheduleContainer}>
        <Text style={styles.scheduleText}>{scheduleText}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsModalOpen(true)}
        >
          <Text style={styles.editButtonText}>{i18n._("Edit")}</Text>
        </TouchableOpacity>
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
