import { createSlice } from "@reduxjs/toolkit";

interface ThemeMode {
  mode: "dark" | "light";
  type: "dark" | "light" | "system";
}

// Function to get the system theme on the client side
const getSystemTheme = () => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light"; // default to light if window is not available (e.g., on the server)
};

const initialState: ThemeMode = {
  mode: "light", // default value, it will be updated to system theme on client side
  type: "system",
};

const userThemeSlice = createSlice({
  name: "Theme",
  initialState,
  reducers: {
    setTheme: (state, { payload }: { payload: "dark" | "light" | "auto" }) => {
      switch (payload) {
        case "light":
          state.mode = "light";
          state.type = "light";
          break;
        case "dark":
          state.mode = "dark";
          state.type = "dark";
          break;
        case "auto":
          state.mode = getSystemTheme();
          state.type = "system";
          break;

        default:
          break;
      }
    },
    resetPreferences: (state) => {
      state.mode = getSystemTheme();
      state.type = "system";
    },
  },
});

export const { setTheme, resetPreferences } = userThemeSlice.actions;
export const UserThemePreferences = userThemeSlice.reducer;
