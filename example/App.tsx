import * as React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as RnTuya from "rn-tuya";

export default function App() {
  const [theme, setTheme] = React.useState<string>("default");

  // Toggle between dark and light theme
  const nextTheme = theme === "dark" ? "light" : "dark";

  React.useEffect(() => {
    const subscription = RnTuya.addThemeListener(({ theme: newTheme }) => {
      setTheme(newTheme);
    });

    return () => subscription.remove();
  }, [setTheme]);

  return (
    <View style={styles.container}>
      <Text>{RnTuya.getTheme()}</Text>
      <Button
        title={`Set theme to ${nextTheme}`}
        onPress={() => RnTuya.setTheme(nextTheme)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
