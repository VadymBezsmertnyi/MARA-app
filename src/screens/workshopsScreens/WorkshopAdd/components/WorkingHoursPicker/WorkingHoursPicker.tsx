import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

// types
import { TWorkingHours } from "../../../../../storeRedux/apis/workshops/workshops.types";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// components
import { CheckboxClassic } from "../../../../../components/CheckboxClassic/CheckboxClassic";
import { TimePicker } from "./TimePicker";

// styles
import { styles } from "./WorkingHoursPicker.styles";

export type WorkingHoursPickerProps = {
  value: TWorkingHours;
  onChange: (value: TWorkingHours) => void;
  errorMessage?: string;
};

const DAYS_OF_WEEK = [
  { key: "monday" as const, labelKey: "Monday" },
  { key: "tuesday" as const, labelKey: "Tuesday" },
  { key: "wednesday" as const, labelKey: "Wednesday" },
  { key: "thursday" as const, labelKey: "Thursday" },
  { key: "friday" as const, labelKey: "Friday" },
  { key: "saturday" as const, labelKey: "Saturday" },
  { key: "sunday" as const, labelKey: "Sunday" },
] as const;

export const WorkingHoursPicker: FunctionComponent<WorkingHoursPickerProps> = ({
  value,
  onChange,
  errorMessage,
}) => {
  const { i18n } = useLocalesProvider();

  const handleDayToggle = (dayKey: keyof TWorkingHours) => {
    const currentDay = value[dayKey];
    if (currentDay) {
      const newValue = {
        ...value,
        [dayKey]: null,
      };
      onChange(newValue);
    } else {
      const newValue = {
        ...value,
        [dayKey]: { open: "08:00", close: "18:00" },
      };
      onChange(newValue);
    }
  };

  const handleTimeChange = (
    dayKey: keyof TWorkingHours,
    timeType: "open" | "close",
    timeValue: string
  ) => {
    const currentDay = value[dayKey];
    if (!currentDay) return;

    const newValue = {
      ...value,
      [dayKey]: {
        ...currentDay,
        [timeType]: timeValue,
      },
    };
    onChange(newValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{i18n._("Working hours")}</Text>
      {DAYS_OF_WEEK.map((day) => {
        const dayValue = value[day.key];
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
                  onChange={(time) => handleTimeChange(day.key, "open", time)}
                />
                <Text style={styles.timeSeparator}>-</Text>
                <TimePicker
                  value={dayValue.close}
                  onChange={(time) => handleTimeChange(day.key, "close", time)}
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
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};
