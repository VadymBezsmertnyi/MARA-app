import React, { FunctionComponent, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

// types
import { TWorkingHours } from "../../../../../storeRedux/apis/workshops/workshops.types";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// components
import { ModalWorkingHours } from "./ModalWorkingHours";

// helps
import useWorkshopHelpers from "../../useWorkshopHelpers";

// styles
import { styles } from "./WorkingHoursPicker.styles";

export type WorkingHoursPickerProps = {
  value: TWorkingHours;
  onChange: (value: TWorkingHours) => void;
  errorMessage?: string;
};

type DayKey = keyof TWorkingHours;

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
  const { getDayName } = useWorkshopHelpers(i18n);

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
      const mon = getDayName("monday");
      const fri = getDayName("friday");
      parts.push(
        `${mon.short}-${fri.short}: ${weekdayHours[0].open} - ${weekdayHours[0].close}`
      );
    } else
      WEEKDAYS.forEach((dayKey) => {
        const hours = value[dayKey];
        const day = getDayName(dayKey);
        if (hours) parts.push(`${day.short}: ${hours.open} - ${hours.close}`);
        else parts.push(`${day.short}: ${i18n._("Day off")}`);
      });
    const sat = getDayName("saturday");
    if (saturdayHours)
      parts.push(
        `${sat.short}: ${saturdayHours.open} - ${saturdayHours.close}`
      );
    else parts.push(`${sat.short}: ${i18n._("Day off")}`);
    const sun = getDayName("sunday");
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
