import { I18n } from "@lingui/core";
import { TWorkingHours } from "../../../storeRedux/apis/workshops/workshops.types";

type DayKey = keyof TWorkingHours;

export const useWorkingHoursHelpers = (i18n: I18n) => {
  const getDayName = (dayKey: DayKey): { full: string; short: string } => {
    switch (dayKey) {
      case "monday":
        return {
          full: i18n._("Monday"),
          short: i18n._("Mon"),
        };
      case "tuesday":
        return {
          full: i18n._("Tuesday"),
          short: i18n._("Tue"),
        };
      case "wednesday":
        return {
          full: i18n._("Wednesday"),
          short: i18n._("Wed"),
        };
      case "thursday":
        return {
          full: i18n._("Thursday"),
          short: i18n._("Thu"),
        };
      case "friday":
        return {
          full: i18n._("Friday"),
          short: i18n._("Fri"),
        };
      case "saturday":
        return {
          full: i18n._("Saturday"),
          short: i18n._("Sat"),
        };
      case "sunday":
        return {
          full: i18n._("Sunday"),
          short: i18n._("Sun"),
        };
      default:
        return {
          full: "",
          short: "",
        };
    }
  };
  return {
    getDayName,
  };
};
