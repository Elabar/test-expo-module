import {
  AndroidConfig,
  ConfigPlugin,
  withAndroidManifest,
  withAppBuildGradle,
  withMainApplication,
} from "expo/config-plugins";

const applyAndroidPackage = (mainApplication: string) => {
  const thingImport = `import com.thingclips.smart.home.sdk.ThingHomeSdk;\n`;
  const thingInit = `ThingHomeSdk.init(this);\n`;

  if (!mainApplication.includes(thingImport)) {
    mainApplication = mainApplication.replace(
      `import android.app.Application;`,
      `import android.app.Application;\n${thingImport}`
    );
  }

  if (!mainApplication.includes(thingInit)) {
    console.log(`super.onCreate();\n${thingInit}`);
    mainApplication = mainApplication.replace(
      `super.onCreate();`,
      `super.onCreate();\n${thingInit}`
    );
  }

  return mainApplication;
};

const withMyApiKey: ConfigPlugin<{ key: string; secret: string }> = (
  config,
  { key, secret }
) => {
  config = withAndroidManifest(config, (config) => {
    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(
      config.modResults
    );
    AndroidConfig.Manifest.addMetaDataItemToMainApplication(
      mainApplication,
      "THING_SMART_APPKEY",
      key
    );

    AndroidConfig.Manifest.addMetaDataItemToMainApplication(
      mainApplication,
      "THING_SMART_SECRET",
      secret
    );
    AndroidConfig.Manifest.ensureToolsAvailable(config.modResults);
    mainApplication.$["tools:replace"] = "android:allowBackup";
    return config;
  });

  config = withAppBuildGradle(config, (config) => {
    const androidBuildGradle = config.modResults;
    if (
      !androidBuildGradle.contents.includes("com.thingclips.smart:thingsmart")
    ) {
      androidBuildGradle.contents = androidBuildGradle.contents.replace(
        `implementation("com.facebook.react:react-android")`,
        `implementation("com.facebook.react:react-android")\nimplementation 'com.thingclips.smart:thingsmart:5.0.1'\nimplementation fileTree(dir: 'libs', include: ['*.aar'])`
      );
    }

    return config;
  });

  config = withMainApplication(config, (config) => {
    const androidMainApplication = config.modResults;

    androidMainApplication.contents = applyAndroidPackage(
      androidMainApplication.contents
    );
    return config;
  });
  return config;
};

export default withMyApiKey;
