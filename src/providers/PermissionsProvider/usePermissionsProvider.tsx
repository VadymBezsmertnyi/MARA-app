import { useContext, useMemo } from "react";
import Constants from "expo-constants";

// providers
import { localesContext } from "../../../localization/localization.provider";

export const usePermissionsProviderState = () => {
  const { i18n } = useContext(localesContext);
  const nameApp = useMemo(
    () => Constants.expoConfig?.name || "M.A.R.A.(Moto Auto Road Assistance)",
    [Constants.expoConfig?.name]
  );
  const firstEvent = useMemo(() => i18n._("find nearby events, workshops"), []);
  const secondEvent = useMemo(
    () =>
      i18n._('for the "SOS" function so that other app users can assist you'),
    []
  );
  const titleLocationForeground = useMemo(
    () =>
      i18n._(
        "App {nameApp} collects location data to enable {firstEvent} even when the app is closed or not in use.",
        { nameApp, firstEvent }
      ),
    [nameApp]
  );
  const titleLocationBackground = useMemo(
    () =>
      i18n._(
        "App {nameApp} collects location data to enable {secondEvent} even when the app is closed or not in use.",
        { nameApp, secondEvent }
      ),
    [nameApp]
  );
  return {
    titleLocationForeground,
    titleLocationBackground,
  };
};
