import { I18n } from "@lingui/core";

type NameKeyType =
  | "eventName"
  | "location"
  | "finish"
  | "aboutEvent"
  | "errorMessage"
  | "title"
  | "description"
  | "phoneNumber"
  | "place"
  | "types";

export const useErrors = (i18n: I18n) => {
  const getErrorText = (
    type: NameKeyType,
    options: { min?: number; max?: number; otherName?: string }
  ) => {
    const { min, max, otherName } = options;
    if (i18n) {
      if (type === "eventName")
        return {
          name: i18n._("Name of the {otherName}", { otherName }),
          title: i18n._(
            `The text must contain a minimum of {min} and a maximum of {max} characters.`,
            { min, max }
          ),
        };
      if (type === "location")
        return {
          name: i18n._("The place of the {otherName}", { otherName }),
          title: i18n._("The location of the {otherName} must be selected.", {
            otherName,
          }),
        };
      if (type === "finish")
        return {
          name: i18n._("Date of the {otherName}", { otherName }),
          title: i18n._("The end date must be greater than the start date."),
        };
      if (type === "aboutEvent")
        return {
          name: i18n._("Tell us about the {otherName}", { otherName }),
          title: i18n._(
            "The text must contain a minimum of {min} and a maximum of {max} characters.",
            { min, max }
          ),
        };
      if (type === "title")
        return {
          name: i18n._("Name of the {otherName}", { otherName }),
          title: i18n._(
            "The text must contain a minimum of {min} and a maximum of {max} characters.",
            { min, max }
          ),
        };
      if (type === "place")
        return {
          name: i18n._("The place of the {otherName}", { otherName }),
          title: i18n._("The location of the {otherName} must be selected.", {
            otherName,
          }),
        };
      if (type === "description")
        return {
          name: i18n._("Description of the {otherName}", { otherName }),
          title: i18n._(
            "The text must contain a minimum of {min} and a maximum of {max} characters.",
            { min, max }
          ),
        };
      if (type === "phoneNumber")
        return {
          name: i18n._("Phone number the {otherName}", { otherName }),
          title: i18n._("Please enter phone number"),
        };
      if (type === "types")
        return {
          name: i18n._("Types of {otherName} jobs", { otherName }),
          title: i18n._("Please select at least one type"),
        };
      if (type === "errorMessage")
        return { name: "", title: i18n._("Incorrectly entered data") };
      return { name: "", title: "" };
    }
    return { name: "", title: "" };
  };

  return { getErrorText };
};
