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
  { key: "monday" as const, labelKey: "Monday", shortKey: "Mon" },
  { key: "tuesday" as const, labelKey: "Tuesday", shortKey: "Tue" },
  { key: "wednesday" as const, labelKey: "Wednesday", shortKey: "Wed" },
  { key: "thursday" as const, labelKey: "Thursday", shortKey: "Thu" },
  { key: "friday" as const, labelKey: "Friday", shortKey: "Fri" },
  { key: "saturday" as const, labelKey: "Saturday", shortKey: "Sat" },
  { key: "sunday" as const, labelKey: "Sunday", shortKey: "Sun" },
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
    if (isWeekdaysSame && weekdayHours[0]) {
      const monShort = i18n._("Mon");
      const friShort = i18n._("Fri");
      parts.push(
        `${monShort}-${friShort}: ${weekdayHours[0].open} - ${weekdayHours[0].close}`
      );
    } else
      weekdays.forEach((day) => {
        const hours = value[day.key];
        const dayShort = i18n._(day.shortKey);
        if (hours) parts.push(`${dayShort}: ${hours.open} - ${hours.close}`);
        else parts.push(`${dayShort}: ${i18n._("Day off")}`);
      });
    const satShort = i18n._("Sat");
    if (saturdayHours)
      parts.push(`${satShort}: ${saturdayHours.open} - ${saturdayHours.close}`);
    else parts.push(`${satShort}: ${i18n._("Day off")}`);
    const sunShort = i18n._("Sun");
    if (sundayHours)
      parts.push(`${sunShort}: ${sundayHours.open} - ${sundayHours.close}`);
    else parts.push(`${sunShort}: ${i18n._("Day off")}`);

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
