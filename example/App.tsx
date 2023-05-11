import { useContext, useReducer } from "react";
import { Snackbar, Text } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import User from "./app/user";
import {
  SnackContext,
  SnackDispatchContext,
  snackReducer,
  initialSnack,
} from "./hooks/useSnack";

const ProvidersWrapper = ({ children }) => {
  const [snack, dispatch] = useReducer(snackReducer, initialSnack);
  return (
    <SafeAreaProvider>
      <SnackContext.Provider value={snack}>
        <SnackDispatchContext.Provider value={dispatch}>
          {children}
          <Snackbar
            visible={snack?.state === "open"}
            onDismiss={() => {
              dispatch({ type: "remove" });
            }}
          >
            {snack?.message}
          </Snackbar>
        </SnackDispatchContext.Provider>
      </SnackContext.Provider>
    </SafeAreaProvider>
  );
};

export default function App() {
  return (
    <ProvidersWrapper>
      <User />
    </ProvidersWrapper>
  );
}
