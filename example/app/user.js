import * as React from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as RnTuya from "rn-tuya";

import { SnackDispatchContext } from "../hooks/useSnack";

export default function User() {
  const [userName, setUserName] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const snackDispatcher = React.useContext(SnackDispatchContext);

  return (
    <View style={styles.container}>
      <TextInput
        label="Username/Email"
        value={userName}
        onChangeText={setUserName}
        style={{ width: "100%" }}
      />
      <TextInput
        label="Country Code"
        value={countryCode}
        onChangeText={setCountryCode}
        style={{ width: "100%" }}
      />
      <TextInput
        secureTextEntry
        textContentType="password"
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={{ width: "100%" }}
      />
      <TextInput
        label="Verification code"
        value={verificationCode}
        onChangeText={setVerificationCode}
        style={{ width: "100%" }}
      />
      <Button
        mode="contained"
        onPress={async () => {
          try {
            if (!userName || !countryCode) {
              throw new Error("username and country code is required");
            }
            await RnTuya.sendVerifyCodeWithUserName({
              userName,
              region: "",
              countryCode,
              type: 1,
            });
            snackDispatcher({ type: "add", message: "Success" });
          } catch (err) {
            snackDispatcher({ type: "add", message: err.message });
          }
        }}
      >
        Get Code
      </Button>
      <Button
        mode="contained"
        onPress={async () => {
          try {
            if (!userName || !countryCode || !password) {
              throw new Error(
                "username, password and country code is required"
              );
            }
            const user = await RnTuya.loginWithEmail({
              countryCode,
              email: userName,
              passwd: password,
            });
            snackDispatcher({ type: "add", message: "Success" });
          } catch (err) {
            snackDispatcher({ type: "add", message: err.message });
          }
        }}
      >
        Login
      </Button>
      <Button
        mode="contained"
        onPress={async () => {
          try {
            if (!verificationCode || !userName || !countryCode || !password) {
              throw new Error(
                "verificationCode, username, password, and country code is required"
              );
            }
            await RnTuya.registerAccountWithEmail({
              countryCode,
              email: userName,
              passwd: password,
              code: verificationCode,
            });
            snackDispatcher({ type: "add", message: "Success" });
          } catch (err) {
            snackDispatcher({ type: "add", message: err.message });
          }
        }}
      >
        Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
