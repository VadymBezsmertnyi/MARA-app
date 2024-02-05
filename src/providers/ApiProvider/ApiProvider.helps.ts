import { Platform } from "react-native";
import * as Application from "expo-application";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { z } from "zod";

const appManifestEnvS = z.object({
  APP_DOMAIN_APP: z.string(),
  APP_DOMAIN_WEB: z.string(),
  APP_PORT: z.string(),
});

type AppManifestEnvT = z.infer<typeof appManifestEnvS>;

export const getEnv = (): AppManifestEnvT => {
  const parsedEnv = z.object({ developer: appManifestEnvS }).parse({
    developer: {
      APP_DOMAIN_WEB: "localhost",
      APP_DOMAIN_APP: "192.168.31.31",
      APP_PORT: "5008",
    },
  });
  return parsedEnv.developer;
};

export const getApiUrl = () => {
  const { APP_DOMAIN_WEB, APP_PORT } = getEnv();
  const appDomainApp = "192.168.50.62";
  const herokuServer =
    "https://moto-auto-road-assistant-9ba1127a6934.herokuapp.com";
  const api =
    Platform.OS === "web"
      ? `http://${APP_DOMAIN_WEB}:${APP_PORT}`
      : `http://${appDomainApp}:${APP_PORT}`;
  return herokuServer || api;
};

export const getDeviceId = async () => {
  if (Platform.OS === "android") {
    return Application.androidId;
  }
  const deviceId = await SecureStore.getItemAsync("deviceId");

  if (!deviceId) {
    const newDeviceId = Constants.installationId; //or generate uuid
    await SecureStore.setItemAsync("deviceId", newDeviceId);
    return newDeviceId;
  }

  return deviceId;
};
