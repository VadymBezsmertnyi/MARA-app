import { Platform } from "react-native";
import * as Application from "expo-application";
import * as SecureStore from "expo-secure-store";
import { z } from "zod";

const appManifestEnvS = z.object({
  APP_DOMAIN_APP: z.string(),
  APP_DOMAIN_WEB: z.string(),
  APP_PORT: z.string(),
});

type AppManifestEnvT = z.infer<typeof appManifestEnvS>;

const IS_MOBILE_INTERNET = false;
const DEFAULT_APP_DOMAIN_IP_LAN = "192.168.50.248";
const DEFAULT_APP_DOMAIN_IP_MOBILE = "172.20.10.3";
const DEFAULT_APP_DOMAIN_IP = IS_MOBILE_INTERNET
  ? DEFAULT_APP_DOMAIN_IP_MOBILE
  : DEFAULT_APP_DOMAIN_IP_LAN;

export const getEnv = (): AppManifestEnvT => {
  const parsedEnv = z.object({ developer: appManifestEnvS }).parse({
    developer: {
      APP_DOMAIN_WEB: "localhost",
      APP_DOMAIN_APP: DEFAULT_APP_DOMAIN_IP,
      APP_PORT: "5008",
    },
  });
  return parsedEnv.developer;
};

export const getApiUrl = () => {
  const { APP_DOMAIN_WEB, APP_PORT } = getEnv();
  const appDomainApp = DEFAULT_APP_DOMAIN_IP;
  const herokuServer = process.env.EXPO_PUBLIC_HEROKU_URL as string;
  const api =
    Platform.OS === "web"
      ? `http://${APP_DOMAIN_WEB}:${APP_PORT}`
      : `http://${appDomainApp}:${APP_PORT}`;
  if (__DEV__) return api;
  return herokuServer;
};

export const getDeviceId = async () => {
  if (Platform.OS === "android") return Application.getAndroidId();

  const deviceId = await SecureStore.getItemAsync("deviceId");

  if (!deviceId) {
    const newDeviceId = await Application.getIosIdForVendorAsync();
    if (newDeviceId) await SecureStore.setItemAsync("deviceId", newDeviceId);
    return newDeviceId;
  }

  return deviceId;
};
