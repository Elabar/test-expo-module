# rn-tuya

RN wrapper for tuya smart life SDK

# Android
## Preparing the aar file
### Get the aar file
Get the `security-algorithm.zip` from [tuya IoT platform](https://developer.tuya.com/en/docs/app-development/integrated?id=Ka69nt96cw0uj#title-5-Step%203%3A%20Integrate%20with%20security%20component).
### Removing `libc++shared.so`
1. Unzip the aar file from the zip file you downloaded
```
unzip security-algorithm.aar -d tempFolder
```
2. Manually remove `libc++_shared.so` from `tempFolder/jni/*/libc++_shared.so`
3. Repack the aar file
```
zip -r ../security-algorithm-stripped.aar *
```
### Adding the aar file to your project
place the `security-algorithm-stripped.aar` under `android/app/libs/security-algorithm-stripped.aar`

## Add maven repo
Add the following lines in `android/build.gradle`
```
allprojects {
    repositories {
        maven { url 'https://maven-other.tuya.com/repository/maven-releases/' }
        maven { url "https://maven-other.tuya.com/repository/maven-commercial-releases/" }
        // ...
    }
}
```

## Add dependency
add the following lines in `android/app/build.gradle`
```
android {
   defaultConfig {
      ndk {
         abiFilters "armeabi-v7a", "arm64-v8a"
      }
   }
}
dependencies {
   implementation fileTree(dir: 'libs', include: ['*.aar'])
   implementation 'com.thingclips.smart:thingsmart:5.0.1'
}
```

## Add key and secret
Add the following lines in `android/app/src/main/AndroidManifest.xml`
```
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="com.dasher.smarthome" xmlns:tools="http://schemas.android.com/tools">
  
  <application android:name=".MainApplication" android:label="@string/app_name" android:icon="@mipmap/ic_launcher" android:roundIcon="@mipmap/ic_launcher_round" android:allowBackup="true" android:theme="@style/AppTheme" android:usesCleartextTraffic="true" tools:replace="android:allowBackup">
    <meta-data android:name="THING_SMART_APPKEY" android:value="key"/>
    <meta-data android:name="THING_SMART_SECRET" android:value="secret"/>
  </application>
</manifest>
```
Make sure you added `xmlns:tools="http://schemas.android.com/tools"` in `manifest` and `tools:replace="android:allowBackup"` in `application` as well.

## Configuring keystore
You have to follow steps [here](https://developer.tuya.com/en/docs/app-development/integrated?id=Ka69nt96cw0uj#title-6-Step%204%3A%20Configure%20AppKey%2C%20AppSecret%2C%20and%20certificate%20signature) to configure to sign with a certificate, and upload the SHA256 of the certificate to tuya IoT.

## Initialize the SDK
Add the the following lines in `android/app/src/main/java/xxx/xxx/xxx/MainApplication.java`
```
import com.thingclips.smart.home.sdk.ThingHomeSdk; // <-- import the SDK

  @Override
  public void onCreate() {
    super.onCreate();
    ThingHomeSdk.init(this); // <-- init the SDK
    // ...
  }
```
# API documentation

- [Documentation for the main branch](https://github.com/expo/expo/blob/main/docs/pages/versions/unversioned/sdk/rn-tuya.md)
- [Documentation for the latest stable release](https://docs.expo.dev/versions/latest/sdk/rn-tuya/)

# Installation in managed Expo projects

For [managed](https://docs.expo.dev/versions/latest/introduction/managed-vs-bare/) Expo projects, please follow the installation instructions in the [API documentation for the latest stable release](#api-documentation). If you follow the link and there is no documentation available then this library is not yet usable within managed projects &mdash; it is likely to be included in an upcoming Expo SDK release.

# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Add the package to your npm dependencies

```
npm install rn-tuya
```

### Configure for iOS

Run `npx pod-install` after installing the npm package.


### Configure for Android



# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide]( https://github.com/expo/expo#contributing).
