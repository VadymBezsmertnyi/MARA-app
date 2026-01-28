import React, { FunctionComponent, useMemo } from "react";
import { Text, View } from "react-native";

// types
import { TWorkingHours } from "../../../../../storeRedux/apis/workshops/workshops.types";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// helps
import useWorkshopHelpers from "../../../WorkshopAdd/useWorkshopHelpers";

// styles
import { styles } from "./WorkingHoursDisplay.styles";

type DayKey = keyof TWorkingHours;

const WEEKDAYS: DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

const convert24To12 = (time24: string, is12Hour: boolean): string => {
  if (!time24 || !is12Hour) return time24;
  const [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export type WorkingHoursDisplayProps = {
  workingHours?: TWorkingHours | null;
};

export const WorkingHoursDisplay: FunctionComponent<
  WorkingHoursDisplayProps
> = ({ workingHours }) => {
  const { i18n, language } = useLocalesProvider();
  const { getDayName } = useWorkshopHelpers(i18n);
  const is12HourFormat = language === "en";

  const hasWorkingHours = useMemo(() => {
    if (!workingHours) return false;
    return Object.values(workingHours).some((day) => day !== null);
  }, [workingHours]);

  const scheduleText = useMemo(() => {
    if (!workingHours || !hasWorkingHours)
      return i18n._("Working hours unknown");

    const weekdayHours = WEEKDAYS.map((dayKey) => workingHours[dayKey]).filter(
      (hours) => hours !== null
    );
    const isWeekdaysSame =
      weekdayHours.length === 5 &&
      weekdayHours.every(
        (hours) =>
          hours?.open === weekdayHours[0]?.open &&
          hours?.close === weekdayHours[0]?.close
      );
    const saturdayHours = workingHours.saturday;
    const sundayHours = workingHours.sunday;

    const parts: string[] = [];
    if (isWeekdaysSame && weekdayHours[0]) {
      const mon = getDayName("monday");
      const fri = getDayName("friday");
      const openTime = convert24To12(weekdayHours[0].open, is12HourFormat);
      const closeTime = convert24To12(weekdayHours[0].close, is12HourFormat);
      parts.push(`${mon.short}-${fri.short}: ${openTime} - ${closeTime}`);
    } else
      WEEKDAYS.forEach((dayKey) => {
        const hours = workingHours[dayKey];
        const day = getDayName(dayKey);
        if (hours) {
          const openTime = convert24To12(hours.open, is12HourFormat);
          const closeTime = convert24To12(hours.close, is12HourFormat);
          parts.push(`${day.short}: ${openTime} - ${closeTime}`);
        } else parts.push(`${day.short}: ${i18n._("Day off")}`);
      });
    const sat = getDayName("saturday");
    if (saturdayHours) {
      const openTime = convert24To12(saturdayHours.open, is12HourFormat);
      const closeTime = convert24To12(saturdayHours.close, is12HourFormat);
      parts.push(`${sat.short}: ${openTime} - ${closeTime}`);
    } else parts.push(`${sat.short}: ${i18n._("Day off")}`);
    const sun = getDayName("sunday");
    if (sundayHours) {
      const openTime = convert24To12(sundayHours.open, is12HourFormat);
      const closeTime = convert24To12(sundayHours.close, is12HourFormat);
      parts.push(`${sun.short}: ${openTime} - ${closeTime}`);
    } else parts.push(`${sun.short}: ${i18n._("Day off")}`);

    return parts.join("\n");
  }, [workingHours, hasWorkingHours, i18n, is12HourFormat, getDayName]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{i18n._("Working hours")}</Text>
      <View style={styles.scheduleContainer}>
        <Text style={styles.scheduleText}>{scheduleText}</Text>
      </View>
    </View>
  );
};
