import "dotenv/config";

const EXPO_PUBLIC_API_KEY_GOOGLE_WEB_PLACES = process.env
  .EXPO_PUBLIC_API_KEY_GOOGLE_WEB_PLACES as string;
const EXPO_PUBLIC_IOS_URL_SCHEME = process.env
  .EXPO_PUBLIC_IOS_URL_SCHEME as string;
const EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN = process.env
  .EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN as string;
const EXPO_PUBLIC_CLIENT_ID_GOOGLE_WEB = process.env
  .EXPO_PUBLIC_CLIENT_ID_GOOGLE_WEB as string;
const EXPO_PUBLIC_APP_ID_ONESIGNAL = process.env
  .EXPO_PUBLIC_APP_ID_ONESIGNAL as string;

export const expo = {
  name: "M.A.R.A",
  slug: "mara",
  version: "1.1.0",
  runtimeVersion: "1.1.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "cover",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  platforms: ["ios", "android"],
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.motoauto.mara",
    scheme: "maraapp",
    googleServicesFile: "./GoogleService-Info.plist",
    buildNumber: "35",
    usesAppleSignIn: true,
    infoPlist: {
      LSApplicationQueriesSchemes: [
        "lyft",
        "tel",
        "telprompt",
        "telegram",
        "tg",
        "ip-api.com",
      ],
      UIBackgroundModes: ["fetch", "remote-notification"],
      NSSpeechRecognitionUsageDescription:
        "Allow recognition to access your speech recognition",
      CFBundleURLTypes: [
        {
          CFBundleURLSchemes: [EXPO_PUBLIC_IOS_URL_SCHEME],
        },
      ],
      CFBundleAllowMixedLocalizations: true,
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true,
        NSExceptionDomains: {
          localhost: {
            NSExceptionAllowsInsecureHTTPLoads: true,
          },
        },
      },
      ["UISupportedInterfaceOrientations~ipad"]: [],
    },
    config: {
      googleMapsApiKey: EXPO_PUBLIC_API_KEY_GOOGLE_WEB_PLACES,
      usesNonExemptEncryption: false,
    },
    associatedDomains: ["applinks:mara-app.onelink.me"],
  },
  android: {
    versionCode: 35,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    googleServicesFile: "./google-services.json",
    package: "com.motoauto.mara",
    scheme: "maraapp",
    permissions: [
      "CAMERA",
      "RECORD_AUDIO",
      "CAMERA_ROLL",
      "READ_EXTERNAL_STORAGE",
      "WRITE_EXTERNAL_STORAGE",
      "USE_BIOMETRIC",
      "USE_FINGERPRINT",
      "INTERNET",
      "ACCESS_NETWORK_STATE",
      "GET_ACCOUNTS",
      "SYSTEM_ALERT_WINDOW",
      "RECEIVE_BOOT_COMPLETED",
      "WAKE_LOCK",
      "ACCESS_FINE_LOCATION",
      "ACCESS_COARSE_LOCATION",
      "ACCESS_BACKGROUND_LOCATION",
      "com.google.android.gms.permission.AD_ID",
      "com.google.android.c2dm.permission.RECEIVE",
      "com.google.android.gms.permission.ACTIVITY_RECOGNITION",
      "com.google.android.providers.gsf.permission.READ_GSERVICES",
    ],
    config: {
      googleMaps: {
        apiKey: EXPO_PUBLIC_API_KEY_GOOGLE_WEB_PLACES,
      },
    },
  },
  locales: {
    en: "./localization/app-config/en.json",
    uk: "./localization/app-config/uk.json",
    fr: "./localization/app-config/fr.json",
    de: "./localization/app-config/de.json",
    es: "./localization/app-config/es.json",
    it: "./localization/app-config/it.json",
    sv: "./localization/app-config/sv.json",
    da: "./localization/app-config/da.json",
    fi: "./localization/app-config/fi.json",
    pl: "./localization/app-config/pl.json",
    cs: "./localization/app-config/cs.json",
    hu: "./localization/app-config/hu.json",
    el: "./localization/app-config/el.json",
    ro: "./localization/app-config/ro.json",
    lt: "./localization/app-config/lt.json",
    lv: "./localization/app-config/lv.json",
    be: "./localization/app-config/be.json",
    sk: "./localization/app-config/sk.json",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "c9b5a1d2-759e-4704-9171-69ad591def63",
    },
    oneSignalAppId: EXPO_PUBLIC_APP_ID_ONESIGNAL,
  },
  owner: "fop_vadym_bezsmertnyi",
  plugins: [
    [
      "react-native-maps",
      {
        iosGoogleMapsApiKey: EXPO_PUBLIC_API_KEY_GOOGLE_WEB_PLACES,
        androidGoogleMapsApiKey: EXPO_PUBLIC_API_KEY_GOOGLE_WEB_PLACES,
      },
    ],
    "@react-native-firebase/app",
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
          forceStaticLinking: ["RNFBApp"],
        },
      },
    ],
    [
      "onesignal-expo-plugin",
      {
        mode: "development",
      },
    ],
    "expo-localization",
    "expo-apple-authentication",
    [
      "@react-native-google-signin/google-signin",
      {
        iosUrlScheme: EXPO_PUBLIC_IOS_URL_SCHEME,
        webClientId: EXPO_PUBLIC_CLIENT_ID_GOOGLE_WEB,
      },
    ],
    [
      "expo-local-authentication",
      {
        faceIDPermission: "Allow $(PRODUCT_NAME) to use Face ID.",
      },
    ],
    [
      "expo-updates",
      {
        username: "clyga_xaocy",
      },
    ],
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "Allow $(PRODUCT_NAME) to use your location.",
        locationAlwaysPermission: "Allow $(PRODUCT_NAME) to use your location",
        locationWhenInUsePermission:
          "Allow $(PRODUCT_NAME) to use your location",
        isIosBackgroundLocationEnabled: false,
        isAndroidBackgroundLocationEnabled: true,
        isAndroidForegroundServiceEnabled: true,
      },
    ],
    [
      "expo-image-picker",
      {
        photosPermission:
          "The app accesses your photos to let you share them with your friends.",
        cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
        microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone",
      },
    ],
    [
      "react-native-fbsdk-next",
      {
        appID: "392972260073420",
        displayName: "M.A.R.A.",
        clientToken: EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN,
        scheme: "fb392972260073420",
        advertiserIDCollectionEnabled: false,
        autoLogAppEventsEnabled: false,
        isAutoInitEnabled: true,
      },
    ],
    "expo-router",
    "expo-font",
    "expo-secure-store",
    ["react-native-appsflyer", { shouldUseStrictMode: true }],
    "@react-native-community/datetimepicker",
  ],
  updates: {
    url: "https://u.expo.dev/c9b5a1d2-759e-4704-9171-69ad591def63",
  },
};
