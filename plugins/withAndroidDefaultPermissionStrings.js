const { withStringsXml } = require("@expo/config-plugins");

module.exports = function withAndroidDefaultPermissionStrings(config) {
  return withStringsXml(config, (config) => {
    const xml = config.modResults;
    xml.resources = xml.resources || {};
    xml.resources.string = xml.resources.string || [];

    const ensure = (name, value) => {
      const arr = xml.resources.string;
      const exists = arr.some((x) => x.$?.name === name);
      if (!exists) arr.push({ $: { name }, _: value });
    };

    // MUST exist in default locale because translations exist:
    ensure("cameraPermission", "For taking photos");
    ensure("photosPermission", "For accessing photos in your library");
    ensure("microphonePermission", "For recording audio");

    ensure(
      "locationAlwaysAndWhenInUsePermission",
      "Allow $(PRODUCT_NAME) to use your location."
    );
    ensure(
      "locationAlwaysPermission",
      "Allow $(PRODUCT_NAME) to use your location."
    );
    ensure(
      "locationWhenInUsePermission",
      "Allow $(PRODUCT_NAME) to use your location."
    );

    return config;
  });
};
