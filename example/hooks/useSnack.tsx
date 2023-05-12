import { Dispatch, createContext } from "react";

export const initialSnack = {
  state: "close",
  message: "",
};

export const SnackContext = createContext<typeof initialSnack | null>(null);

export const SnackDispatchContext = createContext<Dispatch<{
  type: "add" | "remove";
  message?: string;
}> | null>(null);

export const snackReducer = (
  snacks: typeof initialSnack,
  action: { type: "add" | "remove"; message?: string }
) => {
  switch (action.type) {
    case "add": {
      return {
        state: "open",
        message: action.message || "",
      };
    }
    case "remove": {
      return initialSnack;
    }
  }
};
