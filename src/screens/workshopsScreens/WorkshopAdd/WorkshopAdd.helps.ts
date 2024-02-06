import { I18n } from "@lingui/core";

export const getErrorText = (
  type:
    | "title"
    | "description"
    | "phoneNumber"
    | "place"
    | "types"
    | "errorMessage",
  i18n: I18n
) => {
  if (type === "title")
    return {
      name: i18n._("Name of the workshop"),
      title: i18n._(
        "The text must contain a minimum of 5 and a maximum of 40 characters."
      ),
    };
  if (type === "place")
    return {
      name: i18n._("The place of the workshop"),
      title: i18n._("The location of the workshop must be selected."),
    };
  if (type === "description")
    return {
      name: i18n._("Description of the workshop"),
      title: i18n._(
        "The text must contain a minimum of 200 and a maximum of 9000 characters."
      ),
    };
  if (type === "phoneNumber")
    return {
      name: i18n._("Phone number the workshop"),
      title: i18n._("Please enter phone number"),
    };
  if (type === "types")
    return {
      name: i18n._("Types of workshop jobs"),
      title: i18n._("Please select at least one type"),
    };
  if (type === "errorMessage")
    return { name: "", title: i18n._("Incorrectly entered data") };
  return { name: "", title: "" };
};
