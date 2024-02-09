import { I18n } from "@lingui/core";

export const getErrorText = (
  type: "eventName" | "location" | "finish" | "aboutEvent" | "errorMessage",
  i18n: I18n
) => {
  if (type === "eventName")
    return {
      name: i18n._("Name of the event"),
      title: i18n._(
        "The text must contain a minimum of 5 and a maximum of 20 characters."
      ),
    };
  if (type === "location")
    return {
      name: i18n._("The place of the event"),
      title: i18n._("The location of the event must be selected."),
    };
  if (type === "finish")
    return {
      name: i18n._("Date of the event"),
      title: i18n._("The end date must be greater than the start date."),
    };
  if (type === "aboutEvent")
    return {
      name: i18n._("Tell us about the event"),
      title: i18n._(
        "The text must contain a minimum of 20 and a maximum of 2000 characters."
      ),
    };
  if (type === "errorMessage")
    return { name: "", title: i18n._("Incorrectly entered data") };
  return { name: "", title: "" };
};
