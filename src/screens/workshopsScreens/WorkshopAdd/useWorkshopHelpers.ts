import { I18n } from "@lingui/core";
import {
  TWorkingHours,
  TContact,
} from "../../../storeRedux/apis/workshops/workshops.types";

type DayKey = keyof TWorkingHours;

type ContactTypeOption = {
  type: TContact["type"];
  title: string;
};

const CONTACT_TYPES_DEFAULT: ContactTypeOption[] = [
  { type: "phone", title: "Phone" },
  { type: "email", title: "Email" },
  { type: "viber", title: "Viber" },
  { type: "telegram", title: "Telegram" },
  { type: "whatsapp", title: "WhatsApp" },
  { type: "instagram", title: "Instagram" },
  { type: "facebook", title: "Facebook" },
];

const useWorkshopHelpers = (i18n: I18n) => {
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

  const getContactTypeTitle = (type: TContact["type"]): string => {
    switch (type) {
      case "phone":
        return i18n._("Phone");
      case "email":
        return i18n._("Email");
      case "viber":
        return i18n._("Viber");
      case "telegram":
        return i18n._("Telegram");
      case "whatsapp":
        return i18n._("WhatsApp");
      case "instagram":
        return i18n._("Instagram");
      case "facebook":
        return i18n._("Facebook");
      default:
        return "";
    }
  };

  const getContactTypes = (): ContactTypeOption[] => {
    return CONTACT_TYPES_DEFAULT.map((contactType) => ({
      ...contactType,
      title: getContactTypeTitle(contactType.type),
    }));
  };

  return {
    getDayName,
    getContactTypeTitle,
    getContactTypes,
  };
};

export default useWorkshopHelpers;
