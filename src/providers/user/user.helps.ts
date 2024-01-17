import { UserDataT } from "./user.types";

export const getNamesUser = (
  userData: UserDataT | null
): { firstName: string; lastName: string } => {
  if (!userData) return { firstName: "", lastName: "" };
  if (userData.firstName || userData.lastName)
    return {
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
    };
  if (userData.googleDate?.given_name || userData.googleDate?.family_name)
    return {
      firstName: userData.googleDate?.given_name || "",
      lastName: userData.googleDate?.family_name || "",
    };
  return { firstName: "", lastName: "" };
};
