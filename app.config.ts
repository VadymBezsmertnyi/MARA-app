const EXPO_PUBLIC_API_KEY_GOOGLE_WEB_PLACES = process.env
  .EXPO_PUBLIC_API_KEY_GOOGLE_WEB_PLACES as string;
const EXPO_PUBLIC_IOS_URL_SCHEME = process.env
  .EXPO_PUBLIC_IOS_URL_SCHEME as string;
const EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN = process.env
  .EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN as string;
const EXPO_PUBLIC_CLIENT_ID_GOOGLE_WEB = process.env
  .EXPO_PUBLIC_CLIENT_ID_GOOGLE_WEB as string;

export const expo = {
  name: "M.A.R.A",
  slug: "mara",
  version: "1.0.0",
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
    bundleIdentifier: "moto.auto.road.assistant",
    googleServicesFile: "./GoogleService-Info.plist",
    buildNumber: "1",
    usesAppleSignIn: true,
    infoPlist: {
      LSApplicationQueriesSchemes: ["lyft"],
      NSFaceIDUsageDescription: "Allow $(PRODUCT_NAME) to use Face ID.",
      UIApplicationShortcutItemTitle: "ADD_ITEM_SHORTCUT_TITLE",
      NSCameraUsageDescription: "Доступ до камери для фото профілю",
      NSPhotoLibraryUsageDescription: "Доступ до фотогалереї для фото профілю",
      NSMicrophoneUsageDescription:
        "We need microphone access for recording audio",
      NSCalendarsUsageDescription: "Доступ до календаря для планування подій",
      NSContactsUsageDescription: "Доступ до контактів для імпорту інформації",
      NSAppleMusicUsageDescription: "Доступ до Apple Music для імпорту музики",
      UIBackgroundModes: ["audio"],
      NSSpeechRecognitionUsageDescription:
        "Allow recognition to access your speech recognition",
      CFBundleURLTypes: [
        {
          CFBundleURLSchemes: [EXPO_PUBLIC_IOS_URL_SCHEME],
        },
      ],
    },
    config: {
      googleMapsApiKey: EXPO_PUBLIC_API_KEY_GOOGLE_WEB_PLACES,
      usesNonExemptEncryption: false,
    },
  },
  android: {
    versionCode: 9,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    googleServicesFile: "./google-services.json",
    package: "com.motoauto.mara",
    scheme: "maraapp",
    permissions: [
      "RECORD_AUDIO",
      "CAMERA_ROLL",
      "READ_EXTERNAL_STORAGE",
      "WRITE_EXTERNAL_STORAGE",
      "USE_BIOMETRIC",
      "INTERNET",
      "ACCESS_NETWORK_STATE",
      "GET_ACCOUNTS",
      "SYSTEM_ALERT_WINDOW",
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
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "c9b5a1d2-759e-4704-9171-69ad591def63",
    },
  },
  owner: "fop_vadym_bezsmertnyi",
  plugins: [
    "./plugins/react-native-maps-plugin",
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
  ],
  runtimeVersion: {
    policy: "nativeVersion",
  },
  updates: {
    url: "https://u.expo.dev/c9b5a1d2-759e-4704-9171-69ad591def63",
  },
};
